import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PieChartCom from "../../ChartDisplay/PieChartCom";
import SummaryCard from "./SummaryCard";
import { getMonthAndYear } from "../../../utils/utility";
import { useSalesState } from "../../../utils/States/salesState";
import {
  totalCostPerItem,
  totalExpenses,
  useExpenseState,
} from "../../../utils/States/expenseState";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
const Summary = () => {
  const date = new Date();
  const currentMonthYear = getMonthAndYear(date);
  const currentYear = currentMonthYear.split("-")[1];
  const { filteredExpense, rentPerMonth } = useExpenseState(currentYear);
  const { totalSales, loadingSales } = useSalesState(currentYear);
  const currentYearData = filteredExpense;
  const itemCostPerYear = totalCostPerItem(currentYearData);
  const annualExpenses = totalExpenses(itemCostPerYear, rentPerMonth);
  const annualProfit = totalSales > 0 ? totalSales - annualExpenses : 0;
  const checkAnnualProfit = annualProfit < 0 ? 0 : annualProfit;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Summary</Text>
        <Text style={styles.dateText}>{currentYear}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <SummaryCard
            title={"Profit"}
            value={checkAnnualProfit}
            iconUri={Feather}
            loading={loadingSales}
            iconName="bar-chart-2"
          />
          <SummaryCard
            title="Sales"
            value={totalSales}
            loading={loadingSales}
            iconUri={FontAwesome}
            iconName="money"
          />
          <SummaryCard
            title="Total Expenses"
            value={annualExpenses}
            loading={loadingSales}
            iconUri={AntDesign}
            iconName="export"
          />
        </View>
      </ScrollView>

      <PieChartCom
        expenses={annualExpenses}
        sales={totalSales}
        profit={annualProfit}
        loading={loadingSales}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 38,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "400",
  },
  dateText: {
    fontSize: 21,
    fontWeight: "400",
  },
  scrollView: {
    paddingRight: 5,
    paddingLeft: 4,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
