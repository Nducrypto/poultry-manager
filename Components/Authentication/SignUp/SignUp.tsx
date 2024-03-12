import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./authStyles";
import { NavigationProps } from "../../../utils/stackParamList";
import AuthInput from "../AuthInput";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleSignup = async (screen: any) => {
    setLoading(true);
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: screen }],
      });
      setLoading(false);
    } catch (error) {
      console.error("Sign Up error:", error);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-psd/chicken-3d-rendering-premium-psd_452750-645.jpg?size=626&ext=jpg&ga=GA1.1.812039611.1690657998&semt=ais",
        }}
        style={styles.image}
      />
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.formWrapper}>
        <AuthInput
          iconName="user"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <AuthInput
          iconName="envelope"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <AuthInput
          iconName="lock"
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
        />
        <AuthInput
          iconName="lock"
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          showPassword={showConfirmPassword}
        />
        <View style={styles.bottomTextCon}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => handleSignup("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        {!loading && (
          <TouchableOpacity
            onPress={() => handleSignup("Price")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignUp;
