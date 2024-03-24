import { atom, useRecoilState } from "recoil";

export interface CustomerListProps {
  name: string;
  address: string;
  type: string;
  userId?: string;
  id?: string;
}
export interface CustomerState {
  customersList: CustomerListProps[];
  LoadingCustomers: boolean;
  customerErrorMessage: string;
}

export const customers = atom<CustomerState>({
  key: "customers",
  default: {
    customersList: [],
    LoadingCustomers: false,
    customerErrorMessage: "",
  },
});

export function useCustomerState() {
  const [customerState, setCustomerState] = useRecoilState(customers);
  const { customersList, LoadingCustomers, customerErrorMessage } =
    customerState;
  return {
    customersList,
    LoadingCustomers,
    customerErrorMessage,
    setCustomerState,
  };
}

const closeSpaces = (str: string) => str.toLowerCase().replace(/\s/g, "");

export function searchByNameOrAddress(
  array: CustomerListProps[],
  search: string
) {
  const searched = closeSpaces(search);
  const filter = array.filter((customer) => {
    const customerName = closeSpaces(customer.name);
    const address = closeSpaces(customer.address);
    return customerName.includes(searched) || address.includes(searched);
  });
  return filter;
}
