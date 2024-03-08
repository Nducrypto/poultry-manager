import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { customerData } from "./customersData";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import MaxiCard from "../Cards/MaxiCard";

const initialState = {
  customerName: "",
  customerType: "",
  address: "",
};
const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentId, setCurrentId] = useState<number | null>(null);

  function filterByNameOrAddress() {
    const closeSpaces = (str: string) => str.toLowerCase().replace(/\s/g, "");
    const searched = closeSpaces(searchTerm);
    const filter = customerData.filter((item) => {
      const customerName = closeSpaces(item.customerName);
      const address = closeSpaces(item.address);
      return customerName.includes(searched) || address.includes(searched);
    });
    return filter;
  }
  const filteredCustomers = filterByNameOrAddress();

  function handleChange(item: string, value: string) {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }

  useEffect(() => {
    if (currentId) {
      const findItem: any = customerData.find((item) => item.id === currentId);
      if (findItem) {
        setFormData(findItem);
        setModalVisible(true);
      }
    }
  }, [currentId]);

  const display = searchTerm ? filteredCustomers : customerData;

  return (
    <View style={styles.container}>
      <View style={styles.inputCont}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <FlatList
        data={display}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.itemCon}>
            <MaxiCard
              itemId={index + 1}
              fontSize={16}
              title={item.customerName}
              color="white"
              deleteItem={() => {}}
              setCurrentId={setCurrentId}
              backgroundColor="white"
            >
              <View style={styles.item}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.customerName.charAt(0)}
                  </Text>
                </View>
                <View style={styles.nameAndTypeCon}>
                  <Text style={styles.address}>{item.address}</Text>
                  <Text style={styles.type}>{item.customerType}</Text>
                </View>
              </View>
            </MaxiCard>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 4 }}
      />
      <FloatinActionButton
        setForm={setFormData}
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
          value={formData.customerName}
          label="Customer Name"
          onChangeText={(value) => handleChange("customerName", value)}
          keyboardType="default"
          width={320}
        />
        <InputField
          value={formData.customerType}
          label="Customer Type"
          onChangeText={(value) => handleChange("customerType", value)}
          keyboardType="default"
          width={320}
        />

        <InputField
          value={formData.address}
          label="Address"
          onChangeText={(value) => handleChange("address", value)}
          keyboardType="default"
          width={320}
        />

        <TouchableOpacity
          style={styles.saveButCon}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.button}>{currentId ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 15,
  },
  inputCont: {
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  itemCon: { paddingHorizontal: 10, marginBottom: -15 },
  item: {
    flexDirection: "row",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
    top: -25,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  nameAndTypeCon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  type: {
    fontSize: 13,
    color: "gray",
  },
  address: {
    fontSize: 14,
    color: "gray",
  },

  saveButCon: {
    backgroundColor: "blue",
    marginTop: 100,
    width: 190,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  button: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

export default CustomerList;
