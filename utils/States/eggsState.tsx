import { useBirdState } from "../States/birdState";
import { useExpenseState } from "../States/expenseState";
import { usePriceState } from "../States/priceState";

export function useEggState(date: string) {
  const { dailyCostOnAllBirds, monthlyCostOnAllBirds, costPerCrate } =
    useExpenseState(date);
  const { numberOfBirds } = useBirdState(date);
  const { priceList, priceLoading } = usePriceState();
  const cratesOfEggsToPickDaily = Math.ceil(((numberOfBirds / 100) * 70) / 30);
  let priceArray: any = [];
  for (const item of priceList) {
    let itemPrice = item.price;
    let label = item.label;
    const grossAmountPerDay = itemPrice * cratesOfEggsToPickDaily;
    const grossAmountPerMonth = grossAmountPerDay * 30;
    const netProfitPerday = grossAmountPerDay - dailyCostOnAllBirds;
    const netProfitPerMonth = grossAmountPerMonth - monthlyCostOnAllBirds;
    const gainPerCrate = itemPrice - costPerCrate;
    const eggWorth = Math.floor(gainPerCrate / 30);
    const profitPerc = Math.ceil((gainPerCrate / costPerCrate) * 100);
    priceArray.push({
      priceId: item.priceId,
      itemPrice,
      label,
      grossAmountPerDay,
      grossAmountPerMonth,
      netProfitPerMonth,
      netProfitPerday,
      gainPerCrate,
      eggWorth,
      profitPerc,
    });
  }
  return { cratesOfEggsToPickDaily, costPerCrate, priceArray, priceLoading };
}
