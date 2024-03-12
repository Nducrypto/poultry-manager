import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MiniCardComp = ({ children }: Props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.card}>{children}</View>
    </View>
  );
};

export default MiniCardComp;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FBFCF8",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 17,
    paddingRight: 13,
    paddingLeft: 13,
    width: "95%",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    alignItems: "center",
  },
});
