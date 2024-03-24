import { useEffect } from "react";
import {
  doc,
  setDoc,
  collection,
  firestore,
  getDoc,
  onSnapshot,
  updateDoc,
} from "../config/firebase";
import { EXPENSEROUTE } from "@env";
import {
  ExpenseProps,
  ExpenseState,
  useExpenseState,
} from "../utils/States/expenseState";
import { toastFailure, toastSuccess } from "./toastController";
import { useAuthState } from "../utils/States/authState";

const route = EXPENSEROUTE;

export const createExpenses = async (
  docName: string,
  data: any,
  setToast: any
) => {
  try {
    const { docSnap, docRef } = await doesDocumentExist(route, docName);
    if (docSnap?.exists()) {
      await setDoc(
        docRef,
        { [docName]: [...docSnap.data()[docName], data] },
        { merge: true }
      );
    } else {
      await setDoc(docRef, { [docName]: [data] });
    }
    toastSuccess("Item added successfully", "success", setToast);
  } catch (error) {
    console.error("Error adding document: ", error);
    toastFailure("Failed to add feeding ", "error", setToast);
  }
};

export const fetchExpenseFromDatabase = () => {
  const { setExpenseState } = useExpenseState("");
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setExpenseState((prev: ExpenseState) => ({
      ...prev,
      loadingExpense: true,
    }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, route),
      (snapshot) => {
        try {
          let fetchedData: { [key: string]: ExpenseProps | any } = {};
          snapshot.forEach((doc) => {
            const data = doc.data() as any;
            if (data) {
              for (const key in data) {
                if (key) {
                  const array = data[key];
                  const filteredItems = array.filter(
                    (item: any) => item.userId === loggedInUser.userId
                  );
                  if (filteredItems.length > 0) {
                    fetchedData[key] = filteredItems;
                  }
                }
              }
            }
          });

          setExpenseState({ allExpense: fetchedData, loadingExpense: false });
        } catch (error) {
          setExpenseState((prev: ExpenseState) => ({
            ...prev,
            loadingExpense: false,
            errorMessage: "Network request failed",
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [loggedInUser]);
};

export const deleteExpenses = async (
  docName: string,
  id: number,
  setToast: any
) => {
  try {
    const { docSnap, docRef } = await doesDocumentExist(route, docName);
    if (docSnap?.exists()) {
      const currentData = docSnap.data()[docName];
      const updatedData = currentData.filter((item: any) => item.id !== id);
      await updateDoc(docRef, { [docName]: updatedData });
      toastSuccess("Item deleted successfully", "success", setToast);
    } else {
      toastFailure("Document does not exist", "error", setToast);
    }
  } catch (error) {
    toastFailure("Failed to delete item", "error", setToast);
    throw error;
  }
};

async function doesDocumentExist(url: string, docName: string) {
  const collectionRef = collection(firestore, url);
  const docRef = doc(collectionRef, docName);
  const docSnap = await getDoc(docRef);

  return { docSnap, docRef };
}
