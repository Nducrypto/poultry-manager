import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "react-native-vector-icons/AntDesign";

interface Props {
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
  date: Date;
  setDate: (value: Date) => void;
  formattedDate: string;
  color: string;
  left?: number;
}
const DatePickerComp = ({
  formattedDate,
  showPicker,
  setShowPicker,
  date,
  setDate,
  color,
  left,
}: Props) => {
  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <View style={{ ...styles.dateCon, left }}>
        <AntDesign
          name="caretdown"
          size={18}
          color={color}
          onPress={showDatePicker}
        />
        <Text style={{ ...styles.date, color }} onPress={showDatePicker}>
          {formattedDate}
        </Text>
      </View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
          display="spinner"
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DatePickerComp;

const styles = StyleSheet.create({
  dateCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  date: {
    fontSize: 14,
  },
});
