import { useEffect, useState } from "react";
import {
  eggPicksData,
  EggPickProps,
} from "../Components/EggPicks/eggPicksData";
import { getMonthAndYear } from "../utils/utility";

export function useFetchEggPick(searchedMonth: string) {
  const [eggPicksArray, setEggPicksArray] = useState<EggPickProps[]>([]);

  useEffect(() => {
    const groupPickedEggByMonth: { [key: string]: EggPickProps[] } = {};
    const groupPickedEggByYear: { [key: string]: EggPickProps[] } = {};
    for (let index = 0; index < eggPicksData.length; index++) {
      const picked = eggPicksData[index];
      const monthYear = getMonthAndYear(picked.date);
      const [, year] = monthYear.split("-");
      if (!groupPickedEggByMonth[monthYear]) {
        groupPickedEggByMonth[monthYear] = [];
      }
      if (!groupPickedEggByYear[year]) {
        groupPickedEggByYear[year] = [];
      }
      groupPickedEggByMonth[monthYear].push(picked);
      groupPickedEggByYear[year].push(picked);
    }
    const selectedDate: EggPickProps[] =
      groupPickedEggByMonth[searchedMonth] || [];

    setEggPicksArray(selectedDate);
  }, [searchedMonth]);

  const totalPickedEggs = eggPicksArray.reduce(
    (acc: number, curr: EggPickProps) => acc + curr.numOfEggs,
    0
  );
  const totalBrokenEggs = eggPicksArray.reduce(
    (acc: number, curr: EggPickProps) => acc + curr.brokenEggs,
    0
  );
  return { eggPicksArray, totalPickedEggs, setEggPicksArray, totalBrokenEggs };
}

export function calculateCratesForEggs(numOfPickedEggs: number) {
  const eggsPerCrate = 30;
  if (numOfPickedEggs >= eggsPerCrate) {
    let numOfCrates = Math.floor(numOfPickedEggs / eggsPerCrate);
    const remainingEggs = numOfPickedEggs % eggsPerCrate;
    const text = numOfCrates > 1 ? "s" : "";
    if (remainingEggs === 0) {
      return `${numOfCrates} crate${text}`;
    } else {
      return `${numOfCrates} crate${text} ${remainingEggs} pieces`;
    }
  } else {
    return 0;
  }
}
