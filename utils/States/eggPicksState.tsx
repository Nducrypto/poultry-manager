import { atom, useRecoilState } from "recoil";

export interface EggPicksProps {
  numOfEggs: number;
  brokenEggs: number;
  id?: string;
  timeStamp: any;
  userId?: string;
}

export interface EggPicksStateProps {
  groupedData: {
    [key: string]: {
      history: EggPicksProps[];
      total: Record<string, EggPicksProps>;
    };
  };
  loadingEggPicks: boolean;
  eggPicksErrorMessage: string;
}

export const eggPick = atom<EggPicksStateProps>({
  key: "eggPick",
  default: {
    groupedData: {},
    loadingEggPicks: false,
    eggPicksErrorMessage: "",
  },
});

export function useEggPickState(dateString: string) {
  const [eggPicksState, setEggPickState] = useRecoilState(eggPick);
  const { groupedData, loadingEggPicks, eggPicksErrorMessage } = eggPicksState;
  const initialState = { history: [], total: { numOfEggs: 0, brokenEggs: 0 } };
  const monthlyEggPicks = groupedData[dateString] || initialState;
  return {
    setEggPickState,
    monthlyEggPicks,
    loadingEggPicks,
    eggPicksErrorMessage,
  };
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
