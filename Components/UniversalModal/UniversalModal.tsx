import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

interface Props {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setCurrentId?: any;
  height?: number;
  width?: number;
}
const UniversalModal = ({
  children,
  modalVisible,
  setModalVisible,
  height,
  width,
  setCurrentId,
}: Props) => {
  function handleCloseModal() {
    setModalVisible(false);
    setCurrentId && setCurrentId(null);
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              height: height ? `${height}%` : 0,
              width: width ? `${width}%` : 0,
            }}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  openButton: {
    fontSize: 20,
    color: "#007AFF",
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    elevation: 5,
  },

  closeButton: {
    alignSelf: "flex-end",
  },
});

export default UniversalModal;
