import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
interface Props {
  isLoading: boolean;
  isArrayEmpty: boolean;
  children: React.ReactNode;
  color: string;
  size: any;
  message?: string;
  error?: string;
}
const DataLoader = ({
  isLoading,
  isArrayEmpty,
  children,
  color,
  size,
  message,
  error,
}: Props) => {
  return (
    <View>
      {isLoading ? (
        <View style={styles.spinerCon}>
          <ActivityIndicator size={size} color={color} />
        </View>
      ) : isArrayEmpty && message === "Graph" ? (
        children
      ) : isArrayEmpty ? (
        <Text style={styles.text}>{message}</Text>
      ) : error && error?.length > 1 ? (
        <Text style={styles.text}>{error}</Text>
      ) : (
        children
      )}
    </View>
  );
};

export default DataLoader;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
  },
  spinerCon: {
    margin: 70,
  },
});
