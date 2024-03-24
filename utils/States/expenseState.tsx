import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { getMonthAndYear } from "../utility";
import { useBirdState } from "./birdState";

export interface Feeding {
  feedingId?: string;
  growerFeedCostPerBag?: number;
  layerFeedCostPerBag?: number;
  numOfGrowerFeed?: number;
  date: Date;
}
export interface Labour {
  labourId?: string;
  labour: number;
  date: Date;
}
export interface Electricity {
  electricityId?: string;
  electricity: number;
  date: Date;
}
export interface Logistic {
  logisticId?: string;
  logistic: number;
  date: Date;
}
export interface Medication {
  medicationId?: string;
  medication: number;
  name: string;
  date: Date;
}
export interface Rent {
  rentId?: string;
  rent: number;
  date: Date;
}

export interface ExpenseProps {
  feeding?: Feeding[];
  labour?: Labour[];
  electricity?: Electricity[];
  logistic?: Logistic[];
  medication?: Medication[];
  rent?: Rent[];
}
export interface ExpenseState {
  allExpense: ExpenseProps;
  loadingExpense: boolean;
  errorMessage: string;
}

export const expense = atom<ExpenseState>({
  key: "expense",
  default: {
    allExpense: {},
    loadingExpense: false,
    errorMessage: "",
  },
});

export function useExpenseState(dateString: any) {
  const [expenseState, setExpenseState] = useRecoilState<any>(expense);
  const { numberOfBirds } = useBirdState(dateString);
  const { allExpense, loadingExpense, errorMessage } = expenseState;
  const expenseKeys = Object.keys(allExpense);
  const { filteredExpense } = useMemo(() => {
    const monthlyCosts: any = {};
    const yearlyCosts: any = {};
    let filteredExpense: any = [];
    if (expenseKeys.length > 0) {
      for (const key of expenseKeys) {
        for (const item of allExpense[key]) {
          const monthYear = getMonthAndYear(new Date(item?.timeStamp));
          const dateParts = monthYear.split("-");
          const year = dateParts[1];
          if (!monthlyCosts[monthYear]) {
            monthlyCosts[monthYear] = { ...item };
          } else {
            for (const key in item) {
              if (key !== "timeStamp" && key !== "userId" && key !== "title") {
                monthlyCosts[monthYear][key] =
                  (monthlyCosts[monthYear][key] || 0) + item[key];
              }
            }
          }

          if (!yearlyCosts[year]) {
            yearlyCosts[year] = { ...item };
          } else {
            for (const key in item) {
              if (key !== "timeStamp" && key !== "userId" && key !== "title") {
                yearlyCosts[year][key] =
                  (yearlyCosts[year][key] || 0) + item[key];
              }
            }
          }
        }
      }

      const isMonth = dateString.length > 4;
      filteredExpense = isMonth
        ? monthlyCosts[dateString]
        : yearlyCosts[dateString];
    }
    return { monthlyCosts, yearlyCosts, filteredExpense };
  }, [allExpense, dateString.length]);

  const itemCostPerMonth = totalCostPerItem(filteredExpense);
  const rentPerMonth = Math.ceil(itemCostPerMonth?.rent);
  const monthlyCostPerBird =
    Math.floor(totalExpenses(itemCostPerMonth, rentPerMonth) / numberOfBirds) ||
    0;

  const monthlyCostOnAllBirds = monthlyCostPerBird * numberOfBirds;
  const dailyCostPerBird = monthlyCostPerBird / 30;
  const costPerCrate = Math.floor(dailyCostPerBird * 30);
  const dailyCostOnAllBirds = dailyCostPerBird * numberOfBirds;

  return {
    allExpense,
    setExpenseState,
    filteredExpense,
    itemCostPerMonth,
    monthlyCostPerBird,
    monthlyCostOnAllBirds,
    dailyCostPerBird,
    costPerCrate,
    dailyCostOnAllBirds,
    rentPerMonth,
    numberOfBirds,
    loadingExpense,
    errorMessage,
  };
}

export interface CostItem {
  priceOflayerfeed: number;
  numOfLayerFeed: number;
  priceOfgrowerfeed: number;
  numOfGrowerFeed: number;
  logistic: number;
  labour: number;
  electricity: number;
  medication: number;
  [key: string]: number;
}

export const costOnFeeds = (item: CostItem) => {
  if (item) {
    const growerFeed = costOnGrowerFeeds(item);
    const layerFeed = costOnLayerFeeds(item);
    if (item?.priceOfgrowerfeed && item?.priceOflayerfeed) {
      const costOffeeds = Number(growerFeed) + Number(layerFeed);
      return costOffeeds;
    } else if (item?.priceOfgrowerfeed) {
      return growerFeed;
    } else if (item?.priceOflayerfeed) {
      return layerFeed;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export const costOnGrowerFeeds = (item: CostItem) => {
  if (item?.priceOfgrowerfeed) {
    const averagePrice = item.priceOfgrowerfeed / item.growerfeedEntryCount;
    const totalAmount = averagePrice * item?.numOfgrowerfeed;
    return totalAmount;
  } else {
    return 0;
  }
};

export const costOnLayerFeeds = (item: CostItem) => {
  if (item?.priceOflayerfeed) {
    let averagePrice = item.priceOflayerfeed / item.layerfeedEntryCount;
    const totalAmount = averagePrice * item?.numOflayerfeed;
    return totalAmount;
  } else {
    return 0;
  }
};

export const totalExpenses = (data: CostItem, rentPerMonth: number) => {
  if (data) {
    const { logistic, labour, electricity, medication } = data;
    const layerFeeds = costOnLayerFeeds(data);

    const growerFeeds = costOnGrowerFeeds(data);
    const total =
      layerFeeds +
      growerFeeds +
      (labour || 0) +
      (logistic || 0) +
      (electricity || 0) +
      (rentPerMonth || 0) +
      (medication || 0);

    return total;
  } else if (rentPerMonth) {
    return rentPerMonth;
  } else {
    return 0;
  }
};

export const totalCostPerItem = (data: any) => {
  const totalCost = data && Object.keys(data).length > 0 ? data : 0;
  return totalCost;
};

export const filterItemsByKeyAndDate = (date: any, array: any, key: any) => {
  if (array && array[key]) {
    const filteredItems =
      array[key].filter(
        (item: any) => new Date(item?.timeStamp).getMonth() === date?.getMonth()
      ) || [];
    return filteredItems;
  } else {
    return [];
  }
};
