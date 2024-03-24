import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import {
  createExpenses,
  deleteExpenses,
} from "../../../controllers/expenseController";
import { useRoute } from "@react-navigation/native";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import {
  disableButtonIfFormDataEmpty,
  getMonthAndYear,
} from "../../../utils/utility";
import {
  costOnFeeds,
  costOnGrowerFeeds,
  costOnLayerFeeds,
  filterItemsByKeyAndDate,
  useExpenseState,
} from "../../../utils/States/expenseState";
import MaxiCard from "../../Cards/MaxiCard";
import FloatinActionButton from "../../Buttons/FloatinActionButton";
import UniversalModal from "../../UniversalModal/UniversalModal";
import InputField from "../../InputField/InputField";
import { useToast } from "../../../controllers/toastController";
import uuid from "react-native-uuid";
import { useAuthState } from "../../../utils/States/authState";
import DataLoader from "../../DataLoader/DataLoader";

const initialState = {
  price: "",
  number: "",
  date: new Date(),
  title: "",
  userId: "",
};
const Feeding = () => {
  const { params } = useRoute() as any;
  const selectedTitle = params?.title;
  const currentDate = params.date;
  const [showPicker, setShowPicker] = useState(false);
  const [openInputDate, setOpenInputDate] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const [newdate, setNewDate] = useState(new Date(currentDate));
  const monthYearString = getMonthAndYear(newdate);
  const { setToast } = useToast();
  const { itemCostPerMonth, allExpense } = useExpenseState(monthYearString);
  const { loggedInUser } = useAuthState();

  function normalizeTitle() {
    const sanitizedTitle = selectedTitle.replace(/\s/g, "").toLowerCase();
    return sanitizedTitle;
  }
  const docName = normalizeTitle();

  const displayItem = filterItemsByKeyAndDate(newdate, allExpense, docName);

  const feedPriceKey = `priceOf${docName}`;
  const itemNumber = `numOf${docName}`;
  const defaultCount = `${docName}EntryCount`;
  function handleCreateExpense() {
    const { price, number, date } = formData;
    const expenseData = {
      title: selectedTitle,
      userId: loggedInUser?.userId,
      timeStamp: date.getTime(),
      [feedPriceKey]: parseInt(price),
      [itemNumber]: parseInt(number),
      id: uuid.v4(),
      [defaultCount]: 1,
    };
    createExpenses(docName, expenseData, setToast);
    resetForm();
  }

  function resetForm() {
    setFormData(initialState);
    setModalVisible(false);
  }

  function handleDeleteExpense(id: number) {
    deleteExpenses(docName, id, setToast);
  }
  function handleValueChange(value: string | number, title: string) {
    setFormData((prev) => ({ ...prev, [title]: value }));
  }

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formData.date;
    setOpenInputDate(Platform.OS === "ios");
    setFormData((prev) => ({ ...prev, date: currentDate }));
  };

  const isGrowerFeed = selectedTitle === "Grower feed";
  const totalCost = isGrowerFeed
    ? costOnGrowerFeeds(itemCostPerMonth)
    : costOnLayerFeeds(itemCostPerMonth);
  const formDataIsEmpty = !formData.number || !formData.number;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 35 }}
      >
        <View style={styles.totalValueCon}>
          <View style={styles.titleAndDateCon}>
            <Text style={styles.title}>Total cost</Text>
            <DatePickerComp
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              date={newdate}
              setDate={setNewDate}
              formattedDate={monthYearString}
              color="white"
            />
          </View>
          <Text style={styles.totalAmount}>
            ₦ {Intl.NumberFormat().format(totalCost)}
          </Text>
        </View>

        <Text style={styles.history}>History</Text>
        <DataLoader
          isLoading={false}
          isArrayEmpty={displayItem.length < 1}
          color="grey"
          size={50}
          message="Empty"
        >
          {displayItem.map((item: any, index: number) => {
            const costOfFeed = costOnFeeds(item);
            return (
              <View key={index}>
                <MaxiCard
                  itemId={item.id}
                  date={new Date(item.timeStamp)}
                  color="black"
                  deleteItem={handleDeleteExpense}
                  backgroundColor="white"
                  showSmallCard={showSmallCard}
                  setShowSmallCard={setShowSmallCard}
                  marginTop={5}
                >
                  <View style={styles.item}>
                    <View>
                      <View style={styles.infoCon}>
                        <Text style={styles.label}>Price</Text>
                        <Text style={styles.sharedValue}>
                          ₦{Intl.NumberFormat().format(item[feedPriceKey])}
                        </Text>
                      </View>
                      <View style={styles.infoCon}>
                        <Text style={styles.label}>Number</Text>
                        <Text style={styles.sharedValue}>
                          {Intl.NumberFormat().format(item[itemNumber])}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.value}>
                      ₦{Intl.NumberFormat().format(costOfFeed)}
                    </Text>
                  </View>
                </MaxiCard>
              </View>
            );
          })}
        </DataLoader>

        <UniversalModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          height={100}
          width={100}
        >
          <Text style={styles.header}>{selectedTitle.toUpperCase()}</Text>
          <ScrollView style={{ flex: 1 }}>
            <InputField
              value={formData.price}
              label="Price"
              type="text-field"
              onChangeText={(value) => handleValueChange(value, "price")}
              keyboardType="numeric"
              width={320}
            />
            <InputField
              value={formData.number}
              label="Number"
              type="text-field"
              onChangeText={(value) => handleValueChange(value, "number")}
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
              style={{
                ...styles.button,
                opacity: formDataIsEmpty ? 0.5 : 0.9,
              }}
              onPress={handleCreateExpense}
              disabled={formDataIsEmpty}
            >
              <Text style={styles.butText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </UniversalModal>
      </ScrollView>
      <FloatinActionButton
        setForm={setFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="red"
      />
    </View>
  );
};

export default Feeding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  totalValueCon: {
    width: "100%",
    elevation: 10,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 7,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  titleAndDateCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  totalAmount: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 25,
  },
  history: {
    fontSize: 18,
    fontWeight: "300",
    color: "#F400A1",
    marginTop: 10,
  },
  item: {
    marginTop: 5,
  },
  itemLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  infoCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "300",
  },
  sharedValue: {
    color: "#F400A1",
    fontSize: 15,
    fontWeight: "500",
  },
  value: {
    marginTop: 10,
    color: "red",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 70,
    backgroundColor: "red",
  },
  butText: {
    color: "white",
  },
});
