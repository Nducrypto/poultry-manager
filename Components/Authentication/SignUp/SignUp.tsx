import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { createUserWithEmailAndPassword, auth } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./authStyles";
import { NavigationProps } from "../../../utils/stackParamList";
import AuthInput from "../AuthInput";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const navigation = useNavigation<NavigationProps>();

  const handleSignup = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Password doesnt match");
      setLoading(false);
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use");
      } else {
        setError("Password should be at least 6 characters");
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
        style={styles.image}
      />

      <Text style={styles.error}>{error}</Text>

      <Text style={styles.heading}>Sign Up</Text>
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
        <AuthInput
          iconName="lock"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.bottomTextCon}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        {!loading && (
          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignUp;
