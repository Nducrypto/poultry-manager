import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { medicationData, MedicationData } from "./medicationData";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import FloatinActionButton from "../Buttons/FloatinActionButton";

interface FormProps {
  name: string;
  duration: string;
  lastDueDate: Date;
  nextDueDate: Date;
  durationText: string;
}

const initialState = {
  id: 0,
  name: "",
  duration: "",
  durationText: "",
  lastDueDate: new Date(),
  nextDueDate: new Date(),
};
const Medication = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [medDataState, setMedDataState] = useState(medicationData);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormProps>(initialState);
  const [showOption, setShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Everyday");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState({});
  const [diffInDays, setDiffInDays] = useState(0);
  const [array, setArray] = useState<MedicationData[]>([]);
  const durationsText = ["Everyday", "3 Months", "Customize"];

  const handleDeleteMedication = (itemId: number) => {
    setArray((prev) => prev.filter(({ id }) => id !== itemId));
  };

  const handleDurationTextSelect = (option: string) => {
    if (option === "Customize") {
      setShowOption(false);
      setSelectedOption(option);
      setStartDate("");
      setEndDate("");
    } else {
      setSelectedOption(option);
      setShowOption(false);
      handleResetDate();
    }
  };

  const toggleDropdown = () => {
    setShowOption(true);
  };

  const handleDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate("");
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: "#66a3ff" },
      });
    } else if (startDate && !endDate && day.dateString > startDate) {
      setEndDate(day.dateString);
      setMarkedDates({
        ...markedDates,
        [day.dateString]: { endingDay: true, color: "orange" },
      });
    } else {
      handleResetDate();
    }
  };
  function handleResetDate() {
    setStartDate("");
    setEndDate("");
    setMarkedDates({});
  }
  useEffect(() => {
    if (currentId) {
      const findItem: any = medDataState.find((item) => item.id === currentId);
      if (findItem) {
        setFormData(findItem);
        setModalVisible(true);
      }
    }
  }, [currentId]);

  useEffect(() => {
    if (endDate.length) {
      const endDateMonth = new Date(endDate).getMonth() + 1;
      const startDateMonth = new Date(startDate).getMonth() + 1;
      const diff = endDateMonth - startDateMonth;
      const isSameMonth = diff < 1;
      if (isSameMonth) {
        const endDateDay = new Date(endDate).getDate();
        const startDateDay = new Date(startDate).getDate();
        const differenceInDays = endDateDay - startDateDay;
        setDiffInDays(differenceInDays);
        setSelectedOption(`${differenceInDays} days`);
      } else {
        setSelectedOption(`${diff} Months`);
      }
    }
  }, [endDate]);

  const handleSubmit = () => {
    let newMedArray: MedicationData[] = [];
    if (endDate) {
      if (diffInDays > 0) {
        const lastDueDate = new Date(startDate);
        const nextDueDate = new Date(lastDueDate);
        nextDueDate.setDate(lastDueDate.getDate() + diffInDays);
        newMedArray = [
          ...array,
          {
            ...formData,
            id: Math.random() * 100,
            durationText: selectedOption,
            lastDueDate,
            nextDueDate,
          },
        ];
      } else {
        newMedArray = [
          ...array,
          {
            ...formData,
            id: Math.random() * 100,
            durationText: selectedOption,
            lastDueDate: new Date(startDate),
            nextDueDate: new Date(endDate),
          },
        ];
      }
    } else if (selectedOption === "3 Months") {
      const lastDueDate = new Date();
      const nextDueDate = new Date(lastDueDate);
      nextDueDate.setMonth(nextDueDate.getMonth() + 3);
      newMedArray = [
        ...array,
        {
          ...formData,
          id: Math.random() * 100,
          durationText: selectedOption,
          lastDueDate,
          nextDueDate,
        },
      ];
    } else {
      newMedArray = [
        ...array,
        {
          ...formData,
          id: Math.random() * 100,
          durationText: selectedOption,
          lastDueDate: null,
          nextDueDate: null,
        },
      ];
    }
    setArray(newMedArray);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageDescription}>
        Explore detailed information about medications for optimal care and
        health management of your birds.
      </Text>
      <View style={styles.dataCon}>
        <FlatList
          // data={array}
          data={medDataState}
          renderItem={({ item }) => {
            let nextDueDate = new Date();
            nextDueDate.setDate(nextDueDate.getDate() + 1);
            return (
              <MaxiCard
                itemId={item.id}
                title={item.name}
                color="grey"
                deleteItem={handleDeleteMedication}
                setCurrentId={setCurrentId}
                backgroundColor="white"
              >
                <View style={styles.infoContainer}>
                  <View style={styles.infoItem}>
                    <Text style={styles.title}>Duration:</Text>
                    <Text style={styles.infoText}>
                      {item.duration <= "1" ? "Once" : item.duration}{" "}
                      {item.durationText !== "Everyday" && "in"}{" "}
                      {/* {item.durationText} */}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.title}>Last Due Date:</Text>
                    <Text style={styles.infoText}>
                      {moment(
                        item.durationText === "Everyday"
                          ? new Date().toString()
                          : item.lastDueDate.toString()
                      ).format("D MMMM y")}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.title}>Next Due Date:</Text>
                    <Text style={styles.infoText}>
                      {moment(
                        item.durationText === "Everyday"
                          ? nextDueDate.toString()
                          : item.nextDueDate.toString()
                      ).format("D MMM y")}
                    </Text>
                  </View>
                </View>
              </MaxiCard>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15, paddingHorizontal: 8 }}
        />
      </View>
      <FloatinActionButton
        setForm={setFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="grey"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UniversalModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCurrentId={setCurrentId}
          height={100}
          width={100}
        >
          <InputField
            value={formData.name}
            label="Name"
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            keyboardType="default"
            width={320}
          />

          <View style={styles.durationCon}>
            <InputField
              value={formData.duration}
              label="Duration"
              onChangeText={(text) =>
                setFormData({ ...formData, duration: text })
              }
              keyboardType="numeric"
              width={150}
            />
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.optionAndIconCont}
            >
              <Text>{selectedOption}</Text>
              <FontAwesome name="caret-down" size={24} color="gray" />

              <UniversalModal
                modalVisible={showOption}
                setModalVisible={setShowOption}
                height={30}
                width={100}
              >
                <TouchableOpacity
                  onPress={() => setShowOption(false)}
                  style={styles.optionBackOverlay}
                />
                <View style={styles.durationTextCon}>
                  {durationsText.map((text: string, index: number) => (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.optionCon}
                        disabled={selectedOption === text}
                        onPress={() => handleDurationTextSelect(text)}
                      >
                        <Text
                          style={{
                            ...styles.dropdownOption,
                            fontWeight: selectedOption === text ? "200" : "400",
                          }}
                        >
                          {text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </UniversalModal>
            </TouchableOpacity>
          </View>
          {selectedOption === "Customize" && (
            <View>
              <Calendar
                markingType="period"
                markedDates={markedDates}
                onDayPress={handleDayPress}
                minDate={String(new Date())}
              />
              <View style={styles.selectedDatesContainer}>
                <View>
                  <Text>Start Date: {startDate}</Text>
                  <Text>End Date: {endDate}</Text>
                </View>
                <TouchableOpacity onPress={handleResetDate}>
                  <FontAwesome name="undo" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.submitBut} onPress={handleSubmit}>
            <Text style={styles.butText}>Submit</Text>
          </TouchableOpacity>
        </UniversalModal>
      </ScrollView>
    </View>
  );
};

export default Medication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  pageDescription: {
    fontSize: 16,
    color: "#666",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataCon: {
    width: "100%",
  },

  infoContainer: {
    marginTop: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },

  durationCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: 320,
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

  durationLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  optionAndIconCont: {
    borderWidth: 1,
    borderColor: "grey",
    width: 140,
    height: 45,
    paddingLeft: 10,
    borderRadius: 10,
    top: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  optionBackOverlay: {
    width: 1400,
    height: 10000,
    backgroundColor: "rgba(211, 211, 211,0.8)",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    top: -1000,
  },
  durationTextCon: {
    zIndex: 1,
    backgroundColor: "white",
    top: -24,
  },
  optionCon: {
    width: 350,
  },

  dropdownOption: {
    paddingVertical: 10,
    fontSize: 16,
    left: 15,
  },
  selectedDatesContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
