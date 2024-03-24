import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FloatinActionButton from "../Buttons/FloatinActionButton";
import MaxiCard from "../Cards/MaxiCard";
import { useCustomerState } from "../../utils/States/customerState";
import { useNavigation, useRoute } from "@react-navigation/native";
import { sumTotalAmount, useSalesState } from "../../utils/States/salesState";
import DataLoader from "../DataLoader/DataLoader";
import { styles } from "../Sales/salesStyle";
import { SalesProps } from "../../utils/States/salesState";
import { deleteSales } from "../../controllers/salesController";
import { useToast } from "../../controllers/toastController";
import UniversalModal from "../UniversalModal/UniversalModal";
import InputField from "../InputField/InputField";
import {
  deleteCustomer,
  updateCustomer,
} from "../../controllers/customerController";
import { NavigationProps } from "../../utils/stackParamList";
import { disableButtonIfFormDataEmpty } from "../../utils/utility";
const initialState = {
  name: "",
  type: "",
  address: "",
};
const CustomerDetail = () => {
  const [formData, setFormData] = useState<any>(initialState);
  const [showSmallCard, setShowSmallCard] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { params } = useRoute() as any;
  const customerName = params?.name;
  const navigation = useNavigation<NavigationProps>() as any;
  const { setToast } = useToast();
  const { customersList } = useCustomerState();
  const { groupedByName, loadingSales } = useSalesState("");
  const customer = customersList.find(
    (customer) => customer.name === customerName
  );
  const id: any = customer?.id;

  const customerTransactions = groupedByName[customerName] || [];

  const isEmpty = customerTransactions.length < 1;

  function handleDeleteSales(id: any) {
    deleteSales(id, setToast);
  }

  useEffect(() => {
    if (customerName) {
      setFormData({
        name: customer?.name,
        address: customer?.address,
        type: customer?.type,
      });
    }
  }, [customerName]);

  function handleChange(item: string, value: string) {
    setFormData((prev: any) => ({ ...prev, [item]: value }));
  }

  function handleUpdateCustomer() {
    const data = {
      ...formData,
      userId: customer?.userId,
      id,
    };
    updateCustomer(id, data, setToast);
    setModalVisible(false);
  }

  function handleRemoveCustomer() {
    deleteCustomer(id, setToast, navigation);
  }

  const formDataIsEmpty = disableButtonIfFormDataEmpty(formData);
  return (
    <View style={cusStyles.container}>
      <ScrollView
        style={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={cusStyles.custInfoCon}>
          <MaxiCard
            itemId={id}
            fontSize={16}
            title={customerName}
            color="white"
            deleteItem={handleRemoveCustomer}
            backgroundColor="blue"
            showSmallCard={showSmallCard}
            setShowSmallCard={setShowSmallCard}
          >
            <View style={cusStyles.shared}>
              <Text style={cusStyles.label}>Address</Text>
              <Text style={cusStyles.text}>{customer?.address}</Text>
            </View>
            <View style={cusStyles.shared}>
              <Text style={cusStyles.label}>Type</Text>
              <Text style={cusStyles.text}>{customer?.type}</Text>
            </View>
          </MaxiCard>
        </View>

        <Text style={cusStyles.transHistory}>Transaction history</Text>
        <View style={styles.itemCon}>
          <DataLoader
            isLoading={loadingSales}
            isArrayEmpty={isEmpty}
            color="grey"
            size={50}
            message="No purchase made"
          >
            {customerTransactions.map((sales: any, index: number) => {
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
                    backgroundColor="white"
                    showSmallCard={showSmallCard}
                    setShowSmallCard={setShowSmallCard}
                    marginTop={20}
                  >
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
      </ScrollView>
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
          keyboardType="default"
          width={320}
          editable={false}
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
            marginTop: 50,
            opacity: formDataIsEmpty ? 0.4 : 0.9,
          }}
          onPress={handleUpdateCustomer}
          disabled={formDataIsEmpty}
        >
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </UniversalModal>
      <FloatinActionButton
        setForm={setFormData}
        initialState={formData}
        setModalVisible={setModalVisible}
        color="white"
        backgroundColor="blue"
      />
    </View>
  );
};

export default CustomerDetail;

const cusStyles = StyleSheet.create({
  container: { flex: 1 },
  custInfoCon: {
    paddingHorizontal: 10,
  },
  shared: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "300",
    color: "white",
  },
  transHistory: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    left: 10,
  },
});
