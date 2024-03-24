import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";

interface Props {
  label?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  value: any;
  keyboardType?: KeyboardTypeOptions;
  width: number;
  type: string;
  onChange?: any;
  showDate?: boolean;
  setShowDate?: (value: boolean) => void;
  editable?: boolean;
}
const InputField = ({
  label,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  width,
  type,
  onChange,
  setShowDate,
  showDate,
  editable,
}: Props) => {
  function showDatePicker() {
    setShowDate && setShowDate(true);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {type === "date" ? (
        <View>
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <View style={{ marginBottom: 10 }}>
              <View style={styles.date}>
                <Text>{moment(value.toString()).format("ddd MMM Do")}</Text>
                <AntDesign
                  name="caretdown"
                  size={11}
                  color="grey"
                  onPress={showDatePicker}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {showDate && (
            <DateTimePicker
              value={value}
              mode="date"
              onChange={onChange}
              display="spinner"
              maximumDate={new Date()}
            />
          )}
        </View>
      ) : (
        <TextInput
          value={value}
          style={{ ...styles.input, width }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
        />
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontWeight: "300",
  },
  input: {
    height: 49,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  dateCon: {
    marginBottom: 10,
  },
  date: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 10,
    width: "98%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 50,
    alignItems: "center",
  },
});
