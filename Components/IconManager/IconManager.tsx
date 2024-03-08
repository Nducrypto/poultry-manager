import { StyleSheet, View } from "react-native";
import React from "react";

interface Props {
  IconStyle: any;
  name: string;
  size: number;
  color: string;
}
const IconManager = ({ IconStyle, name, size, color }: Props) => {
  return (
    <View>
      <IconStyle name={name} size={size} color={color} />
    </View>
  );
};

export default IconManager;

const styles = StyleSheet.create({});
