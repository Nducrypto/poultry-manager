import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import UniversalModal from "../../UniversalModal/UniversalModal";
import InputField from "../../InputField/InputField";
import { useToast } from "../../../controllers/toastController";
import { addNewPrice } from "../../../controllers/priceController";
import { usePriceState } from "../../../utils/States/priceState";
import { useAuthState } from "../../../utils/States/authState";
import { disableButtonIfFormDataEmpty } from "../../../utils/utility";
interface NewProps {
  setIsModalOpen: any;
  isModalOpen: any;
  currentId?: any;
  clearId?: (value: number | null) => void;
}
const initialState = {
  label: "",
  price: "",
  date: new Date().getTime(),
};
const PriceComp = ({
  isModalOpen,
  setIsModalOpen,
  currentId,
  clearId,
}: NewProps) => {
  const [formData, setFormData] = useState(initialState);
  const { priceList } = usePriceState();
  const { setToast } = useToast();
  const { loggedInUser } = useAuthState();

  const handleValueChange = (itemValue: any, title: string) => {
    setFormData({
      ...formData,
      [title]: itemValue,
    });
  };
  function handleAddPrice() {
    const data = {
      ...formData,
      price: parseInt(formData.price),
      label: formData.label,

      userId: loggedInUser?.userId,
    };
    addNewPrice(data, setToast);
    setIsModalOpen(false);
    setFormData(initialState);
  }
  useEffect(() => {
    if (currentId) {
      const foundItem: any = priceList.find(
        (item) => item.priceId === currentId
      );
      if (foundItem) {
        setFormData({
          price: foundItem.price.toString(),
          label: foundItem.label,
          date: foundItem.date,
        });
        setIsModalOpen(true);
      }
    }
  }, [currentId]);

  const formDataIsEmpty = disableButtonIfFormDataEmpty(formData);

  return (
    <UniversalModal
      modalVisible={isModalOpen}
      setModalVisible={setIsModalOpen}
      height={100}
      width={100}
      clearId={clearId}
    >
      <Text style={styles.Text}>Price</Text>
      <InputField
        value={formData.label}
        label="Label"
        type="text-field"
        onChangeText={(value) => handleValueChange(value, "label")}
        width={320}
      />
      <InputField
        value={formData.price}
        label="Amount"
        type="text-field"
        onChangeText={(value) => handleValueChange(value, "price")}
        keyboardType="numeric"
        width={320}
      />
      <TouchableOpacity
        style={{ ...styles.submitBut, opacity: formDataIsEmpty ? 0.5 : 0.9 }}
        onPress={handleAddPrice}
        disabled={formDataIsEmpty}
      >
        <Text style={styles.butText}>Save</Text>
      </TouchableOpacity>
    </UniversalModal>
  );
};

export default PriceComp;
const styles = StyleSheet.create({
  Text: {
    fontSize: 19,
    fontWeight: "600",
  },
  submitBut: {
    backgroundColor: "blue",
    top: 100,
    width: 180,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  butText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
