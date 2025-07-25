import { StyleSheet, View } from "react-native";
import React from "react";
import { calculateCratesForEggs } from "../../utils/States/eggPicksState";
import Summarizer from "../Summarizer/Summarizer";

interface Props {
  totalPickedEggs: any;
  totalBrokenEggs: any;
}
const EggPicksSummary = ({ totalPickedEggs, totalBrokenEggs }: Props) => {
  const totalPickedInCrate = calculateCratesForEggs(totalPickedEggs);

  return (
    <View style={styles.container}>
      <Summarizer
        title="Total picked eggs"
        value={totalPickedEggs}
        fontWeight="bold"
        color="#F9429E"
        currency={false}
      />
      <Summarizer
        title="Total crates"
        value={totalPickedInCrate}
        fontWeight="bold"
        color="#F9429E"
        currency={false}
      />
      <Summarizer
        title="Total broken eggs"
        value={totalBrokenEggs}
        fontWeight="bold"
        color="#F9429E"
        currency={false}
      />
    </View>
  );
};

export default EggPicksSummary;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
