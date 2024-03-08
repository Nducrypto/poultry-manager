import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../SignUp/authStyles";
import { NavigationProps } from "../../../utils/stackParamList";
import AuthInput from "../AuthInput";

interface LoginProps {
  setCurrentUser: (value: boolean) => void;
}
const Login = ({ setCurrentUser }: LoginProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async (screen: any) => {
    setLoading(true);
    try {
      setCurrentUser(true);
      navigation.reset({ index: 0, routes: [{ name: screen }] });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-psd/chicken-3d-rendering-premium-psd_452750-645.jpg?size=626&ext=jpg&ga=GA1.1.812039611.1690657998&semt=ais",
        }}
        style={{ ...styles.image, marginTop: 30 }}
      />
      <Text style={{ ...styles.heading, marginTop: 30 }}>Log In</Text>
      <View style={styles.formWrapper}>
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
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
        />
        <View style={styles.bottomTextCon}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => handleLogin("SignUp")}>
            <Text style={styles.link}>SignUp</Text>
          </TouchableOpacity>
        </View>
        {!loading && (
          <TouchableOpacity
            onPress={() => handleLogin("Home")}
            // disabled={!email || !password}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Login;
