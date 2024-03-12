import React from "react";
import { StyleSheet, View } from "react-native";
import QuickAccess from "./QuickAccess/QuickAccess";
import Summary from "./Summary/Summary";
import BottomNavbar from "../BottomNavbar/BottomNavbar";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Summary />
      <QuickAccess />
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FD",
  },
});

export default HomePage;
