import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MiniCardComp from "../Cards/MiniCardComp";

interface SummaryPros {
  title: string;
  value: number;
  isLoss: boolean;
}
const FinanceSummary = ({ title, value, isLoss }: SummaryPros) => {
  return (
    <View style={styles.summCon}>
      <MiniCardComp>
        <View>
          <Text style={styles.header}>{title}</Text>
          <View style={styles.valueAndIconCon}>
            <Text
              style={{ ...styles.sharedValue, color: isLoss ? "red" : "black" }}
            >
              {title === "Daily profit" || title === "Weekly profit" ? (
                <Text>₦</Text>
              ) : (
                ""
              )}
              {Intl.NumberFormat().format(value)}
            </Text>
            <View
              style={{
                ...styles.iconCon,
                backgroundColor: isLoss ? "red" : "green",
              }}
            >
              <AntDesign
                name={isLoss ? "arrowdown" : "arrowup"}
                size={11}
                color="white"
              />
            </View>
          </View>
        </View>
      </MiniCardComp>
    </View>
  );
};

export default FinanceSummary;

const styles = StyleSheet.create({
  summCon: {
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
  },
  valueAndIconCon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sharedValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconCon: {
    borderRadius: 20,
    width: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
