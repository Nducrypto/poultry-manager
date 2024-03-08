import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { priceData } from "./priceData";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import { toastSuccess, useToast } from "../../controllers/toastController";

interface SelecteProps {
  date: Date;
  wholeSalersPriceOne: number;
  wholeSalersPriceTwo: number;
  retailSalersPrice: number;
  id: number | null;
}

const initialState = {
  date: new Date(),
  wholeSalersPrice: "",
  RetailSalersPrice: "",
  id: "",
};

const Price = () => {
  const priceItem = priceData[priceData.length - 1];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrice, setSelectedprice] = useState<SelecteProps>(priceItem);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [PriceFormData, setPriceFormData] = useState(initialState);
  const { setSnackBar } = useToast();

  useEffect(() => {
    const findItem: any =
      currentId && priceData.find((item) => item.id === currentId);
    if (findItem) {
      setPriceFormData(findItem);
      setModalVisible(true);
    }
  }, [currentId]);

  function handleSelectPrice(item: any) {
    setSelectedprice(item);
    toastSuccess("Price Selected successfully", "success", setSnackBar);
  }

  function displayBackgroundColor(itemid: number) {
    if (selectedPrice && selectedPrice.id === itemid) {
      return "#710193";
    } else {
      return "white";
    }
  }

  function displayCheckBall(item: any) {
    if (selectedPrice.id !== item.id) {
      return (
        <Text style={styles.checkBox} onPress={() => handleSelectPrice(item)} />
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Egg prices in crate</Text>
      <FlatList
        data={priceData}
        renderItem={({ item, index }) => {
          const isSelected = selectedPrice.id === item.id;
          const backgroundColor = displayBackgroundColor(item.id);
          return (
            <View
              key={index}
              style={{ paddingHorizontal: 10, marginBottom: 5 }}
            >
              <MaxiCard
                itemId={item.id}
                date={item.date}
                color={isSelected ? "white" : "grey"}
                deleteItem={displayBackgroundColor}
                setCurrentId={setCurrentId}
                backgroundColor={backgroundColor}
              >
                {displayCheckBall(item)}
                <View>
                  <View style={styles.sharedData}>
                    <Text
                      style={{
                        ...styles.sharedText,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      Wholesalers
                    </Text>
                    <Text
                      style={{
                        ...styles.price,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      &#8358;{item.wholeSalersPriceOne}
                    </Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text
                      style={{
                        ...styles.sharedText,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      Wholesalers 2
                    </Text>
                    <Text
                      style={{
                        ...styles.price,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      &#8358;{item.wholeSalersPriceTwo}
                    </Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text
                      style={{
                        ...styles.sharedText,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      Retailsalers
                    </Text>
                    <Text
                      style={{
                        ...styles.price,
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      &#8358;{item.retailSalersPrice}
                    </Text>
                  </View>
                </View>
              </MaxiCard>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />

      <FloatinActionButton
        setForm={setPriceFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="grey"
      />

      <UniversalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height={100}
        width={100}
        setCurrentId={setCurrentId}
      >
        <InputField
          value={PriceFormData.wholeSalersPrice}
          label="Wholesalers Price"
          onChangeText={(text) => "jjjj"}
          keyboardType="default"
          width={320}
        />
        <InputField
          value={PriceFormData.RetailSalersPrice}
          label="Retailsalers Price"
          onChangeText={(text) => "jjj"}
          keyboardType="default"
          width={320}
        />
        <InputField
          value={PriceFormData.date.toString()}
          label="Retailsalers Price"
          onChangeText={(text) => "jjj"}
          keyboardType="default"
          width={320}
        />

        <TouchableOpacity
          style={styles.submitBut}
          onPress={() => setModalVisible(false)}
          disabled={true}
        >
          <Text style={styles.butText}>{currentId ? "Update" : "Submit"}</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  header: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  date: {
    fontSize: 13,
    textAlign: "center",
  },
  checkBox: {
    borderWidth: 2,
    borderColor: "grey",
    height: 17,
    width: 17,
    top: -20,
    borderRadius: 10,
  },
  sharedData: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sharedText: {
    fontSize: 15,
    fontWeight: "300",
  },
  price: {
    fontSize: 17,
  },

  submitBut: {
    backgroundColor: "blue",
    marginTop: 100,
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
