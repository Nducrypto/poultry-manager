import { useState, useEffect } from "react";
import { salesData, SalesProp } from "../Components/Sales/salesData";
import { getMonthAndYear } from "../utils/utility";

export interface AllSales {
  monthlySales: Record<string, SalesProp[]>;
  annualSales: Record<string, SalesProp[]>;
}
export function useFetchSales(month: any) {
  const [allSales, setAllSales] = useState<SalesProp[]>([]);

  useEffect(() => {
    const groupedSalesByMonth: Record<string, SalesProp[]> = {};
    const groupedByYear: Record<string, SalesProp[]> = {};

    for (const sale of salesData) {
      const monthYear = getMonthAndYear(sale.date);
      const [, year] = monthYear.split("-");
      if (!groupedSalesByMonth[monthYear]) {
        groupedSalesByMonth[monthYear] = [];
      }
      if (!groupedByYear[year]) {
        groupedByYear[year] = [];
      }
      groupedSalesByMonth[monthYear].push(sale);
      groupedByYear[year] = [...groupedByYear[year], { ...sale }];
    }
    const isMonth = month.length > 4;
    const sales =
      (isMonth ? groupedSalesByMonth[month] : groupedByYear[month]) || [];
    setAllSales(sales);
  }, [month]);

  let totalWholesaleSales = 0;
  let wholeSalePrice = 0;
  let totalWholeSaleCrate = 0;
  let retailPrice = 0;
  let totalRetailCrate = 0;
  let totalRetailSales = 0;
  if (allSales.length) {
    for (const sale of allSales) {
      const currentSale = sale as SalesProp;
      if (currentSale.customerType === "Wholesaler") {
        wholeSalePrice = currentSale.price;
        totalWholeSaleCrate += currentSale.numOfCrate;
        totalWholesaleSales = wholeSalePrice * totalWholeSaleCrate;
      } else {
        retailPrice = currentSale.price;
        totalRetailCrate += currentSale.numOfCrate;
        totalRetailSales = retailPrice * totalRetailCrate;
      }
    }
  }
  const totalCrates = totalWholeSaleCrate + totalRetailCrate;
  const totalSales = totalRetailSales + totalWholesaleSales;

  return {
    allSales,
    totalCrates,
    totalSales,
    setAllSales,
  };
}

export const filterByCustomerId = (
  sales: Record<string, SalesProp[]>,
  key: string,
  id: number
) => ({
  ...sales,
  [key]: sales[key].filter((item: SalesProp) => item.id !== id),
});
