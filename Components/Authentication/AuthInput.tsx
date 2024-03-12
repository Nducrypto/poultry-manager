import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./SignUp/authStyles";

interface InputWithIconProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

const AuthInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  togglePasswordVisibility,
}: InputWithIconProps) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#888" />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {iconName === "lock" && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthInput;
