import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./SignUp/authStyles";

interface InputWithIconProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const AuthInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
}: InputWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#888" />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={
          placeholder === "Password" || placeholder === "Confirm Password"
            ? !showPassword
            : false
        }
      />
      {iconName === "lock" && (
        <TouchableOpacity onPress={() => togglePasswordVisibility()}>
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
