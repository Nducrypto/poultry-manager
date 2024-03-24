import { toastFailure, toastSuccess } from "./toastController";
import { PriceListProps, usePriceState } from "../utils/States/priceState";
import { PRICEROUTE } from "@env";
import { createInDatabase, removeInDatabase } from "../utils/api";
import { useEffect } from "react";
import { firestore, collection, onSnapshot } from "../config/firebase";
import { useAuthState } from "../utils/States/authState";

const pricesRoute = PRICEROUTE;
export async function addNewPrice(item: PriceListProps, setToast: any) {
  try {
    const docId = await createInDatabase(pricesRoute, item);
    if (docId) {
      toastSuccess("Item added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to send Chat ", "error", setToast);
  }
}

export const fetchPriceFromDatabase = () => {
  const { setPriceState } = usePriceState();
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setPriceState((prev) => ({ ...prev, priceLoading: true }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, pricesRoute),
      (snapshot) => {
        try {
          let fetchedData: PriceListProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as PriceListProps;
            if (data && loggedInUser?.userId === data?.userId) {
              fetchedData = [...fetchedData, { ...data, priceId: doc.id }];
            }
          });
          setPriceState((prev) => ({
            ...prev,
            priceList: fetchedData,
            priceLoading: false,
          }));
        } catch (error) {
          setPriceState((prev) => ({
            ...prev,
            priceErrorMessage: "Network error",
            priceLoading: false,
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [loggedInUser]);
};

export async function deletePrice(id: string, setToast: any) {
  try {
    const isSuccess = await removeInDatabase(pricesRoute, id);
    if (isSuccess) {
      toastSuccess("Item deleted successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to delete price ", "error", setToast);
  }
}
