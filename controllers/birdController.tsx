import { useEffect } from "react";
import { collection, firestore, onSnapshot } from "../config/firebase";
import { BirdProps, useBirdState } from "../utils/States/birdState";
import { BIRDROUTE } from "@env";
import { toastFailure, toastSuccess } from "./toastController";
import { getMonthAndYear } from "../utils/utility";
import { createInDatabase, updateInDatabase } from "../utils/api";
import { useAuthState } from "../utils/States/authState";

const route = BIRDROUTE;

export async function addBirdNumber(item: BirdProps, setToast: any) {
  try {
    const docId = await createInDatabase(route, item);
    if (docId) {
      toastSuccess("Item added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to send Chat ", "error", setToast);
  }
}

export const fetchBirdsFromDatabase = () => {
  const { setBirdSate } = useBirdState("");
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setBirdSate((prev) => ({ ...prev, birdLoading: true }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, route),
      (snapshot) => {
        try {
          let fetchedData: BirdProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as BirdProps;

            if (data && loggedInUser?.userId === data?.userId) {
              fetchedData.push({
                ...data,
                id: doc.id,
              });
            }
          });

          const monthly: Record<string, BirdProps> = {};

          for (const data of fetchedData) {
            const monthYear = getMonthAndYear(new Date(data.date));

            if (!monthly[monthYear]) {
              monthly[monthYear] = {} as BirdProps;
            }
            monthly[monthYear] = { ...data };
          }

          setBirdSate({
            birdLoading: false,
            birdData: monthly,
            birdErrorMessage: "",
          });
        } catch (error) {
          setBirdSate((prev) => ({
            ...prev,
            birdLoading: false,
            birdErrorMessage: "Network error",
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [setBirdSate, loggedInUser]);
};

export const updateBirds = async (
  id: string,
  data: BirdProps,
  setToast: any
) => {
  try {
    const isUpdated = await updateInDatabase(id, data, route);
    if (isUpdated) {
      toastSuccess("Birds updated successfully", "success", setToast);
    } else {
      toastFailure("Failed To update Bird", "error", setToast);
    }
  } catch (error: any) {
    toastFailure("Error updating Bird", "error", setToast);
  }
};
