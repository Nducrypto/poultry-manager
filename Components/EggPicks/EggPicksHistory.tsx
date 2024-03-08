import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { EggPickProps } from "../EggPicks/eggPicksData";

import MaxiCard from "../Cards/MaxiCard";
import { calculateCratesForEggs } from "../../controllers/eggPickController";
import SeeMoreButton from "../Buttons/SeeMoreButton";

interface Props {
  eggPicksArray: any;
  deletePickedEgg: (value: number) => void;
  setCurrentId: (value: number) => void;
}
const EggPicksHistory = ({
  eggPicksArray,
  deletePickedEgg,
  setCurrentId,
}: Props) => {
  const [visible, setVisible] = useState<number>(10);
  const isLastItemInArray = visible >= eggPicksArray.length;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.itemContainer}>
        {eggPicksArray.length < 1 ? (
          <Text style={styles.noPickedEggText}>No egg picked</Text>
        ) : (
          eggPicksArray
            .slice(0, visible)
            .map((item: EggPickProps, index: number) => (
              <View key={index}>
                <MaxiCard
                  itemId={item.id}
                  date={item.date}
                  color="grey"
                  deleteItem={deletePickedEgg}
                  setCurrentId={setCurrentId}
                  backgroundColor="white"
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
            ))
        )}
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
