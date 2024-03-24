import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface Props {
  setForm: (value: any) => void;
  setModalVisible: (value: boolean) => void;
  initialState: any;
  color: string;
  backgroundColor: string;
}
const FloatinActionButton = ({
  setForm,
  initialState,
  setModalVisible,
  color,
  backgroundColor,
}: Props) => {
  function handleOpenModal() {
    setForm(initialState);
    setModalVisible(true);
  }
  return (
    <TouchableOpacity
      style={{ ...styles.iconButton, backgroundColor }}
      onPress={handleOpenModal}
    >
      <FontAwesome name="plus" size={20} color={color} />
    </TouchableOpacity>
  );
};

export default FloatinActionButton;

const styles = StyleSheet.create({
  iconButton: {
    bottom: 10,
    right: 10,
    alignSelf: "flex-end",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginTop: 10,
    position: "absolute",
  },
});
