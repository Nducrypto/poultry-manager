import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import {
  addMedication,
  deleteMedication,
  fetchTreatmentFromDatabase,
} from "../../controllers/treatmentController";
import { useToast } from "../../controllers/toastController";
import {
  TreatmentProps,
  useTreatmentState,
} from "../../utils/States/treatmentState";
import { useAuthState } from "../../utils/States/authState";
import DataLoader from "../DataLoader/DataLoader";
import { disableButtonIfFormDataEmpty } from "../../utils/utility";

interface FormProps {
  name: string;
  duration: string;
  lastDueDate: Date;
  nextDueDate: Date;
  durationText: string;
}

const initialState = {
  id: "",
  name: "",
  duration: "",
  durationText: "Everyday",
  lastDueDate: new Date(),
  nextDueDate: new Date(),
};
const Treatment = () => {
  fetchTreatmentFromDatabase();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>("");
  const [formData, setFormData] = useState<FormProps>(initialState);
  const [showOption, setShowOption] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState({});
  const [diffInDays, setDiffInDays] = useState(0);
  const durationsText = ["Everyday", "3 Months", "Customize"];
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const { treatmentList, loadingTreatment } = useTreatmentState();
  const { setToast } = useToast();
  const { loggedInUser } = useAuthState();

  function handleDurationTextSelect(option: string) {
    if (option === "Customize") {
      setShowOption(false);
      handleChange(option, "durationText");
      setStartDate("");
      setEndDate("");
    } else {
      handleChange(option, "durationText");
      setShowOption(false);
      handleResetDate();
    }
  }

  function toggleDropdown() {
    setShowOption(true);
  }

  function handleDayPress(day: any) {
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
  }
  function handleResetDate() {
    setStartDate("");
    setEndDate("");
    setMarkedDates({});
  }
  useEffect(() => {
    if (currentId) {
      const foundItem: any = treatmentList.find(
        (item) => item.id === currentId
      );
      if (foundItem) {
        setFormData(foundItem);
        setModalVisible(true);
      }
    }
  }, [currentId]);

  useEffect(() => {
    if (endDate.length) {
      const duration = moment
        .duration(moment(endDate).diff(moment(startDate)))
        .asDays();

      const isSameMonth = duration < 30;
      if (isSameMonth) {
        setDiffInDays(duration);
        handleChange(`${duration} days`, "durationText");
      } else {
        const months = Math.floor(duration / 30);
        handleChange(`${months} Months`, "durationText");
      }
    }
  }, [endDate]);

  function handleSubmit() {
    let data: TreatmentProps = {
      ...formData,
      timeStamp: new Date().getTime(),
      userId: loggedInUser?.userId || "",
    };
    if (endDate) {
      const sameMonth = diffInDays > 0 && diffInDays < 30;
      if (sameMonth) {
        const lastDate = new Date(startDate);
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + diffInDays);
        data = {
          ...data,
          lastDueDate: lastDate.getTime(),
          nextDueDate: nextDate.getTime(),
        };
      } else {
        data = {
          ...data,
          lastDueDate: new Date(startDate).getTime(),
          nextDueDate: new Date(endDate).getTime(),
        };
      }
    } else if (formData.durationText === "3 Months") {
      const lastDate = new Date();
      const nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 3);
      data = {
        ...data,
        lastDueDate: lastDate.getTime(),
        nextDueDate: nextDate.getTime(),
      };
    } else {
      data = {
        ...data,
        lastDueDate: null,
        nextDueDate: null,
      };
    }
    addMedication(data, setToast);
    setModalVisible(false);
    handleResetDate();
  }
  function handleDeleteMedication(itemId: string) {
    deleteMedication(itemId, setToast);
  }

  function handleChange(value: any, title: string) {
    setFormData({ ...formData, [title]: value });
  }
  const length = treatmentList.length;
  const isEmpty = length < 1;
  const formDataIsEmpty = disableButtonIfFormDataEmpty({
    duration: formData.duration,
    name: formData.name,
    durationText: formData.durationText,
  });

  return (
    <View style={styles.container}>
      <View>
        <DataLoader
          isLoading={loadingTreatment}
          isArrayEmpty={isEmpty}
          color="grey"
          size={50}
          message="No treatment available"
        >
          <FlatList
            data={treatmentList}
            renderItem={({ item, index }) => {
              const lastDueDate = new Date(item.lastDueDate);
              const nextDueDate = new Date(item.nextDueDate);
              let todayDate = new Date();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              return (
                <View
                  style={{ marginBottom: index === length - 1 ? 50 : 0 }}
                  key={index}
                >
                  <MaxiCard
                    itemId={item.id}
                    title={item.name}
                    color="black"
                    deleteItem={handleDeleteMedication}
                    setCurrentId={setCurrentId}
                    backgroundColor="white"
                    showSmallCard={showSmallCard}
                    setShowSmallCard={setShowSmallCard}
                    marginTop={10}
                    fontSize={16}
                  >
                    <View style={styles.infoContainer}>
                      <View style={styles.infoItem}>
                        <Text style={styles.title}>Duration</Text>
                        <Text style={styles.infoText}>
                          {item.duration <= "1"
                            ? "Once"
                            : `${item.duration} times`}{" "}
                          {item.durationText !== "Everyday" && "in"}{" "}
                          {item.durationText}
                        </Text>
                      </View>

                      <View>
                        <View style={styles.infoItem}>
                          <Text style={styles.title}>Last Due Date</Text>
                          <Text style={styles.infoText}>
                            {moment(
                              item.durationText === "Everyday"
                                ? todayDate.toString()
                                : String(lastDueDate)
                            ).format("D MMMM y")}
                          </Text>
                        </View>
                        <View style={styles.infoItem}>
                          <Text style={styles.title}>Next Due Date</Text>
                          <Text style={styles.infoText}>
                            {moment(
                              item.durationText === "Everyday"
                                ? tomorrow.toString()
                                : String(nextDueDate)
                            ).format("D MMM y")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </MaxiCard>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
          />
        </DataLoader>

        <UniversalModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          clearId={setCurrentId}
          height={100}
          width={100}
        >
          <InputField
            value={formData.name}
            label="Name"
            type="text-field"
            onChangeText={(text) => handleChange(text, "name")}
            keyboardType="default"
            width={320}
          />

          <View style={styles.durationCon}>
            <InputField
              value={formData.duration}
              label="Duration"
              type="text-field"
              onChangeText={(text) => handleChange(text, "duration")}
              keyboardType="numeric"
              width={150}
            />
            <View>
              <Text style={styles.label}>Date Range</Text>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.optionAndIconCont}
              >
                <Text>{formData.durationText}</Text>
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
                          disabled={formData.durationText === text}
                          onPress={() => handleDurationTextSelect(text)}
                        >
                          <Text
                            style={{
                              ...styles.dropdownOption,
                              fontWeight:
                                formData.durationText === text ? "200" : "400",
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
          </View>
          {formData.durationText === "Customize" && (
            <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>
          )}

          <TouchableOpacity
            style={{
              ...styles.submitBut,
              opacity: formDataIsEmpty ? 0.5 : 0.9,
            }}
            onPress={handleSubmit}
            disabled={formDataIsEmpty}
          >
            <Text style={styles.butText}>Submit</Text>
          </TouchableOpacity>
        </UniversalModal>
      </View>
      <FloatinActionButton
        setForm={setFormData}
        initialState={initialState}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="black"
      />
    </View>
  );
};

export default Treatment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  infoContainer: {
    marginTop: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "300",
    marginRight: 5,
    color: "#333",
  },
  infoText: {
    fontSize: 15,
    color: "#555",
    fontWeight: "bold",
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
  label: {
    left: 10,
    fontWeight: "300",
  },
  optionAndIconCont: {
    borderWidth: 0.5,
    borderColor: "grey",
    width: 140,
    height: 45,
    paddingLeft: 10,
    borderRadius: 10,

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
