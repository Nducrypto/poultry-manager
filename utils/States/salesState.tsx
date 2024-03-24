import { atom, useRecoilState } from "recoil";
import { getMonthAndYear } from "../utility";

export interface SalesProps {
  salesId?: string;
  name: string;
  type: string;
  price: number;
  amountPaid: number;
  numOfCrate: number;
  date: any;
  userId?: string;
}
export interface SalesState {
  salesList: SalesProps[];
  loadingSales: boolean;
  errorMessage: string;
}

const sales = atom<SalesState>({
  key: "sales",
  default: { salesList: [], loadingSales: false, errorMessage: "" },
});

export function useSalesState(month: any) {
  const [salesState, setSalesState] = useRecoilState(sales);
  const { salesList, loadingSales, errorMessage } = salesState;
  const groupedByMonth: Record<string, SalesProps[]> = {};
  const groupedByYear: Record<string, SalesProps[]> = {};
  const groupedByName: Record<string, SalesProps[]> = {};
  for (const item of salesList) {
    const monthYear = getMonthAndYear(item.date);
    const [, year] = monthYear.split("-");
    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    if (!groupedByName[item.name]) {
      groupedByName[item.name] = [];
    }
    groupedByMonth[monthYear].push(item);
    groupedByYear[year].push(item);
    groupedByName[item.name].push(item);
  }
  const isMonth = month.length > 4;
  const filteredSales =
    (isMonth ? groupedByMonth[month] : groupedByYear[month]) || [];
  let totalSales = 0;
  let totalCrates = 0;
  if (filteredSales.length) {
    for (const sale of filteredSales) {
      const currentSale = sale as SalesProps;
      const itemPrice = currentSale.price;
      const saleCrates = currentSale.numOfCrate;

      totalCrates += saleCrates;
      totalSales += itemPrice * saleCrates;
    }
  }

  return {
    filteredSales,
    totalCrates,
    totalSales,
    salesList,
    setSalesState,
    loadingSales,
    errorMessage,
    groupedByName,
  };
}

export function sumTotalAmount(item: any) {
  return Number(item.numOfCrate * item.price);
}
