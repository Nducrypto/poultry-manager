import { atom, useRecoilState } from "recoil";

export interface BirdProps {
  numOfBirds: number;
  id?: string;
  date: any;
  userId?: string;
}
export interface BirdState {
  birdData: { [key: string]: BirdProps };
  birdLoading: boolean;
  birdErrorMessage: string;
}

export const bird = atom<BirdState>({
  key: "bird",
  default: {
    birdData: {},
    birdLoading: false,
    birdErrorMessage: "",
  },
});

export function useBirdState(dateString: string) {
  const [birdSate, setBirdSate] = useRecoilState(bird);
  const { birdData, birdLoading, birdErrorMessage } = birdSate;
  let numberOfBirds = 0;
  let id = "";
  if (birdSate && birdData[dateString]) {
    numberOfBirds = birdData[dateString]?.numOfBirds;
    id = birdData[dateString]?.id || "";
  }
  return {
    birdSate,
    setBirdSate,
    numberOfBirds,
    id,
    birdLoading,
    birdErrorMessage,
  };
}
