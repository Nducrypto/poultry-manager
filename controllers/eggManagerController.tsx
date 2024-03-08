import { priceData } from "../Components/Price/priceData";
import { numberOfBirds } from "../utils/utility";
import { useFetchExpenses } from "./expenseController";

const price = priceData[priceData.length - 1];
export function useFetchEggs(date: string) {
  const { dailyCostOnAllBirds, monthlyCostOnAllBirds, costPerCrate } =
    useFetchExpenses(date);
  const wholeSalerPriceOne = price.wholeSalersPriceOne;
  const wholeSalerPriceTwo = price.wholeSalersPriceTwo;
  const retailSalersPrice = price.retailSalersPrice;
  const cratesOfEggsToSaleDaily = Math.ceil(((numberOfBirds / 100) * 70) / 30);
  const grossAmountPerDay = wholeSalerPriceOne * cratesOfEggsToSaleDaily;
  const grossAmountPerMonth = grossAmountPerDay * 30;
  const netProfitPerday = grossAmountPerDay - dailyCostOnAllBirds;
  const netProfitPerMonth = grossAmountPerMonth - monthlyCostOnAllBirds;
  const gainPerCrateForWholeSalerOne = wholeSalerPriceOne - costPerCrate;
  const gainPerCrateForWholeSalerTwo = wholeSalerPriceTwo - costPerCrate;
  const gainPerCrateForRetailSaler = retailSalersPrice - costPerCrate;
  const eggWorthWholeSale = Math.floor(wholeSalerPriceOne / 30);
  const eggWorthWholeSaleTwo = Math.floor(wholeSalerPriceTwo / 30);
  const eggWorthRetailSale = Math.floor(retailSalersPrice / 30);
  const wholeSalerOnePerc = Math.ceil(
    (gainPerCrateForWholeSalerOne / costPerCrate) * 100
  );
  const wholeSalerTwoPerc = Math.ceil(
    (gainPerCrateForWholeSalerTwo / costPerCrate) * 100
  );
  const retailSalerPerc = Math.ceil(
    (gainPerCrateForRetailSaler / costPerCrate) * 100
  );
  return {
    cratesOfEggsToSaleDaily,
    grossAmountPerDay,
    grossAmountPerMonth,
    netProfitPerday,
    netProfitPerMonth,
    gainPerCrateForWholeSalerOne,
    gainPerCrateForWholeSalerTwo,
    gainPerCrateForRetailSaler,
    eggWorthRetailSale,
    eggWorthWholeSale,
    eggWorthWholeSaleTwo,
    wholeSalerOnePerc,
    wholeSalerTwoPerc,
    retailSalerPerc,
  };
}
