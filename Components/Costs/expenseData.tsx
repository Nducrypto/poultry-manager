import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const costTableHead = [
  { title: "Feeding" },
  { title: "Labour" },
  { title: "Logistic" },
  { title: "Electricity" },
  { title: "Medication" },
  { title: "Rent" },
];

export interface CostItem {
  layerFeedCostPerBag: number;
  numOfLayerFeed: number;
  growerFeedCostPerBag: number;
  numOfGrowerFeed: number;
  logistic: number;
  labour: number;
  electricity: number;
  medication: number;
  [key: string]: number;
}

export const expenseData = [
  {
    date: new Date("2024-02-17"),
    layerFeedCostPerBag: 10800,
    numOfLayerFeed: 60,
    growerFeedCostPerBag: 9700,
    numOfGrowerFeed: 11,
    logistic: 17000,
    labour: 25000,
    electricity: 2000,
    medication: 15000,
  },
  {
    date: new Date("2024-03-17"),
    layerFeedCostPerBag: 10800,
    numOfLayerFeed: 60,
    growerFeedCostPerBag: 9700,
    numOfGrowerFeed: 11,
    logistic: 17000,
    labour: 25000,
    electricity: 2000,
    medication: 15000,
  },
  {
    date: new Date("2024-04-17"),
    layerFeedCostPerBag: 10800,
    numOfLayerFeed: 60,
    growerFeedCostPerBag: 9700,
    numOfGrowerFeed: 11,
    logistic: 17000,
    labour: 25000,
    electricity: 2000,
    medication: 15000,
  },
];

export const iconsArray = [
  { icon: FontAwesome6, size: 17, name: "bowl-food", color: "blue" },
  { icon: FontAwesome, size: 17, name: "wrench", color: "blue" },
  { icon: Feather, size: 17, name: "truck", color: "blue" },
  { icon: AntDesign, size: 17, name: "bulb1", color: "blue" },
  { icon: MaterialIcons, size: 17, name: "health-and-safety", color: "blue" },
  { icon: FontAwesome6, size: 17, name: "warehouse", color: "blue" },
];
