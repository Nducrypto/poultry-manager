import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFetchEggs } from "../../controllers/eggManagerController";
import { getMonthAndYear } from "../../utils/utility";
import Summarizer from "../Summarizer/Summarizer";

const EggManager = () => {
  const currentDate = new Date();
  const currentMonthYear = getMonthAndYear(currentDate);
  const {
    cratesOfEggsToSaleDaily,
    grossAmountPerDay,
    grossAmountPerMonth,
    netProfitPerday,
    netProfitPerMonth,
    gainPerCrateForWholeSalerOne,
    gainPerCrateForWholeSalerTwo,
    gainPerCrateForRetailSaler,
    eggWorthRetailSale,
    eggWorthWholeSale,
    eggWorthWholeSaleTwo,
    wholeSalerOnePerc,
    wholeSalerTwoPerc,
    retailSalerPerc,
  } = useFetchEggs(currentMonthYear);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.forecastContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.itemTitle}>
            Minimum crate of eggs to pick daily
          </Text>
          <View style={styles.cratesValueCon}>
            <Text style={styles.itemValue}>{cratesOfEggsToSaleDaily}</Text>
          </View>
        </View>

        <Summarizer
          fontWeight="500"
          color="blue"
          title="Gain per crate Wholesalers"
          value={gainPerCrateForWholeSalerOne}
          percentage={wholeSalerOnePerc}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Gain per crate Wholesalers 2 "
          value={gainPerCrateForWholeSalerTwo}
          percentage={wholeSalerTwoPerc}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Gain per crate Retailsalers"
          value={gainPerCrateForRetailSaler}
          percentage={retailSalerPerc}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Egg worth wholesale"
          value={eggWorthWholeSale}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Egg worth wholesale 2"
          value={eggWorthWholeSaleTwo}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Egg worth retail sale"
          value={eggWorthRetailSale}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Net profit per day"
          value={netProfitPerday}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Net profit per month"
          value={netProfitPerMonth}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Gross amount per day"
          value={grossAmountPerDay}
        />
        <Summarizer
          fontWeight="500"
          color="blue"
          title="Gross amount per month"
          value={grossAmountPerMonth}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,

    flex: 1,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  forecastContainer: {
    elevation: 10,
  },
  summaryItem: {
    marginBottom: 5,
    backgroundColor: "#F8F8FF",
    padding: 5,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  cratesValueCon: {
    width: 60,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "blue",
    borderRadius: 20,
    marginTop: 4,
  },
  itemValue: {
    fontSize: 32,
    color: "white",
  },
});

export default EggManager;
