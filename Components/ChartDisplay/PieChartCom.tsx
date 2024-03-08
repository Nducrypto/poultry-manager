import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface Props {
  expenses: number;
  sales: number;
  profit: number;
}
const PieChartCom = ({ expenses, sales, profit }: Props) => {
  const data = [
    {
      name: "Profits",
      value: profit < 0 ? 0 : profit,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sales",
      value: sales,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expenses",
      value: expenses,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={false}
      />
      <View style={styles.legendContainer}>
        {data.map(({ name, color }) => (
          <View style={styles.legendItem} key={name}>
            <View
              style={[styles.legendColorIndicator, { backgroundColor: color }]}
            />
            <Text style={styles.legendText}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
    gap: -90,
  },
  legendContainer: {
    justifyContent: "center",
    marginTop: -15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  legendColorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});
export default PieChartCom;
