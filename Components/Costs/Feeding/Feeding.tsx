import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  costOnFeeds,
  useFetchExpenses,
} from "../../../controllers/expenseController";
import { useRoute } from "@react-navigation/native";

const Feeding = () => {
  const { params } = useRoute() as any;
  const monthYear = params.monthYear;
  const { itemCostPerMonth, allCostItem } = useFetchExpenses(monthYear);
  const displayItem = allCostItem[monthYear];

  return (
    <View style={styles.container}>
      <View style={styles.totalValueCon}>
        <Text style={styles.totalText}>Total Cost on Feeding</Text>
        <Text style={styles.totalValue}>
          &#8358; {Intl.NumberFormat().format(costOnFeeds(itemCostPerMonth))}
        </Text>
      </View>
      <View style={styles.historyAndDateCon}>
        <Text style={styles.history}>History</Text>
        <Text style={styles.month}>{monthYear}</Text>
      </View>

      <FlatList
        data={displayItem}
        renderItem={({ item }) => {
          const costOfFeed = costOnFeeds(item);
          return (
            <View style={styles.card}>
              <Text style={styles.date}>{String(item.date)}</Text>
              <View style={styles.infoCon}>
                <Text style={styles.label}>Grower Feed Cost Per Bag</Text>
                <Text style={styles.value}>
                  &#8358;{" "}
                  {Intl.NumberFormat().format(item.growerFeedCostPerBag)}
                </Text>
              </View>
              <View style={styles.infoCon}>
                <Text style={styles.label}>Layer Feed Cost Per Bag</Text>
                <Text style={styles.value}>
                  &#8358; {Intl.NumberFormat().format(item.layerFeedCostPerBag)}
                </Text>
              </View>
              <View style={styles.infoCon}>
                <Text style={styles.label}>Number Of layer Feeds</Text>
                <Text style={styles.value}>
                  {Intl.NumberFormat().format(item.numOfLayerFeed)}
                </Text>
              </View>
              <View style={styles.infoCon}>
                <Text style={styles.label}>Number Of Grower Feeds</Text>
                <Text style={styles.value}>
                  {Intl.NumberFormat().format(item.numOfGrowerFeed)}
                </Text>
              </View>
              <View style={styles.infoCon}>
                <Text style={styles.label}>Cost Of Feeds</Text>
                <Text style={styles.value}>
                  &#8358; {Intl.NumberFormat().format(costOfFeed)}
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default Feeding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  totalValueCon: {
    backgroundColor: "red",
    paddingLeft: 40,
    paddingBottom: 40,
    paddingTop: 40,
    height: 130,
    elevation: 10,
    marginTop: 10,
    borderRadius: 9,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
  },
  totalValue: {
    fontSize: 23,
    fontWeight: "600",
    color: "white",
  },
  historyAndDateCon: {
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    gap: -50,
  },
  iconAndDateCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  history: { fontSize: 18, fontWeight: "300", color: "#F400A1" },
  month: { fontSize: 14, fontWeight: "300" },
  card: {
    backgroundColor: "#FBFCF8",
    elevation: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  date: {
    textAlign: "center",

    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    flex: 1,
  },
  value: {
    marginLeft: 10,
  },
});
