import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  costOnFeeds,
  useFetchExpenses,
} from "../../../controllers/expenseController";
import { CostItem } from "../expenseData";
import SeeMoreButton from "../../Buttons/SeeMoreButton";
import MaxiCard from "../../Cards/MaxiCard";

const ExpenseHistory = ({ monthYear }: { monthYear: string }) => {
  const [endIndex, setEndIndex] = useState(10);
  const { expenseHistory } = useFetchExpenses(monthYear);
  const isLastItem = endIndex >= expenseHistory.length;

  interface DetailProp {
    label: string;
    value: number;
  }
  const CostDetailRow = ({ label, value }: DetailProp) => (
    <View style={styles.infoCon}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {label === "Number of layer feeds" ||
        label === "Number of grower feeds" ? (
          ""
        ) : (
          <Text>&#8358;</Text>
        )}
        {Intl.NumberFormat().format(value)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {expenseHistory
        .slice(0, endIndex)
        .map((item: CostItem, index: number) => (
          <View key={index}>
            <MaxiCard
              itemId={item.id}
              date={new Date(item.date)}
              color="grey"
              deleteItem={() => {}}
              setCurrentId={() => {}}
              backgroundColor="white"
            >
              <CostDetailRow label="Labour" value={item.labour} />
              <CostDetailRow
                label="Grower feed cost per bag"
                value={item.growerFeedCostPerBag}
              />
              <CostDetailRow
                label="Layer feed cost per bag"
                value={item.layerFeedCostPerBag}
              />
              <CostDetailRow
                label="Number of grower feeds"
                value={item.numOfGrowerFeed}
              />
              <CostDetailRow
                label="Number of layer feeds"
                value={item.numOfLayerFeed}
              />
              <CostDetailRow label="Electricity" value={item.electricity} />
              <CostDetailRow label="Logistic" value={item.logistic} />
              <CostDetailRow label="Medication" value={item.medication} />
              <CostDetailRow
                label="Cost on feeds"
                value={costOnFeeds(item as CostItem)}
              />
            </MaxiCard>
          </View>
        ))}

      {!isLastItem && <SeeMoreButton value={10} setVisible={setEndIndex} />}
    </View>
  );
};

export default ExpenseHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginBottom: 50,
  },

  infoCon: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontWeight: "300",
  },
  value: {
    fontSize: 16,
    color: "#CD853F",
  },
});
