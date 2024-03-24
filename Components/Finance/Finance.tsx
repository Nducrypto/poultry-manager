import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import { getMonthAndYear } from "../../utils/utility";
import FinanceSummary from "./FinanceSummary";
import { useSalesState } from "../../utils/States/salesState";
import { useExpenseState } from "../../utils/States/expenseState";

const Finance = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const currentMonthyear = getMonthAndYear(date);
  const { totalCrates, totalSales } = useSalesState(currentMonthyear);
  const { monthlyCostOnAllBirds } = useExpenseState(currentMonthyear);
  const isProfit = totalSales > 0;
  const currentMonthProfit = isProfit ? totalSales - monthlyCostOnAllBirds : 0;
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const profitPerDay = currentMonthProfit / daysInMonth;
  const weeks = Math.ceil(daysInMonth / 7);
  const profitPerWeek = currentMonthProfit / weeks;

  const formattedDate = currentMonthyear.split("-")[0];
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
          formattedDate={formattedDate}
          color="black"
          left={230}
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
          ₦{Intl.NumberFormat().format(currentMonthProfit)}
        </Text>
      </View>

      <FinanceSummary
        isLoss={isLoss}
        title="Daily profit"
        value={profitPerDay}
      />
      <FinanceSummary
        isLoss={isLoss}
        title="Weekly profit"
        value={profitPerWeek}
      />
      <FinanceSummary
        isLoss={isLoss}
        title="Number of crates of egg sold"
        value={totalCrates}
      />
      <FinanceSummary
        isLoss={isLoss}
        title="Eggs sold daily"
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
  title: { marginLeft: 10, fontSize: 22 },
  circle: {
    width: "60%",
    alignSelf: "center",
    height: 100,
    borderRadius: 190,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  valueHeader: {
    color: "white",
  },
  value: {
    fontSize: 23,
    color: "white",
  },
});
