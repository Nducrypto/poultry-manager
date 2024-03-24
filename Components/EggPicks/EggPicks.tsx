import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import { useState } from "react";
import {
  disableButtonIfFormDataEmpty,
  getMonthAndYear,
} from "../../utils/utility";
import {
  addPickedEgg,
  fetchEggPicksFromDatabase,
  removePickedEgg,
  updateEggPick,
} from "../../controllers/eggPickController";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import EggPicksHistory from "./EggPicksHistory";
import EggPicksSummary from "./EggPicksSummary";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import { useToast } from "../../controllers/toastController";
import { useEggPickState } from "../../utils/States/eggPicksState";
import { useAuthState } from "../../utils/States/authState";

const initialState = {
  numOfEggs: "",
  brokenEggs: "",
  date: new Date(),
};
const EggPicks = () => {
  fetchEggPicksFromDatabase();
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setselected] = useState("Summary");
  const [formData, setFormData] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [openInputDate, setOpenInputDate] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const { setToast } = useToast();
  const currentMonthyear = getMonthAndYear(date);
  const { loggedInUser } = useAuthState();

  const { monthlyEggPicks, loadingEggPicks } =
    useEggPickState(currentMonthyear);
  const { history, total } = monthlyEggPicks;

  const [, year] = currentMonthyear.split("-");
  const formatMonth = currentMonthyear.slice(0, 3);
  const formatedDate = `${formatMonth}-${year}`;

  useEffect(() => {
    if (currentId) {
      const foundItem: any = history.find((item) => item.id === currentId);
      if (foundItem) {
        setFormData({
          numOfEggs: String(foundItem.numOfEggs),
          brokenEggs: String(foundItem.brokenEggs),
          date: new Date(foundItem.timeStamp),
        });
        setModalVisible(true);
      }
    }
  }, [currentId]);

  function submitForm() {
    const data = {
      numOfEggs: parseInt(formData.numOfEggs),
      brokenEggs: parseInt(formData.brokenEggs),
      timeStamp: formData.date.getTime(),
      userId: loggedInUser?.userId,
    };
    if (currentId) {
      updateEggPick(currentId, data, setToast);
    } else {
      addPickedEgg(data, setToast);
    }
    setModalVisible(false);
    setFormData(initialState);
    setCurrentId("");
  }

  function deletePickedEgg(itemId: string) {
    removePickedEgg(itemId, setToast);
  }
  function handleSelectTitle(title: string) {
    setselected(title);
  }

  function isSelected(title: string) {
    return selected === title;
  }

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formData.date;
    setOpenInputDate(Platform.OS === "ios");
    setFormData((prev) => ({ ...prev, date: currentDate }));
  };

  const formDataIsEmpty = disableButtonIfFormDataEmpty(formData);

  interface Props {
    [key: string]: React.ReactNode;
  }
  const displayItem: Props = {
    Summary: (
      <EggPicksSummary
        totalPickedEggs={total?.numOfEggs}
        totalBrokenEggs={total.brokenEggs}
      />
    ),
    History: (
      <EggPicksHistory
        array={history}
        deleteItem={deletePickedEgg}
        setCurrentId={setCurrentId}
        loading={loadingEggPicks}
      />
    ),
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateCon}>
        <DatePickerComp
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          date={date}
          setDate={setDate}
          formattedDate={formatedDate}
          color="black"
          left={120}
        />
      </View>

      <View style={styles.sumAndHisCon}>
        <Text
          style={{
            ...styles.title,
            borderBottomWidth: isSelected("Summary") ? 5 : 0,
            borderBottomColor: "#F9429E",
          }}
          onPress={() => handleSelectTitle("Summary")}
        >
          Summary
        </Text>
        <Text
          style={{
            ...styles.title,
            borderBottomWidth: isSelected("History") ? 5 : 0,
            borderBottomColor: "#F9429E",
          }}
          onPress={() => handleSelectTitle("History")}
        >
          History
        </Text>
      </View>

      {displayItem[selected]}
      <FloatinActionButton
        setForm={setFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="#F9429E"
      />
      <UniversalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height={100}
        width={100}
        clearId={setCurrentId}
      >
        <InputField
          value={formData.numOfEggs}
          label="Number of eggs"
          type="text-field"
          onChangeText={(value) =>
            setFormData({ ...formData, numOfEggs: value })
          }
          keyboardType="numeric"
          width={320}
        />
        <InputField
          value={formData.brokenEggs}
          label="Broken eggs"
          type="text-field"
          onChangeText={(value) =>
            setFormData({ ...formData, brokenEggs: value })
          }
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
          style={{ ...styles.saveButCon, opacity: formDataIsEmpty ? 0.5 : 0.9 }}
          onPress={submitForm}
          disabled={formDataIsEmpty}
        >
          <Text style={{ ...styles.button, color: "white" }}>Save</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

export default EggPicks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
  },

  dateCon: { marginTop: 14, marginBottom: 10 },

  button: { textAlign: "center" },
  sumAndHisCon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "400",
    width: 97,
    textAlign: "center",
    marginBottom: 12,
  },
  saveButCon: {
    backgroundColor: "blue",
    marginTop: 100,
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
