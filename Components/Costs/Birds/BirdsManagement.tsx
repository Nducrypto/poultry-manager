import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import { useFetchExpenses } from "../../../controllers/expenseController";
import { getMonthAndYear } from "../../../utils/utility";
import Summarizer from "../../Summarizer/Summarizer";

const BirdsManagement = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const monthYearString = getMonthAndYear(date);
  const {
    numberOfBirds,
    monthlyCostPerBird,
    monthlyCostOnAllBirds,
    dailyCostPerBird,
    costPerCrate,
    dailyCostOnAllBirds,
  } = useFetchExpenses(monthYearString);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.datePicker}>
        <DatePickerComp
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          date={date}
          setDate={setDate}
          formattedDate={monthYearString}
          color="black"
          left={130}
        />
      </View>
      <Summarizer
        fontWeight="bold"
        title="Number Of Birds"
        value={numberOfBirds}
      />
      <Summarizer
        fontWeight="bold"
        title="Monthly Cost On All Birds"
        value={monthlyCostOnAllBirds}
      />
      <Summarizer
        fontWeight="bold"
        title="Monthly Cost Per Bird"
        value={monthlyCostPerBird}
      />
      <Summarizer
        fontWeight="bold"
        title="Daily Cost Per Bird"
        value={dailyCostPerBird}
      />
      <Summarizer
        fontWeight="bold"
        title="Daily Cost On All Birds"
        value={dailyCostOnAllBirds}
      />
      <Summarizer
        fontWeight="bold"
        title="Cost Per Crate"
        value={costPerCrate}
      />
    </ScrollView>
  );
};

export default BirdsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  contentContainer: {
    flexGrow: 1,
  },

  datePicker: {
    marginBottom: 20,
    right: 20,
  },
});
