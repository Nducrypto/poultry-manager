export interface MedicationData {
  id: number;
  name: string;
  duration: string;
  lastDueDate: any;
  nextDueDate: any;
  durationText: string;
}

export const medicationData = [
  {
    name: "Lasosa",
    duration: "Once monthly",
    durationText: "Everyday",
    lastDueDate: new Date("2024-02-04"),
    nextDueDate: new Date("2024-03-19"),
    id: 1,
  },
  {
    name: "Deworm/delice",
    durationText: "Everyday",
    duration: "Once in 3 Months",
    lastDueDate: new Date("2024-02-04"),
    nextDueDate: new Date("2024-03-19"),

    id: 2,
  },
  {
    name: "Vitamin",
    duration: "Once monthly",
    durationText: "Everyday",
    lastDueDate: new Date("2024-03-04"),
    nextDueDate: new Date("2024-03-19"),
    id: 3,
  },
];
