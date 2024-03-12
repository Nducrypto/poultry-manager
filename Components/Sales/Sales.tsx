import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useFetchSales } from "../../controllers/salesController";
import { getMonthAndYear } from "../../utils/utility";
import { SalesProp } from "./salesData";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";
import SeeMoreButton from "../Buttons/SeeMoreButton";
import { Picker } from "@react-native-picker/picker";
import { priceData } from "../Price/priceData";
const initialState = {
  customerName: "",
  customerType: "Wholesaler",
  price: "",
  amountPaid: "",
  numOfCrate: "",
};
const Sales = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState<number>(5);
  const [date, setDate] = useState(new Date());
  const monthyear = getMonthAndYear(date);
  const { allSales, totalSales, setAllSales } = useFetchSales(monthyear);

  function handleDeleteSales(id: number) {
    setAllSales((prev) => prev.filter((item: SalesProp) => item.id !== id));
  }

  useEffect(() => {
    if (currentId) {
      const foundItem: any = allSales.find((item) => item.id === currentId);
      if (foundItem) {
        setFormData(foundItem);
        setModalVisible(true);
      }
    }
  }, [currentId]);

  const isLastItemInArray = visible >= allSales.length;

  const handleValueChange = (itemValue: any, title: string) => {
    setFormData({
      ...formData,
      [title]: itemValue,
    });
  };

  const itemPrice = priceData[priceData.length - 1];

  useEffect(() => {
    if (formData.customerType === "Wholesaler") {
      setFormData({
        ...formData,
        price: itemPrice.wholeSalersPriceOne.toString(),
      });
    } else if (formData.customerType === "Retailsaler") {
      setFormData({
        ...formData,
        price: itemPrice.retailSalersPrice.toString(),
      });
    }
  }, [formData.customerType]);

  function sumTotalAmount(item: any) {
    return Number(item.numOfCrate * item.price);
  }
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.totalValueCon}>
        <View style={styles.headerAndDateCon}>
          <Text style={styles.totalHeader}>Total Sales</Text>

          <DatePickerComp
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            date={date}
            setDate={setDate}
            formattedDate={monthyear}
            color="white"
          />
        </View>
        <Text style={styles.totalValue}>
          &#8358;{""}
          {Intl.NumberFormat().format(totalSales)}
        </Text>
        <TouchableOpacity
          style={styles.openModalButCon}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.button}>Add Sale</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemCon}>
        {allSales.slice(0, visible).map((sales: any, index: number) => {
          const item = sales as SalesProp;
          const totalAmount = sumTotalAmount(item);
          const balance = totalAmount - item.amountPaid;
          return (
            <View key={index}>
              <MaxiCard
                itemId={item.id}
                date={item.date}
                color="grey"
                deleteItem={handleDeleteSales}
                setCurrentId={setCurrentId}
                backgroundColor="white"
              >
                <View style={styles.sharedData}>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                  <Text style={styles.customerType}>{item.customerType}</Text>
                </View>
                <View style={styles.sharedData}>
                  <Text>Price</Text>
                  <Text style={styles.itemValue}>
                    &#8358; {Intl.NumberFormat().format(item.price)}
                  </Text>
                </View>

                <View style={styles.sharedData}>
                  <Text>Crate{item.numOfCrate > 0 && "s"}</Text>
                  <Text style={{ ...styles.sharedText, fontSize: 16 }}>
                    {item.numOfCrate}{" "}
                  </Text>
                </View>
                <View style={styles.sharedData}>
                  <Text>Status </Text>
                  <Text style={styles.sharedText}>
                    {item.amountPaid === 0
                      ? "Not Paid"
                      : item.amountPaid > 0 && totalAmount > item.amountPaid
                      ? "Not fully paid"
                      : "Paid"}
                  </Text>
                </View>
                {balance !== 0 && (
                  <View style={styles.sharedData}>
                    <Text>Balance</Text>
                    <Text style={styles.itemValue}>
                      &#8358; {Intl.NumberFormat().format(balance)}
                    </Text>
                  </View>
                )}
                <View>
                  <Text style={styles.itemTotal}>
                    &#8358; {Intl.NumberFormat().format(totalAmount)}
                  </Text>
                </View>
              </MaxiCard>
            </View>
          );
        })}
      </View>
      {!isLastItemInArray && (
        <SeeMoreButton value={5} setVisible={setVisible} />
      )}
      <UniversalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height={100}
        width={100}
        setCurrentId={setCurrentId}
      >
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <InputField
            value={formData.customerName}
            label="Customer Name"
            onChangeText={(value) => handleValueChange(value, "customerName")}
            keyboardType="default"
            width={320}
          />
          <Text style={styles.customerTypeDropTitle}>Customer Type</Text>
          <View style={styles.pickerCon}>
            <Picker
              selectedValue={formData.customerType}
              onValueChange={(value) =>
                handleValueChange(value, "customerType")
              }
            >
              <Picker.Item label="Wholesaler" value="Wholesaler" />
              <Picker.Item label="Retailsaler" value="Retailsaler" />
            </Picker>
          </View>

          <InputField
            value={formData.price}
            label="Price"
            onChangeText={(value) => handleValueChange(value, "price")}
            keyboardType="numeric"
            width={320}
          />
          <InputField
            value={formData.amountPaid}
            label="Amount Paid"
            onChangeText={(value) => handleValueChange(value, "amountPaid")}
            keyboardType="numeric"
            width={320}
          />
          <InputField
            value={formData.numOfCrate}
            label="Number Of Crates"
            onChangeText={(value) => handleValueChange(value, "numOfCrate")}
            keyboardType="numeric"
            width={320}
          />
          {formData.price && formData.numOfCrate && (
            <Text
              style={{
                ...styles.itemTotal,
                fontSize: 17,
                color: "black",
                top: 10,
              }}
            >
              &#8358; {Intl.NumberFormat().format(sumTotalAmount(formData))}
            </Text>
          )}

          <TouchableOpacity
            style={styles.saveButCon}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ ...styles.button, color: "white", fontSize: 18 }}>
              {currentId ? "Update" : "Save"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </UniversalModal>
    </ScrollView>
  );
};

export default Sales;

const styles = StyleSheet.create({
  totalValueCon: {
    backgroundColor: "#051094",
    borderRadius: 7,
    paddingBottom: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  headerAndDateCon: { flexDirection: "row", justifyContent: "space-between" },

  totalHeader: {
    fontSize: 15,
    color: "white",
  },
  totalValue: {
    fontSize: 23,
    color: "white",
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  openModalButCon: {
    backgroundColor: "#FC46AA",
    width: 130,
    alignSelf: "center",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  button: { textAlign: "center", color: "white" },
  itemCon: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  sharedData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerType: {
    fontSize: 13,
    fontWeight: "300",
  },
  itemValue: {
    fontSize: 16,
    color: "#051094",
    fontWeight: "700",
  },
  sharedText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#051094",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#FC46AA",
  },
  customerTypeDropTitle: {
    fontWeight: "300",
    marginBottom: 5,
    marginTop: 10,
  },
  pickerCon: {
    borderWidth: 1,
    borderColor: "grey",
    width: "98%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 8,
  },
  crateInfo: {
    fontSize: 17,
    fontWeight: "bold",
  },
  saveButCon: {
    backgroundColor: "#FF1694",
    marginTop: 30,
    width: 190,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
});
