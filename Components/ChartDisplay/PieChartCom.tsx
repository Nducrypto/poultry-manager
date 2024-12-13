// import React from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import DataLoader from "../DataLoader/DataLoader";

// interface Props {
//   expenses: number;
//   sales: number;
//   profit: number;
//   loading: boolean;
// }
// const PieChartCom = ({ expenses, sales, profit, loading }: Props) => {
//   const isEmpty = !expenses && !sales && !profit;

//   const data = [
//     {
//       name: "Profits",
//       value: isEmpty ? 1 : profit < 0 ? 0 : profit,
//       color: "blue",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Sales",
//       value: isEmpty ? 1 : sales,
//       color: "green",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//     {
//       name: "Expenses",
//       value: isEmpty ? 1 : expenses,
//       color: "red",
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 15,
//     },
//   ];
//   const shortenNumber = (number: number) => {
//     if (number >= 1000000) {
//       return (number / 1000000).toFixed(2) + "M";
//     } else if (number >= 1000) {
//       return (number / 1000).toFixed(1) + "K";
//     } else {
//       return number.toString();
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <DataLoader
//         isLoading={loading}
//         isArrayEmpty={!expenses && !sales && !profit}
//         color="blue"
//         size={25}
//         message="Graph"
//       >
//         <PieChart
//           data={data}
//           width={300}
//           height={200}
//           chartConfig={{
//             backgroundColor: "#ffffff",
//             backgroundGradientFrom: "#ffffff",
//             backgroundGradientTo: "#ffffff",
//             color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//           }}
//           accessor="value"
//           backgroundColor="transparent"
//           paddingLeft="15"
//           absolute
//           hasLegend={false}
//         />
//       </DataLoader>

//       <View style={styles.legendContainer}>
//         {data.map(({ color, value }) => {
//           return (
//             <View style={styles.legendItem} key={color}>
//               <View
//                 style={[
//                   styles.legendColorIndicator,
//                   { backgroundColor: color },
//                 ]}
//               />
//               <Text style={styles.legendText}>
//                 {isEmpty ? 0 : shortenNumber(value)}
//               </Text>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//     flexDirection: "row",
//     gap: -90,
//   },
//   legendContainer: {
//     justifyContent: "center",
//     marginTop: -15,
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   legendColorIndicator: {
//     width: 15,
//     height: 15,
//     borderRadius: 10,
//     marginRight: 5,
//   },
//   legendText: {
//     fontSize: 14,
//     color: "#333",
//   },
// });
// export default PieChartCom;
