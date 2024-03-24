import { toastFailure, toastSuccess } from "./toastController";
import { CUSTOMERROUTE } from "@env";
import {
  createInDatabase,
  removeInDatabase,
  updateInDatabase,
} from "../utils/api";
import { useEffect } from "react";
import { firestore, collection, onSnapshot } from "../config/firebase";
import { useAuthState } from "../utils/States/authState";
import {
  CustomerListProps,
  useCustomerState,
} from "../utils/States/customerState";

const route = CUSTOMERROUTE;
export async function addNewCustomer(item: CustomerListProps, setToast: any) {
  try {
    const docId = await createInDatabase(route, item);
    if (docId) {
      toastSuccess("Customer added successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Failed to add customer ", "error", setToast);
  }
}

export const getCustomersFromDatabase = () => {
  const { setCustomerState } = useCustomerState();
  const { loggedInUser } = useAuthState();
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      return;
    }
    setCustomerState((prev) => ({ ...prev, LoadingCustomers: true }));
    const listenForChangeInChats = onSnapshot(
      collection(firestore, route),
      (snapshot) => {
        try {
          let fetchedData: CustomerListProps[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as CustomerListProps;
            if (data && loggedInUser?.userId === data?.userId) {
              fetchedData = [...fetchedData, { ...data, id: doc.id }];
            }
          });
          setCustomerState((prev) => ({
            ...prev,
            customersList: fetchedData,
            LoadingCustomers: false,
          }));
        } catch (error) {
          setCustomerState((prev) => ({
            ...prev,
            customerErrorMessage: "Network error",
            LoadingCustomers: false,
          }));
        }
      }
    );

    return () => {
      listenForChangeInChats();
    };
  }, [loggedInUser]);
};

export async function updateCustomer(
  id: string,
  data: CustomerListProps,
  setToast: any
) {
  try {
    const isSuccess = await updateInDatabase(id, data, route);
    if (isSuccess) {
      toastSuccess("Customer updated successfully", "success", setToast);
    }
  } catch (error) {
    toastFailure("Oops! Failed to update customer", "error", setToast);
  }
}
export async function deleteCustomer(
  id: string,
  setToast: any,
  navigation: any
) {
  try {
    await removeInDatabase(route, id);
    toastSuccess("Customer deleted successfully", "success", setToast);
    navigation.navigate("Customers");
  } catch (error) {
    toastFailure("Oops! Failed to delete customer ", "error", setToast);
  }
}
