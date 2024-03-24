import { atom, useRecoilState } from "recoil";

export interface PriceListProps {
  priceId?: string;
  label: string;
  price: number;
  date: any;
  userId?: string;
}
export interface PriceState {
  priceList: PriceListProps[];
  priceLoading: boolean;
  priceErrorMessage: string;
}

export const price = atom<PriceState>({
  key: "price",
  default: { priceList: [], priceLoading: false, priceErrorMessage: "" },
});

export function usePriceState() {
  const [priceState, setPriceState] = useRecoilState(price);
  const { priceList, priceLoading, priceErrorMessage } = priceState;
  return {
    priceList,
    priceLoading,
    setPriceState,
    priceErrorMessage,
  };
}
