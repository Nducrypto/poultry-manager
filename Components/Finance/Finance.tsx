import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useFetchSales } from "../../controllers/salesController";
import { useFetchExpenses } from "../../controllers/expenseController";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import { getMonthAndYear } from "../../utils/utility";
import FinanceSummary from "./FinanceSummary";

const Finance = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const currentMonthyear = getMonthAndYear(date);
  const { totalCrates, totalSales } = useFetchSales(currentMonthyear);
  const { monthlyCostOnAllBirds } = useFetchExpenses(currentMonthyear);
  const currentMonthProfit =
    totalSales > 0 ? totalSales - monthlyCostOnAllBirds : 0;
  const profitPerDay = currentMonthProfit / 30;
  const display = currentMonthyear.split("-")[0];
  const isLoss = currentMonthProfit < 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerAndDateCon}>
        <Text style={styles.title}>Monthly Profit</Text>
        <DatePickerComp
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          date={date}
          setDate={setDate}
          formattedDate={display}
          color="black"
          left={200}
        />
      </View>
      <View
        style={{
          ...styles.circle,
          backgroundColor: isLoss ? "red" : "green",
        }}
      >
        <Text style={styles.valueHeader}>Total Profit</Text>
        <Text style={styles.value}>
          &#8358; {Intl.NumberFormat().format(currentMonthProfit)}
        </Text>
      </View>

      <FinanceSummary
        isLoss={isLoss}
        title="Profit per day"
        value={profitPerDay}
      />
      <FinanceSummary
        isLoss={isLoss}
        title="Total number of crate of egg sold"
        value={totalCrates}
      />
      <FinanceSummary
        isLoss={isLoss}
        title="Eggs sold per day"
        value={totalCrates / 30}
      />
    </View>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerAndDateCon: { flexDirection: "row", gap: -140, marginTop: 20 },

  title: { marginLeft: 10, fontSize: 24 },
  circle: {
    width: "60%",
    alignSelf: "center",
    height: 200,
    borderRadius: 190,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  valueHeader: {
    color: "white",
  },
  value: {
    fontSize: 26,
    color: "white",
  },
});
