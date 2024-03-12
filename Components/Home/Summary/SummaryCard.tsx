import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

interface Props {
  title: string;
  value: number;
  iconUri: string;
}
const SummaryCard = ({ title, value, iconUri }: Props) => (
  <View
    style={[
      styles.card,
      {
        backgroundColor:
          title === "Profit"
            ? "blue"
            : title === "Loss"
            ? "purple"
            : title === "Sales"
            ? "green"
            : "red",
      },
    ]}
  >
    <Text style={[styles.title, { color: "white" }]}>{title}</Text>
    <View style={styles.titleAndPriceContainer}>
      <Text style={[styles.value, { color: "white" }]}>
        ₦ {Intl.NumberFormat().format(value)}
      </Text>
      <SvgUri width={25} height={25} uri={iconUri} />
    </View>
  </View>
);

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    width: 220,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    elevation: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
  },
  value: {
    fontSize: 20,
  },
  titleAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
