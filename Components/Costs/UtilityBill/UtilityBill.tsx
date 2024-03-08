import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetchExpenses } from "../../../controllers/expenseController";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const UtilityBill = () => {
  const { params } = useRoute() as any;
  const selectedItem = params.lowerCase;
  const monthYear = params.monthYear;
  const { itemCostPerMonth, expenseHistory } = useFetchExpenses(monthYear);

  const totalAmount =
    itemCostPerMonth[selectedItem] > 0 ? itemCostPerMonth[selectedItem] : 0;

  return (
    <View style={styles.overallwrapper}>
      <View style={styles.card}>
        <View style={styles.titleAndDateCon}>
          <Text style={styles.title}>Total Amount</Text>
          <Text style={styles.title}>{monthYear}</Text>
        </View>
        <Text style={styles.totalAmount}>&#8358; {totalAmount}</Text>
      </View>
      <View>
        <Text style={styles.historyText}>{selectedItem} History</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.itemCon}>
            {expenseHistory.map((item: any, index: number) => (
              <View key={index} style={styles.item}>
                <Text>
                  {moment(String(item.date)).format("dddd, MMM Do YYYY")}
                </Text>
                <Text style={styles.itemPrice}>
                  &#8358;{item[selectedItem]}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UtilityBill;

const styles = StyleSheet.create({
  overallwrapper: {
    backgroundColor: "white",
    flex: 1,
  },
  card: {
    width: 300,
    elevation: 10,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 7,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  titleAndDateCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "white",
    textTransform: "capitalize",
  },
  totalAmount: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },

  itemCon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  historyText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "300",
    textTransform: "capitalize",
    marginBottom: 15,
    marginLeft: 30,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FEFFFC",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  itemPrice: {
    color: "red",
  },
});
