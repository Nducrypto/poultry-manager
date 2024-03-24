import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";

import { useAuthState } from "../../utils/States/authState";
import {
  addNewCustomer,
  getCustomersFromDatabase,
} from "../../controllers/customerController";
import {
  searchByNameOrAddress,
  useCustomerState,
} from "../../utils/States/customerState";
import { useToast } from "../../controllers/toastController";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../utils/stackParamList";
import MiniCardComp from "../Cards/MiniCardComp";
import IconManager from "../IconManager/IconManager";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { disableButtonIfFormDataEmpty } from "../../utils/utility";

const initialState = {
  name: "",
  type: "",
  address: "",
};
const CustomerList = () => {
  getCustomersFromDatabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { customersList } = useCustomerState();
  const { loggedInUser } = useAuthState();
  const { setToast } = useToast();
  const navigation = useNavigation<NavigationProps>() as any;
  const searchedCustomers = searchByNameOrAddress(customersList, searchTerm);
  function handleNavigation(name: any) {
    navigation.navigate("CustomerDetail", {
      name,
    });
  }
  function handleChange(item: string, value: string) {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }

  function handleCreateCustomer() {
    const data = { ...formData, userId: loggedInUser?.userId };
    addNewCustomer(data, setToast);
    setModalVisible(false);
  }

  const display = searchTerm ? searchedCustomers : customersList;

  const formDataIsEmpty = disableButtonIfFormDataEmpty(formData);

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
      <ScrollView
        style={{ flex: 1, marginTop: 10, marginBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {display.map((customer, index) => (
          <View key={index}>
            <MiniCardComp>
              <View style={styles.itemCon}>
                <TouchableWithoutFeedback
                  onPress={() => handleNavigation(customer.name)}
                  key={index}
                >
                  <View style={styles.itemCon}>
                    <View style={styles.item}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {customer.name.charAt(0)}
                        </Text>
                      </View>
                      <Text style={styles.name}>{customer.name}</Text>
                    </View>
                    <IconManager
                      IconStyle={FontAwesome6}
                      name="greater-than"
                      size={15}
                      color="grey"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </MiniCardComp>
          </View>
        ))}
      </ScrollView>

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
      >
        <InputField
          value={formData.name}
          label="Customer Name"
          type="text-field"
          onChangeText={(value) => handleChange("name", value)}
          keyboardType="default"
          width={320}
        />
        <InputField
          value={formData.type}
          label="Customer Type"
          type="text-field"
          onChangeText={(value) => handleChange("type", value)}
          keyboardType="default"
          width={320}
        />

        <InputField
          value={formData.address}
          label="Address"
          type="text-field"
          onChangeText={(value) => handleChange("address", value)}
          keyboardType="default"
          width={320}
        />

        <TouchableOpacity
          style={{
            ...styles.saveButCon,
            opacity: formDataIsEmpty ? 0.5 : 0.9,
          }}
          onPress={handleCreateCustomer}
          disabled={formDataIsEmpty}
        >
          <Text style={styles.button}>Submit</Text>
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  itemCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
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
