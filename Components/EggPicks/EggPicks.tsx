import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import DatePickerComp from "../DatePickerComp/DatePickerComp";
import { useState } from "react";
import { getMonthAndYear } from "../../utils/utility";
import { useFetchEggPick } from "../../controllers/eggPickController";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import EggPicksHistory from "./EggPicksHistory";
import EggPicksSummary from "./EggPicksSummary";
import FloatinActionButton from "../Buttons/FloatinActionButton";

const initialState = {
  numOfEggs: "",
  brokenEggs: "",
};
const EggPicks = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setselected] = useState("Summary");
  const [formData, setFormData] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const currentMonthyear = getMonthAndYear(date);
  const { eggPicksArray, totalPickedEggs, setEggPicksArray, totalBrokenEggs } =
    useFetchEggPick(currentMonthyear);
  const [, year] = currentMonthyear.split("-");
  const formatMonth = currentMonthyear.slice(0, 3);
  const formatedDate = `${formatMonth}-${year}`;

  useEffect(() => {
    if (currentId) {
      const foundItem: any = eggPicksArray.find(
        (item) => item.id === currentId
      );
      if (foundItem) {
        setFormData(foundItem);
        setModalVisible(true);
      }
    }
  }, [currentId]);

  const deletePickedEgg = (itemId: number) => {
    setEggPicksArray((prev) => prev.filter((item) => item.id !== itemId));
  };
  function handleSelectTitle(title: string) {
    setselected(title);
  }

  function isSelected(title: string) {
    return selected === title;
  }

  interface Props {
    [key: string]: React.ReactNode;
  }
  const displayItem: Props = {
    Summary: (
      <EggPicksSummary
        totalPickedEggs={totalPickedEggs}
        totalBrokenEggs={totalBrokenEggs}
      />
    ),
    History: (
      <EggPicksHistory
        eggPicksArray={eggPicksArray}
        deletePickedEgg={deletePickedEgg}
        setCurrentId={setCurrentId}
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
        setCurrentId={setCurrentId}
      >
        <InputField
          value={formData.numOfEggs}
          label="Number of eggs"
          onChangeText={(value) =>
            setFormData({ ...formData, numOfEggs: value })
          }
          keyboardType="numeric"
          width={320}
        />
        <InputField
          value={formData.brokenEggs}
          label="Broken eggs"
          onChangeText={(value) =>
            setFormData({ ...formData, brokenEggs: value })
          }
          keyboardType="numeric"
          width={320}
        />

        <TouchableOpacity
          style={styles.saveButCon}
          onPress={() => setModalVisible(false)}
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
