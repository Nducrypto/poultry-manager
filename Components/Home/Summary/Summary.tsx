import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PieChartCom from "../../ChartDisplay/PieChartCom";
import {
  useFetchExpenses,
  rentPerMonth,
  totalCostPerItem,
  totalExpenses,
} from "../../../controllers/expenseController";
import { useFetchSales } from "../../../controllers/salesController";
import SummaryCard from "./SummaryCard";
import { getMonthAndYear } from "../../../utils/utility";

const Summary = () => {
  const currentDate = new Date();
  const currentMonthYearString = getMonthAndYear(currentDate);
  const currentYear = currentMonthYearString.split("-")[1];
  const { items } = useFetchExpenses(currentYear);
  const { totalSales } = useFetchSales(currentYear);
  const currentYearData = items;
  const itemCostPerYear = totalCostPerItem(currentYearData);

  const annualExpenses = totalExpenses(itemCostPerYear, rentPerMonth);
  const annualProfit = totalSales > 0 ? totalSales - annualExpenses : 0;
  const isProfitable = annualProfit > 0;

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
            title={isProfitable ? "Profit" : "Loss"}
            value={annualProfit}
            iconUri="https://www.svgrepo.com/show/234299/profits-statistics.svg"
          />
          <SummaryCard
            title="Sales"
            value={totalSales}
            iconUri="https://www.svgrepo.com/show/430192/sales-shop-analytics.svg"
          />
          <SummaryCard
            title="Total Expenses"
            value={annualExpenses}
            iconUri="https://www.svgrepo.com/show/279390/money-cash.svg"
          />
        </View>
      </ScrollView>

      <PieChartCom
        expenses={annualExpenses}
        sales={totalSales}
        profit={annualProfit}
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
