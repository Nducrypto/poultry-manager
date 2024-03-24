import React from "react";
import { StyleSheet, View } from "react-native";
import QuickAccess from "./QuickAccess/QuickAccess";
import Summary from "./Summary/Summary";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { getSalesFromDatabase } from "../../controllers/salesController";
import { fetchBirdsFromDatabase } from "../../controllers/birdController";
import { fetchExpenseFromDatabase } from "../../controllers/expenseController";
import { useAuthentication } from "../../controllers/authController";

const HomePage = () => {
  getSalesFromDatabase();
  fetchExpenseFromDatabase();
  fetchBirdsFromDatabase();
  useAuthentication();

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
