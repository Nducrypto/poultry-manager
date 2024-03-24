import React from "react";
import MiniCardComp from "../Cards/MiniCardComp";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  value: any;
  color?: string;
  fontWeight?: any;
  currency?: boolean;
}
const Summarizer = ({ title, value, color, fontWeight, currency }: Props) => {
  return (
    <MiniCardComp>
      <View>
        <View style={styles.sharedData}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={{ ...styles.itemValue, color, fontWeight }}>
            {typeof value === "string" ? (
              value
            ) : currency === false ? (
              value
            ) : (
              <Text> ₦{Intl.NumberFormat().format(parseInt(value))}</Text>
            )}
          </Text>
        </View>
      </View>
    </MiniCardComp>
  );
};

export default Summarizer;

const styles = StyleSheet.create({
  sharedData: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "300",
  },

  itemValue: {
    fontSize: 17,
  },
});
