import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  disableButtonIfFormDataEmpty,
  getMonthAndYear,
} from "../../../utils/utility";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import {
  filterItemsByKeyAndDate,
  useExpenseState,
} from "../../../utils/States/expenseState";
import FloatinActionButton from "../../Buttons/FloatinActionButton";
import UniversalModal from "../../UniversalModal/UniversalModal";
import InputField from "../../InputField/InputField";
import {
  createExpenses,
  deleteExpenses,
} from "../../../controllers/expenseController";
import { useToast } from "../../../controllers/toastController";
import uuid from "react-native-uuid";
import { useAuthState } from "../../../utils/States/authState";
import MaxiCard from "../../Cards/MaxiCard";
import DataLoader from "../../DataLoader/DataLoader";
import { useTreatmentState } from "../../../utils/States/treatmentState";
import { fetchTreatmentFromDatabase } from "../../../controllers/treatmentController";

const initialState = {
  amount: "",
  date: new Date(),
};
const UtilityBill = () => {
  fetchTreatmentFromDatabase();
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [openInputDate, setOpenInputDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [medicationType, setMedicationType] = useState("");
  const [medicationData, setMedicationData] = useState<any>({});
  const [formData, setFormData] = useState(initialState);
  const { params } = useRoute() as any;
  const selectedItem = params.itemType;
  const oldDate = params.date;
  const [newdate, setNewDate] = useState(new Date(oldDate));
  const monthYear = getMonthAndYear(newdate);
  const { setToast } = useToast();
  const { loggedInUser } = useAuthState();
  const { treatmentList } = useTreatmentState();
  const { itemCostPerMonth, allExpense, loadingExpense } =
    useExpenseState(monthYear);
  const showHistory = filterItemsByKeyAndDate(
    newdate,
    allExpense,
    selectedItem
  );
  const totalAmount =
    itemCostPerMonth[selectedItem] > 0 ? itemCostPerMonth[selectedItem] : 0;

  function handleSubmit() {
    const data = {
      [selectedItem]: parseInt(formData.amount),
      timeStamp: formData.date.getTime(),
      userId: loggedInUser?.userId,
      id: uuid.v4(),
    };
    if (medicationType) {
      const name: any = "name";
      data[name] = medicationType as any;
    }
    createExpenses(selectedItem, data, setToast);
    setModalVisible(false);
    setFormData(initialState);
  }
  function handleValueChange(value: string | number, title: string) {
    setFormData((prev) => ({ ...prev, [title]: value }));
  }

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formData.date;
    setOpenInputDate(Platform.OS === "ios");
    setFormData((prev) => ({ ...prev, date: currentDate }));
  };

  function handleDelete(id: number) {
    deleteExpenses(selectedItem, id, setToast);
  }

  useEffect(() => {
    if (!medicationType) {
      setMedicationData({});
      return;
    }
    const filteredMedication = treatmentList.find((item) =>
      item.name.includes(medicationType)
    );
    if (!filteredMedication) {
      setMedicationData({});
      return;
    }
    const { name } = filteredMedication;
    if (name === medicationType) {
      setMedicationData({});
      return;
    }
    setMedicationData({ ...filteredMedication });
  }, [medicationType, treatmentList]);

  const formDataIsEmpty =
    disableButtonIfFormDataEmpty(formData) ||
    (selectedItem === "medication" && !medicationType);

  return (
    <View style={styles.overallwrapper}>
      <View style={styles.card}>
        <View style={styles.titleAndDateCon}>
          <Text style={styles.title}>Total Amount</Text>
          <DatePickerComp
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            date={newdate}
            setDate={setNewDate}
            formattedDate={monthYear}
            color="white"
          />
        </View>
        <Text style={styles.totalAmount}>
          ₦{Intl.NumberFormat().format(totalAmount)}
        </Text>
      </View>
      <View>
        <Text style={styles.historyText}>{selectedItem} History</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.itemCon}>
            <DataLoader
              isLoading={loadingExpense}
              isArrayEmpty={showHistory.length < 1}
              color="grey"
              size={50}
              message="Empty"
            >
              {showHistory.map((item: any, index: number) => {
                const date = new Date(item.timeStamp);

                return (
                  <View key={index}>
                    <MaxiCard
                      itemId={item.id}
                      date={date}
                      color="grey"
                      deleteItem={handleDelete}
                      backgroundColor="white"
                      showSmallCard={showSmallCard}
                      setShowSmallCard={setShowSmallCard}
                      marginTop={5}
                    >
                      <View>
                        {selectedItem === "medication" && (
                          <Text style={styles.label}>{item.name}</Text>
                        )}
                        <View style={styles.valueAndDate}>
                          <Text style={styles.amount}>Amount</Text>
                          <Text style={styles.itemPrice}>
                            ₦{Intl.NumberFormat().format(item[selectedItem])}
                          </Text>
                        </View>
                      </View>
                    </MaxiCard>
                  </View>
                );
              })}
            </DataLoader>
          </View>
        </ScrollView>
      </View>

      <FloatinActionButton
        setForm={setFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="red"
      />
      <UniversalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height={100}
        width={100}
      >
        <Text style={styles.header}>{selectedItem.toUpperCase()}</Text>
        {selectedItem === "medication" && (
          <View>
            <InputField
              value={medicationType}
              label="Label"
              type="text-field"
              onChangeText={(value) => setMedicationType(value)}
              width={320}
            />
            {medicationData && medicationData?.name && (
              <ScrollView style={styles.fetchedMedCon}>
                <TouchableOpacity
                  onPress={() => setMedicationType(medicationData.name)}
                >
                  <View>
                    <Text style={styles.fetchedMedName}>
                      {medicationData.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        )}

        <InputField
          value={formData.amount}
          label="Amount"
          type="text-field"
          onChangeText={(value) => handleValueChange(value, "amount")}
          width={320}
          keyboardType="numeric"
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
          onPress={handleSubmit}
          disabled={formDataIsEmpty}
        >
          <Text style={styles.butText}>Submit</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

export default UtilityBill;

const styles = StyleSheet.create({
  overallwrapper: {
    flex: 1,
  },
  card: {
    width: "95%",
    elevation: 10,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 7,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
  },
  titleAndDateCon: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 14, color: "white", textTransform: "capitalize" },
  totalAmount: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },

  itemCon: { paddingLeft: 10, paddingRight: 10 },
  historyText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "300",
    textTransform: "capitalize",
    marginBottom: 15,
    marginLeft: 30,
  },

  label: { textAlign: "center", fontSize: 17, marginBottom: 10 },
  valueAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  amount: { fontSize: 14, fontWeight: "300" },
  itemPrice: { color: "red", fontSize: 16 },
  header: { fontSize: 18, marginTop: 10, marginBottom: 10 },
  fetchedMedCon: {
    height: 100,
    position: "absolute",
    top: 80,
    backgroundColor: "white",
    zIndex: 10,
    width: "96%",
    borderWidth: 2,
    borderColor: "grey",
  },
  fetchedMedName: { marginTop: 10, fontSize: 16, left: 10 },

  button: {
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    top: 120,
    backgroundColor: "red",
  },
  butText: { color: "white" },
});
