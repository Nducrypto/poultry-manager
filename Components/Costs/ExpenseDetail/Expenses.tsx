import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  totalExpenses,
  useFetchExpenses,
  rentPerMonth,
} from "../../../controllers/expenseController";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import { getMonthAndYear } from "../../../utils/utility";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseHistory from "./ExpenseHistory";
import FloatinActionButton from "../../Buttons/FloatinActionButton";

interface Props {
  setUtilityTitle: (value: string) => void;
}
const ExpenseDetails = ({ setUtilityTitle }: Props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setselected] = useState("Summary");
  const [date, setDate] = useState(new Date());
  const monthYearString = getMonthAndYear(date);
  const { itemCostPerMonth } = useFetchExpenses(monthYearString);
  const monthExpenses = totalExpenses(itemCostPerMonth, rentPerMonth);

  function handleSelectTitle(title: string) {
    setselected(title);
  }
  const isSummary = selected === "Summary";
  const isHistory = selected === "History";
  return (
    <View style={{ paddingLeft: 4, paddingRight: 4, flex: 1 }}>
      <View style={styles.totalValueCon}>
        <View style={styles.dateAndHeaderCon}>
          <Text style={styles.header}>Total Expenses</Text>
          <DatePickerComp
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            date={date}
            setDate={setDate}
            formattedDate={monthYearString}
            color="white"
          />
        </View>
        <Text style={styles.totalValue}>
          &#8358;{""}
          {Intl.NumberFormat().format(monthExpenses)}
        </Text>
      </View>
      <View style={styles.sumAndHisCon}>
        <Text
          style={{
            ...styles.title,
            borderBottomWidth: isSummary ? 5 : 0,
            borderBottomColor: "#CD853F",
          }}
          onPress={() => handleSelectTitle("Summary")}
        >
          Summary
        </Text>
        <Text
          style={{
            ...styles.title,
            borderBottomWidth: isHistory ? 5 : 0,
            borderBottomColor: "#CD853F",
          }}
          onPress={() => handleSelectTitle("History")}
        >
          History
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {selected === "Summary" ? (
            <ExpenseSummary
              itemCostPerMonth={itemCostPerMonth}
              monthYear={monthYearString}
              setUtilityTitle={setUtilityTitle}
            />
          ) : (
            <ExpenseHistory monthYear={monthYearString} />
          )}
        </View>
      </ScrollView>

      <FloatinActionButton
        setForm={() => {}}
        initialState={{}}
        setModalVisible={() => {}}
        color="white"
        backgroundColor="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 9,
  },
  totalValueCon: {
    backgroundColor: "red",
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
  header: {
    fontSize: 14,
    color: "white",
    marginLeft: 3,
  },
  totalValue: {
    fontSize: 25,
    color: "white",
    fontWeight: "600",
    marginLeft: 70,
    marginTop: 22,
  },
  sumAndHisCon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "400",
    width: 97,
    textAlign: "center",
    marginBottom: 12,
  },
});

export default ExpenseDetails;
