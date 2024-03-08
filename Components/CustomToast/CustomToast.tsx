import React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useToast } from "../../controllers/toastController";
function CustomToast() {
  const { text2, type, setSnackBar, isVisible } = useToast();

  useEffect(() => {
    if (isVisible) {
      showToast();
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [isVisible]);

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: type,
      text2: `👋 ${text2}`,
    });
  };
  const closeToast = () => {
    setSnackBar((prev) => ({
      ...prev,
      isVisible: false,
      text1: "",
      text2: "",
      type: "",
    }));
  };
  const toastConfig = {
    tomatoToast: ({ text1, text2 }: { text1: string; text2: string }) => (
      <View style={text1 === "success" ? styles.successCon : styles.errorCon}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    ),
  };

  if (!isVisible) {
    return null;
  } else {
    return <Toast config={toastConfig as any} />;
  }
}

export default CustomToast;

export const styles = StyleSheet.create({
  successCon: {
    height: 60,
    width: "95%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#710193",
  },
  errorCon: {
    height: 60,
    width: "95%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "darkred",
  },
  text: {
    color: "white",
  },
});
