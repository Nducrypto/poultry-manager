import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  setVisible: (callback: (value: number) => number) => void;
  value: number;
}
const SeeMoreButton = ({ setVisible, value }: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.visibleBut}
        onPress={() => setVisible((prev: number) => prev + value)}
      >
        <Text style={styles.seeMore}>See More...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeeMoreButton;

const styles = StyleSheet.create({
  visibleBut: {
    alignSelf: "center",
    marginBottom: 20,
  },
  seeMore: {
    textAlign: "center",
  },
});
