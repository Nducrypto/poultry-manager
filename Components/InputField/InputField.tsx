import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  value: string | number;
  keyboardType?: KeyboardTypeOptions;
  width: number;
}
const InputField = ({
  label,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  width,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value?.toString()}
        style={{ ...styles.input, width }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
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
});
