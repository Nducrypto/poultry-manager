import { useEffect } from "react";
import { collection, firestore, onSnapshot } from "../config/firebase";
import { getMonthAndYear } from "../utils/utility";
import { useEggPickState } from "../utils/States/eggPicksState";
import { EGGPICKROUTE } from "@env";
import { EggPicksProps } from "../utils/States/eggPicksState";
import { toastFailure, toastSuccess } from "./toastController";
import {
  createInDatabase,
  removeInDatabase,
  updateInDatabase,
} from "../utils/api";
import { useAuthState } from "../utils/States/authState";

const route = EGGPICKROUTE;
export async function addPickedEgg(item: EggPicksProps, setToast: any) {
  try {
    const docId = await createInDatabase(route, item);
    if (docId) {
      toastSuccess("Item added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to send Chat ", "error", setToast);
  }
}
export const fetchEggPicksFromDatabase = () => {
  const { setEggPickState } = useEggPickState("");
  const { loggedInUser } = useAuthState();

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setEggPickState((prev) => ({
      ...prev,
      loadingEggPicks: true,
      eggPicksErrorMessage: "",
    }));

    const listenForChangeInChats = onSnapshot(
      collection(firestore, route),
      (snapshot) => {
        try {
          let fetchedData: EggPicksProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as EggPicksProps;
            if (data && data.userId === loggedInUser?.userId) {
              fetchedData.push({
                ...data,
                id: doc.id,
              });
            }
          });
          const monthlyGroupedEggPicks: any = {};
          for (let index = 0; index < fetchedData.length; index++) {
            const item: any = fetchedData[index];
            const monthYear = getMonthAndYear(new Date(item.timeStamp));
            if (!monthlyGroupedEggPicks[monthYear]) {
              monthlyGroupedEggPicks[monthYear] = {
                history: [],
                total: { ...item },
              };
            } else {
              for (const key in item) {
                if (key !== "timeStamp" && key !== "id") {
                  monthlyGroupedEggPicks[monthYear].total[key] =
                    monthlyGroupedEggPicks[monthYear].total[key] + item[key] ||
                    0;
                }
              }
            }

            monthlyGroupedEggPicks[monthYear].history.push(item);
          }
          setEggPickState((prev) => ({
            ...prev,
            loadingEggPicks: false,
            groupedData: monthlyGroupedEggPicks,
          }));
        } catch (error) {
          setEggPickState((prev) => ({
            ...prev,
            loadingEggPicks: false,
            eggPicksErrorMessage: "Network connection failed",
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [loggedInUser]);
};

export async function removePickedEgg(id: string, setToast: any) {
  try {
    const isSuccess = await removeInDatabase(route, id);
    if (isSuccess) {
      toastSuccess("Picked egg deleted successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to delete Picked egg ", "error", setToast);
  }
}

export const updateEggPick = async (
  id: string,
  data: EggPicksProps,
  setToast: any
) => {
  try {
    const isUpdated = await updateInDatabase(id, data, route);
    if (isUpdated) {
      toastSuccess("Updated successfully", "success", setToast);
    } else {
      toastFailure("Failed To update", "error", setToast);
    }
  } catch (error: any) {
    toastFailure("Error updating", "error", setToast);
  }
};
