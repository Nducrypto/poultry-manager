import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import { getMonthAndYear } from "../../../utils/utility";
import ExpenseHistory from "./ExpenseHistory";
import {
  totalExpenses,
  useExpenseState,
} from "../../../utils/States/expenseState";
import DataLoader from "../../DataLoader/DataLoader";

interface Props {
  setUtilityTitle: (value: string) => void;
}
const ExpenseDetails = ({ setUtilityTitle }: Props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const monthYearString = getMonthAndYear(date);
  const { itemCostPerMonth, rentPerMonth, loadingExpense, errorMessage } =
    useExpenseState(monthYearString);

  const monthExpenses = totalExpenses(itemCostPerMonth, rentPerMonth);
  return (
    <View style={styles.container}>
      <View style={styles.totalValueCon}>
        <View style={styles.dateAndHeaderCon}>
          <Text style={styles.title}>Total Expenses</Text>
          <DatePickerComp
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            date={date}
            setDate={setDate}
            formattedDate={monthYearString}
            color="white"
          />
        </View>
        {loadingExpense ? (
          <Text style={styles.totalValue}>₦{""}...</Text>
        ) : (
          <Text style={styles.totalValue}>
            ₦{""}
            {Intl.NumberFormat().format(monthExpenses)}
          </Text>
        )}
      </View>

      <ScrollView
        style={{ width: "105%" }}
        showsVerticalScrollIndicator={false}
      >
        <DataLoader
          isLoading={loadingExpense}
          isArrayEmpty={false}
          color="grey"
          size={50}
          message="No Sales available for the month"
          error={errorMessage}
        >
          <ExpenseHistory
            itemCostPerMonth={itemCostPerMonth}
            date={date}
            setUtilityTitle={setUtilityTitle}
          />
        </DataLoader>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingLeft: 4, paddingRight: 4, flex: 1, alignItems: "center" },

  totalValueCon: {
    backgroundColor: "red",
    width: "100%",
    borderRadius: 7,
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  dateAndHeaderCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    left: 200,
  },
  date: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    color: "white",
    marginLeft: 3,
  },
  totalValue: {
    fontSize: 25,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 22,
  },
});

export default ExpenseDetails;
