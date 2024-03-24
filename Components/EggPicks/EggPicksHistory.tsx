import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MaxiCard from "../Cards/MaxiCard";
import { calculateCratesForEggs } from "../../utils/States/eggPicksState";
import SeeMoreButton from "../Buttons/SeeMoreButton";
import { EggPicksProps } from "../../utils/States/eggPicksState";
import DataLoader from "../DataLoader/DataLoader";

interface Props {
  array: EggPicksProps[];
  deleteItem: (value: string) => void;
  setCurrentId: (value: string) => void;
  loading: boolean;
}
const EggPicksHistory = ({
  array,
  deleteItem,
  setCurrentId,
  loading,
}: Props) => {
  const [visible, setVisible] = useState<number>(10);
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);

  const length = array.length;
  const isLastItemInArray = visible >= length;
  const isEmpty = length < 1;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.itemContainer}>
        <DataLoader
          isLoading={loading}
          isArrayEmpty={isEmpty}
          color="#F9429E"
          size={50}
          message="No egg picked for the month"
        >
          {array.slice(0, visible).map((item: EggPicksProps, index: number) => (
            <View key={index}>
              <MaxiCard
                itemId={item.id}
                date={new Date(item.timeStamp)}
                color="grey"
                deleteItem={deleteItem}
                setCurrentId={setCurrentId}
                backgroundColor="white"
                showSmallCard={showSmallCard}
                setShowSmallCard={setShowSmallCard}
                marginTop={5}
              >
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.value}>{item.numOfEggs}</Text>
                    <Text style={styles.label}>Eggs</Text>
                  </View>
                </View>
                <View style={styles.column}>
                  <Text style={styles.value}>{item.brokenEggs}</Text>
                  <Text style={styles.label}>
                    Broken egg{item.brokenEggs > 1 ? "s" : ""}
                  </Text>
                </View>

                <Text style={styles.numOfEggsInCrate}>
                  {calculateCratesForEggs(item.numOfEggs)}
                </Text>
              </MaxiCard>
            </View>
          ))}
        </DataLoader>
      </View>
      {!isLastItemInArray && (
        <SeeMoreButton value={10} setVisible={setVisible} />
      )}
    </ScrollView>
  );
};

export default EggPicksHistory;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  noPickedEggText: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 25,
    width: "100%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    marginRight: 5,
  },
  label: {
    fontSize: 15,
  },
  numOfEggsInCrate: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    color: "#F9429E",
  },
  //
});
