import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DatePickerComp from "../../DatePickerComp/DatePickerComp";
import { getMonthAndYear } from "../../../utils/utility";
import Summarizer from "../../Summarizer/Summarizer";
import FloatinActionButton from "../../Buttons/FloatinActionButton";
import { useExpenseState } from "../../../utils/States/expenseState";
import UniversalModal from "../../UniversalModal/UniversalModal";
import InputField from "../../InputField/InputField";
import {
  addBirdNumber,
  updateBirds,
} from "../../../controllers/birdController";
import { useToast } from "../../../controllers/toastController";
import { useBirdState } from "../../../utils/States/birdState";
import { useAuthState } from "../../../utils/States/authState";
import DataLoader from "../../DataLoader/DataLoader";

const BirdsManagement = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [numOfBirds, setNumOfBirds] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const monthYearString = getMonthAndYear(date);
  const {
    monthlyCostPerBird,
    monthlyCostOnAllBirds,
    dailyCostPerBird,
    dailyCostOnAllBirds,
  } = useExpenseState(monthYearString);
  const { numberOfBirds, id, birdLoading } = useBirdState(monthYearString);
  const { setToast } = useToast();
  const { loggedInUser } = useAuthState();

  function handleSubmit() {
    const data = {
      numOfBirds: parseInt(numOfBirds),
      date: date.getTime(),
      userId: loggedInUser?.userId,
    };
    if (id) {
      updateBirds(id, data, setToast);
    } else {
      addBirdNumber(data, setToast);
    }
    setShowModal(false);
  }
  useEffect(() => {
    if (id) {
      setNumOfBirds(numberOfBirds.toString());
    } else {
      setNumOfBirds("");
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <DatePickerComp
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          date={date}
          setDate={setDate}
          formattedDate={monthYearString}
          color="black"
          left={130}
        />
      </View>
      <DataLoader
        isLoading={birdLoading}
        isArrayEmpty={false}
        color="grey"
        size={50}
      >
        <Summarizer
          fontWeight="bold"
          title="Number of birds"
          value={`${numberOfBirds}`}
        />
        <Summarizer
          fontWeight="bold"
          title="Monthly cost on all birds"
          value={monthlyCostOnAllBirds}
        />
        <Summarizer
          fontWeight="bold"
          title="Monthly cost per bird"
          value={monthlyCostPerBird}
        />
        <Summarizer
          fontWeight="bold"
          title="Daily cost per bird"
          value={dailyCostPerBird}
        />
        <Summarizer
          fontWeight="bold"
          title="Daily cost on all birds"
          value={dailyCostOnAllBirds}
        />
      </DataLoader>

      <FloatinActionButton
        setForm={setNumOfBirds}
        initialState={numOfBirds}
        setModalVisible={setShowModal}
        color="white"
        backgroundColor="black"
      />
      <UniversalModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
        height={100}
        width={100}
      >
        <InputField
          value={numOfBirds}
          label="Number of birds"
          type="text-field"
          onChangeText={(value) => setNumOfBirds(value)}
          keyboardType="numeric"
          width={320}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            opacity: !numOfBirds ? 0.5 : 0.9,
          }}
          onPress={handleSubmit}
          disabled={!numOfBirds}
        >
          <Text style={styles.butText}>Submit</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

export default BirdsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  contentContainer: {
    flexGrow: 1,
  },
  datePicker: {
    marginBottom: 20,
    right: 20,
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    top: 120,
    backgroundColor: "blue",
  },
  butText: {
    color: "white",
  },
});
