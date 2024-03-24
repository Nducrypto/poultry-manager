import { useEffect } from "react";
import { collection, firestore, onSnapshot } from "../config/firebase";
import { MEDICATIONROUTE } from "@env";
import { toastFailure, toastSuccess } from "./toastController";
import {
  createInDatabase,
  removeInDatabase,
  updateInDatabase,
} from "../utils/api";
import {
  TreatmentProps,
  useTreatmentState,
} from "../utils/States/treatmentState";
import { useAuthState } from "../utils/States/authState";

const route = MEDICATIONROUTE;

export async function addMedication(item: TreatmentProps, setToast: any) {
  try {
    const docId = await createInDatabase(route, item);
    if (docId) {
      toastSuccess("Item added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to send Chat ", "error", setToast);
  }
}

export const fetchTreatmentFromDatabase = () => {
  const { setTreatmentState } = useTreatmentState();
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setTreatmentState((prev) => ({ ...prev, loadingTreatment: true }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, route),
      (snapshot) => {
        try {
          let fetchedData: TreatmentProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as any;
            if (data && loggedInUser?.userId === data?.userId) {
              fetchedData.push({
                ...data,
                id: doc.id,
              });
            }
          });
          setTreatmentState((prev) => ({
            ...prev,
            treatmentList: fetchedData,
            loadingTreatment: false,
          }));
        } catch (error) {
          setTreatmentState((prev) => ({
            ...prev,
            errorMessage: "Network error",
            loadingTreatmentg: false,
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [loggedInUser]);
};

export async function deleteMedication(id: string, setToast: any) {
  try {
    const isSuccess = await removeInDatabase(route, id);
    if (isSuccess) {
      toastSuccess("Medication deleted successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to delete Medication ", "error", setToast);
  }
}

export const updateMedication = async (
  id: string,
  data: TreatmentProps,
  setToast: any
) => {
  try {
    const isUpdated = await updateInDatabase(id, data, route);
    if (isUpdated) {
      toastSuccess("medication updated successfully", "success", setToast);
    } else {
      toastFailure("Failed To update medication", "error", setToast);
    }
  } catch (error: any) {
    toastFailure("Error updating Bird", "error", setToast);
  }
};
