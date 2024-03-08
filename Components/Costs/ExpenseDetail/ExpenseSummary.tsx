import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import IconManager from "../../IconManager/IconManager";
import { CostItem, costTableHead, iconsArray } from "../expenseData";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../utils/stackParamList";
import {
  costOnFeeds,
  rentPerMonth,
} from "../../../controllers/expenseController";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MiniCardComp from "../../Cards/MiniCardComp";

interface Props {
  itemCostPerMonth: CostItem;
  monthYear: string;
  setUtilityTitle: (value: string) => void;
}

const CostDetailsSummary = ({
  itemCostPerMonth,
  monthYear,
  setUtilityTitle,
}: Props) => {
  const navigation = useNavigation<NavigationProps>() as any;

  const handleNavigation = (title: string) => {
    const lowerCase = title.toLowerCase();
    if (title === "Feeding") {
      navigation.navigate(title, {
        monthYear,
      });
    } else {
      setUtilityTitle(title);
      navigation.navigate("UtilityBill", {
        lowerCase,
        monthYear,
      });
    }
  };

  return (
    <View style={styles.container}>
      {costTableHead.map((item, index) => {
        return (
          <View key={item.title}>
            <MiniCardComp>
              <View style={styles.itemAndIconCon}>
                <IconManager
                  IconStyle={iconsArray[index].icon}
                  name={iconsArray[index].name}
                  size={iconsArray[index].size}
                  color="red"
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.costAndIconCon}>
                <Text style={styles.value}>
                  &#8358;{""}
                  {Intl.NumberFormat().format(
                    item.title === "Feeding"
                      ? costOnFeeds(itemCostPerMonth)
                      : item.title === "Rent"
                      ? rentPerMonth
                      : itemCostPerMonth[item.title.toLowerCase()] ?? 0
                  )}
                </Text>
                {item.title !== "Rent" && (
                  <TouchableOpacity
                    onPress={() => handleNavigation(item.title)}
                  >
                    <IconManager
                      IconStyle={FontAwesome6}
                      name="greater-than"
                      size={15}
                      color="grey"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </MiniCardComp>
          </View>
        );
      })}
    </View>
  );
};

export default CostDetailsSummary;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: 45,
  },
  itemAndIconCon: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    color: "#CD853F",
    fontWeight: "600",
  },
  costAndIconCon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
