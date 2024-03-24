import { useEffect } from "react";
import {
  createInDatabase,
  removeInDatabase,
  updateInDatabase,
} from "../utils/api";
import { collection, firestore, onSnapshot } from "../config/firebase";
import { SALEROUTE } from "@env";
import { SalesProps, useSalesState } from "../utils/States/salesState";
import { toastFailure, toastSuccess } from "./toastController";
import { useAuthState } from "../utils/States/authState";

const salesRoute = SALEROUTE;
export async function createSales(item: SalesProps, setToast: any) {
  try {
    const docId = await createInDatabase(salesRoute, item);
    if (docId) {
      toastSuccess("Item added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to send Chat ", "error", setToast);
  }
}

export const filterByCustomerId = (
  sales: Record<string, SalesProps[]>,
  key: string,
  id: string
) => ({
  ...sales,
  [key]: sales[key].filter((item: SalesProps) => item.salesId !== id),
});

export const getSalesFromDatabase = () => {
  const { setSalesState } = useSalesState("");
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    setSalesState((prev) => ({ ...prev, loadingSales: true }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, salesRoute),
      (snapshot) => {
        try {
          let fetchedData: SalesProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as SalesProps;
            if (data && data?.userId === loggedInUser?.userId) {
              fetchedData.push({
                ...data,
                salesId: doc.id,
                date: new Date(data.date),
              });
            }
          });
          setSalesState((prev) => ({
            ...prev,
            salesList: fetchedData,
            loadingSales: false,
          }));
        } catch (error) {
          console.log(error);
          setSalesState((prev) => ({
            ...prev,
            loadingSales: false,
            errorMessage: "Oops! Something went wrong.",
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [setSalesState, loggedInUser]);
};

export async function updateSales(id: string, data: SalesProps, setToast: any) {
  try {
    const isSuccess = await updateInDatabase(id, data, salesRoute);
    if (isSuccess) {
      toastSuccess("Sales updated successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Oops! Failed to update sales", "error", setToast);
  }
}
export async function deleteSales(id: string, setToast: any) {
  try {
    await removeInDatabase(salesRoute, id);
    toastSuccess("Sales deleted successfully", "success", setToast);
  } catch (error) {
    toastFailure("Failed to delete sales", "error", setToast);
  }
}
