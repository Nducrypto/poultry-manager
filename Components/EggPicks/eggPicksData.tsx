export interface EggPickProps {
  date: Date;
  numOfEggs: number;
  brokenEggs: number;
  id: number;
}

export const eggPicksData = [
  {
    date: new Date("2024-03-13"),
    numOfEggs: 92,
    brokenEggs: 0,
    id: 1,
  },
  {
    date: new Date("2024-03-14"),
    numOfEggs: 56,
    brokenEggs: 1,
    id: 2,
  },
  {
    date: new Date("2024-03-15"),
    numOfEggs: 46,
    brokenEggs: 0,
    id: 3,
  },
  {
    date: new Date("2024-03-16"),
    numOfEggs: 57,
    brokenEggs: 0,
    id: 4,
  },
];
