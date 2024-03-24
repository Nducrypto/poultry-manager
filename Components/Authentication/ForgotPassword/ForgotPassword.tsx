import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AuthInput from "../AuthInput";
import { sendPasswordResetEmail, auth } from "../../../config/firebase";
import {
  toastFailure,
  toastSuccess,
  useToast,
} from "../../../controllers/toastController";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../utils/stackParamList";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { setToast } = useToast();
  const navigation = useNavigation<NavigationProps>();
  async function handleSend() {
    if (!email) {
      return;
    }
    setIsloading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toastSuccess(
        "Password reset mail sent. check your inbox",
        "success",
        setToast
      );
      setIsloading(false);
    } catch (error) {
      toastFailure(
        "Oops! An error occured, check your network connection and try again",
        "error",
        setToast
      );
      setIsloading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.text}>
        Don't worry, happens to the best of us. type your email to reset your
        password
      </Text>
      <View style={styles.formWrapper}>
        <AuthInput
          iconName="envelope"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          disabled={!email || isLoading}
          onPress={handleSend}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.remPasswordButt}
      >
        <Text style={styles.remPasswordText}>Remember password ?</Text>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 140,
  },
  text: {
    textAlign: "center",
    marginTop: 30,
  },
  formWrapper: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#710193",
    paddingVertical: 13,
    paddingHorizontal: 100,
    marginTop: 50,
    borderRadius: 14,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
  },
  remPasswordButt: {
    alignSelf: "center",
    flexDirection: "row",
    top: 150,
    gap: 5,
  },
  remPasswordText: {
    fontSize: 16,
  },
  link: {
    color: "blue",
    fontSize: 16,
  },
});
