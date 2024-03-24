import React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useToast } from "../../controllers/toastController";
function CustomToast() {
  const { text2, type, setToast, isVisible } = useToast();

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
    setToast((prev) => ({
      ...prev,
      isVisible: false,
      text1: "",
      text2: "",
      type: "",
    }));
  };
  const toastConfig = {
    tomatoToast: ({ text1, text2 }: { text1: string; text2: string }) => {
      const isSuccess = text1 === "success";
      return (
        <View style={isSuccess ? styles.successCon : styles.errorCon}>
          <Text style={isSuccess ? styles.succText : styles.errorText}>
            {text1}
          </Text>
          <Text style={isSuccess ? styles.succText : styles.errorText}>
            {text2}
          </Text>
        </View>
      );
    },
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
    height: 80,
    width: "95%",
    padding: 10,
    borderRadius: 7,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "grey",
    zIndex: 20,
  },
  errorCon: {
    height: 80,
    width: "95%",
    padding: 10,
    borderRadius: 2,
    backgroundColor: "darkred",
  },
  succText: {
    color: "black",
    fontWeight: "700",
  },
  errorText: {
    color: "white",
    fontWeight: "700",
  },
});
