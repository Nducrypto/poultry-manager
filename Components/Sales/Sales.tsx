import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import { useState } from "react";
import {
  createSales,
  deleteSales,
  updateSales,
} from "../../controllers/salesController";
import { getMonthAndYear } from "../../utils/utility";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";
import SeeMoreButton from "../Buttons/SeeMoreButton";
import { Picker } from "@react-native-picker/picker";
import PriceComp from "./Price/Price";
import { usePriceState } from "../../utils/States/priceState";
import { fetchPriceFromDatabase } from "../../controllers/priceController";
import { useToast } from "../../controllers/toastController";
import {
  SalesProps,
  sumTotalAmount,
  useSalesState,
} from "../../utils/States/salesState";
import { useAuthState } from "../../utils/States/authState";
import DataLoader from "../DataLoader/DataLoader";
import {
  searchByNameOrAddress,
  useCustomerState,
} from "../../utils/States/customerState";
import { getCustomersFromDatabase } from "../../controllers/customerController";
import { styles } from "./salesStyle";
const initialState = {
  name: "",
  type: "",
  price: "",
  amountPaid: "",
  numOfCrate: "",
  date: new Date(),
};

const Sales = () => {
  fetchPriceFromDatabase();
  getCustomersFromDatabase();
  const { priceList } = usePriceState();
  const [showPicker, setShowPicker] = useState(false);
  const [currentId, setCurrentId] = useState<null | string>(null);
  const [formData, setFormData] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [visible, setVisible] = useState<number>(5);
  const [openInputDate, setOpenInputDate] = useState(false);
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const [isCustomize, setIsCustomize] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const monthyear = getMonthAndYear(date);
  const { filteredSales, totalSales, loadingSales } = useSalesState(monthyear);
  const { setToast } = useToast();
  const { loggedInUser } = useAuthState();
  const { customersList } = useCustomerState();

  useEffect(() => {
    if (currentId) {
      const foundItem: SalesProps[] | any = filteredSales.find(
        (item: any) => item.salesId === currentId
      );
      if (foundItem) {
        setFormData({
          ...foundItem,
          type: String(foundItem.type),
          amountPaid: String(foundItem.amountPaid),
          name: String(foundItem.name),
          numOfCrate: String(foundItem.numOfCrate),
          price: String(foundItem.price),
        });
        setModalVisible(true);
      }
    }
  }, [currentId]);

  const isLastItemInArray = visible >= filteredSales.length;
  const handleValueChange = (itemValue: string | number, title: any) => {
    if (itemValue === "Customize") {
      setIsCustomize(true);
    } else if (title === "name") {
      setIsNameActive(true);
      setFormData({
        ...formData,
        [title]: itemValue,
      });
    } else {
      setFormData({
        ...formData,
        [title]: itemValue,
      });
    }
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formData.date;
    setOpenInputDate(Platform.OS === "ios");
    setFormData((prev) => ({ ...prev, date: currentDate }));
  };

  useEffect(() => {
    if (priceList.length > 0) {
      setFormData({
        ...formData,
        type: priceList[priceList.length - 1]?.label,
      });
      for (const price of priceList) {
        if (formData.type === price.label) {
          setFormData({
            ...formData,
            price: String(price.price),
          });
        }
      }
    }
  }, [formData.type, priceList.length]);

  function handleSumit() {
    const data = {
      ...formData,
      date: formData.date.getTime(),
      price: parseInt(formData.price),
      amountPaid: parseInt(formData.amountPaid),
      numOfCrate: parseInt(formData.numOfCrate),
      userId: loggedInUser?.userId,
    };
    if (currentId) {
      updateSales(currentId, data, setToast);
    } else {
      createSales(data, setToast);
    }
    setModalVisible(false);
    setCurrentId(null);
    setIsNameActive(false);
  }

  function handleDeleteSales(id: any) {
    deleteSales(id, setToast);
  }

  const getName = isNameActive
    ? searchByNameOrAddress(customersList, formData.name)
    : [];
  const isCustomerFound = isNameActive && getName.length > 0;

  const isEmpty = filteredSales.length < 1;
  const isButtonDisabled = Object.values(formData).some(
    (value) => value === ""
  );

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
        <View style={styles.valueCon}>
          {!loadingSales && (
            <Text style={styles.totalValue}>
              ₦{""}
              {Intl.NumberFormat().format(totalSales)}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.openModalButCon}
          onPress={() => {
            setFormData(initialState), setModalVisible(true);
            setIsNameActive(false);
          }}
        >
          <Text style={styles.button}>Add Sale</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemCon}>
        <DataLoader
          isLoading={loadingSales}
          isArrayEmpty={isEmpty}
          color="grey"
          size={50}
          message="No Sales available for the month"
        >
          {filteredSales.slice(0, visible).map((sales: any, index: number) => {
            const item = sales as SalesProps;
            const totalAmount = sumTotalAmount(item);
            const balance = totalAmount - item.amountPaid;
            return (
              <View key={index}>
                <MaxiCard
                  itemId={item.salesId}
                  date={item.date}
                  color="grey"
                  deleteItem={handleDeleteSales}
                  setCurrentId={setCurrentId}
                  backgroundColor="white"
                  showSmallCard={showSmallCard}
                  setShowSmallCard={setShowSmallCard}
                  marginTop={20}
                >
                  <View style={styles.sharedData}>
                    <Text style={styles.customerName}>{item.name}</Text>
                    <Text style={styles.customerType}>{item.type}</Text>
                  </View>
                  <View style={styles.sharedData}>
                    <Text>Price</Text>
                    <Text style={styles.itemValue}>
                      ₦{Intl.NumberFormat().format(item.price)}
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
                        ₦{Intl.NumberFormat().format(balance)}
                      </Text>
                    </View>
                  )}
                  <View>
                    <Text style={styles.itemTotal}>
                      ₦{Intl.NumberFormat().format(totalAmount)}
                    </Text>
                  </View>
                </MaxiCard>
              </View>
            );
          })}
        </DataLoader>
      </View>
      {!isLastItemInArray && (
        <SeeMoreButton value={5} setVisible={setVisible} />
      )}
      <UniversalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height={100}
        width={100}
        clearId={setCurrentId}
      >
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <InputField
            value={formData.name}
            label="Customer Name"
            type="text-field"
            onChangeText={(value) => handleValueChange(value, "name")}
            keyboardType="default"
            width={320}
          />
          {isCustomerFound && (
            <ScrollView style={styles.fetchedCustCon}>
              {getName.map((customer) => (
                <TouchableWithoutFeedback
                  key={customer.id}
                  onPress={() => {
                    setFormData({
                      ...formData,
                      name: customer.name,
                      type: customer.type,
                    });
                    setIsNameActive(false);
                  }}
                >
                  <View>
                    <Text style={styles.fetchedCustName}>{customer.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          )}

          <Text style={styles.customerTypeDropTitle}>Customer Type</Text>
          <View style={styles.pickerCon}>
            <Picker
              selectedValue={formData.type}
              onValueChange={(value) => handleValueChange(value, "type")}
            >
              {priceList.length < 1 && (
                <Picker.Item label="Select" value="Select" />
              )}
              {priceList.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.label}
                />
              ))}
              <Picker.Item label="Customize" value="Customize" />
            </Picker>
          </View>

          <InputField
            value=""
            placeholder={formData.price}
            label="Price"
            type="text-field"
            onChangeText={(value) => handleValueChange(value, "price")}
            keyboardType="numeric"
            width={320}
            editable={false}
          />
          <InputField
            value={formData.amountPaid}
            label="Amount Paid"
            type="text-field"
            onChangeText={(value) => handleValueChange(value, "amountPaid")}
            keyboardType="numeric"
            width={320}
          />
          <InputField
            value={formData.numOfCrate}
            label="Number Of Crates"
            type="text-field"
            onChangeText={(value) => handleValueChange(value, "numOfCrate")}
            keyboardType="numeric"
            width={320}
          />

          <InputField
            value={formData.date}
            label="Date"
            type="date"
            onChange={handleDateChange}
            showDate={openInputDate}
            setShowDate={setOpenInputDate}
            width={320}
          />

          <TouchableOpacity
            disabled={isButtonDisabled}
            style={{
              ...styles.saveButCon,
              opacity: isButtonDisabled ? 0.4 : 0.9,
            }}
            onPress={handleSumit}
          >
            <Text style={{ ...styles.button, color: "white", fontSize: 18 }}>
              {currentId ? "Update" : "Save"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <PriceComp isModalOpen={isCustomize} setIsModalOpen={setIsCustomize} />
      </UniversalModal>
    </ScrollView>
  );
};

export default Sales;
