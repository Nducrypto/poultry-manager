import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../SignUp/authStyles";
import { NavigationProps } from "../../../utils/stackParamList";
import AuthInput from "../AuthInput";
import { signInWithEmailAndPassword, auth } from "../../../config/firebase";
import { useAuthentication } from "../../../controllers/authController";

const Login = () => {
  useAuthentication();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong Password");
      } else {
        setError("User not found");
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-psd/chicken-3d-rendering-premium-psd_452750-645.jpg?size=626&ext=jpg&ga=GA1.1.812039611.1690657998&semt=ais",
        }}
        style={{ ...styles.image }}
      />
      <Text style={styles.error}>{error}</Text>
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
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        {!loading && (
          <TouchableOpacity
            onPress={handleLogin}
            disabled={!email && !password}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomTextCon}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
