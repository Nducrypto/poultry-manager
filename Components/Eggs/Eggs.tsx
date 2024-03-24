import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getMonthAndYear } from "../../utils/utility";
import MaxiCard from "../Cards/MaxiCard";
import PriceComp from "../Sales/Price/Price";
import {
  deletePrice,
  fetchPriceFromDatabase,
} from "../../controllers/priceController";
import { useToast } from "../../controllers/toastController";
import { useEggState } from "../../utils/States/eggsState";
import DataLoader from "../DataLoader/DataLoader";
import FloatinActionButton from "../Buttons/FloatinActionButton";

const EggManager = () => {
  fetchPriceFromDatabase();
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const [isPriceModal, setIsPriceModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const { setToast } = useToast();
  const currentDate = new Date();
  const currentMonthYear = getMonthAndYear(currentDate);
  const { cratesOfEggsToPickDaily, costPerCrate, priceArray, priceLoading } =
    useEggState(currentMonthYear);

  function handleDelete(id: string) {
    deletePrice(id, setToast);
  }
  const isEmpty = priceArray.length < 1;
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.forecastContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.itemTitle}>
              Minimum crate of eggs to pick daily
            </Text>
            <View style={styles.cratesValueCon}>
              <Text style={styles.itemValue}>{cratesOfEggsToPickDaily}</Text>
            </View>
          </View>
          <DataLoader
            isLoading={priceLoading}
            isArrayEmpty={isEmpty}
            color="blue"
            size="large"
            message="No egg prices available"
          >
            {priceArray.map((item: any) => (
              <View key={item.priceId}>
                <MaxiCard
                  itemId={item.priceId}
                  title={item.label}
                  color="black"
                  fontSize={17}
                  deleteItem={handleDelete}
                  setCurrentId={setCurrentId}
                  backgroundColor="white"
                  showSmallCard={showSmallCard}
                  setShowSmallCard={setShowSmallCard}
                  marginTop={5}
                >
                  <View style={styles.sharedData}>
                    <Text style={styles.text}>Gain per crate</Text>
                    <Text style={styles.value}>
                      ₦{Intl.NumberFormat().format(item.gainPerCrate)}
                    </Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text style={styles.text}>Egg worth</Text>
                    <Text style={styles.value}>
                      ₦{Intl.NumberFormat().format(item.eggWorth)}
                    </Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text style={styles.text}>Cost per crate</Text>
                    <Text style={styles.value}>
                      ₦{Intl.NumberFormat().format(costPerCrate)}
                    </Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text style={styles.text}>Gain in percentage</Text>
                    <Text style={{ ...styles.value, color: "blue" }}>
                      %{item.profitPerc}
                    </Text>
                  </View>

                  <Text style={styles.price}>
                    ₦{Intl.NumberFormat().format(item.itemPrice)}
                  </Text>
                </MaxiCard>
              </View>
            ))}
          </DataLoader>
        </View>

        <PriceComp
          isModalOpen={isPriceModal}
          setIsModalOpen={setIsPriceModal}
          currentId={currentId}
          clearId={setCurrentId}
        />
      </ScrollView>
      <FloatinActionButton
        setForm={() => {}}
        initialState={{}}
        setModalVisible={setIsPriceModal}
        color="white"
        backgroundColor="blue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
  sharedData: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
    fontWeight: "300",
  },
  price: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    color: "blue",
  },
});

export default EggManager;
