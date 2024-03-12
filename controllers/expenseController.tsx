import { expenseData, CostItem } from "../Components/Costs/expenseData";
import { getMonthAndYear, monthArray, numberOfBirds } from "../utils/utility";
import { useState, useEffect, useMemo } from "react";

interface AllCost {
  groupedItems: Record<string, CostItem[]>;
  allItems: any;
}
export function useFetchExpenses(dateString: string) {
  const [allCost, setAllCost] = useState<AllCost>({
    groupedItems: {},
    allItems: [],
  });

  const groupDataByMonth: Record<string, CostItem[]> = {};
  useEffect(() => {
    for (const data of expenseData) {
      const item = data as any;
      const monthYear: string = getMonthAndYear(item.date);
      if (!groupDataByMonth[monthYear]) {
        groupDataByMonth[monthYear] = [];
      }
      groupDataByMonth[monthYear].push(item);
    }
    setAllCost({ groupedItems: groupDataByMonth, allItems: [...expenseData] });
  }, []);
  const { groupedItems, allItems } = allCost;

  const { monthlyCosts, yearlyCosts, items } = useMemo(() => {
    const monthlyCosts: any = {};
    const yearlyCosts: any = {};
    for (const item of allItems) {
      const monthYear = getMonthAndYear(item.date);
      const dateParts = monthYear.split("-");
      const year = dateParts[1];

      if (!monthlyCosts[monthYear]) {
        monthlyCosts[monthYear] = { monthYear, totalCosts: { ...item } };
      } else {
        for (const key in item) {
          if (
            key !== "date" &&
            key !== "growerFeedCostPerBag" &&
            key !== "layerFeedCostPerBag"
          ) {
            monthlyCosts[monthYear].totalCosts[key] =
              (monthlyCosts[monthYear].totalCosts[key] || 0) + item[key];
          }
        }
      }

      if (!yearlyCosts[year]) {
        yearlyCosts[year] = { year: year, totalCosts: { ...item } };
      } else {
        for (const key in item) {
          if (
            key !== "date" &&
            key !== "growerFeedCostPerBag" &&
            key !== "layerFeedCostPerBag"
          ) {
            yearlyCosts[year].totalCosts[key] =
              (yearlyCosts[year].totalCosts[key] || 0) + item[key];
          }
        }
      }
    }
    const isMonth = dateString.length > 4;
    const items = isMonth ? monthlyCosts[dateString] : yearlyCosts[dateString];

    return { monthlyCosts, yearlyCosts, items };
  }, [allItems, dateString.length]);

  const expenseHistory = allItems.filter(
    (item: CostItem | any) =>
      monthArray[item.date.getMonth()] === dateString.split("-")[0]
  );
  const itemCostPerMonth = totalCostPerItem(items);
  const monthlyCostPerBird = Math.floor(
    totalExpenses(itemCostPerMonth, rentPerMonth) / numberOfBirds
  );
  const monthlyCostOnAllBirds = monthlyCostPerBird * numberOfBirds;
  const dailyCostPerBird = monthlyCostPerBird / 30;
  const costPerCrate = Math.floor(dailyCostPerBird * 30);
  const dailyCostOnAllBirds = dailyCostPerBird * numberOfBirds;

  return {
    monthlyCosts,
    yearlyCosts,
    allCostItem: groupedItems,
    itemCostPerMonth,
    numberOfBirds,
    monthlyCostPerBird,
    monthlyCostOnAllBirds,
    dailyCostPerBird,
    costPerCrate,
    dailyCostOnAllBirds,
    expenseData,
    items,
    allItems,
    expenseHistory,
  };
}

export const costOnFeeds = (item: CostItem) => {
  if (item) {
    const growerfeed = item.growerFeedCostPerBag * item.numOfGrowerFeed;
    const layerfeed = item.layerFeedCostPerBag * item.numOfLayerFeed;
    const costOffeeds = growerfeed + layerfeed;
    return costOffeeds;
  } else {
    return 0;
  }
};

export const totalExpenses = (data: CostItem, rentPerMonth: number) => {
  if (data) {
    const { logistic, labour, electricity, medication } = data;
    const totalCostOnFeed = costOnFeeds(data);
    const total =
      totalCostOnFeed +
      logistic +
      labour +
      electricity +
      rentPerMonth +
      medication;

    return total;
  } else if (rentPerMonth) {
    return rentPerMonth;
  } else {
    return 0;
  }
};

export const totalCostPerItem = (data: any) => {
  const totalCost = data && Object.keys(data).length > 0 ? data.totalCosts : 0;
  return totalCost;
};

export const rentPerMonth = Math.round(200000 / 12);
