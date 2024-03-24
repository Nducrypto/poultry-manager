import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import IconManager from "../../IconManager/IconManager";
import { expenseHistoryKeys, iconsArray } from "../expenseData";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../utils/stackParamList";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MiniCardComp from "../../Cards/MiniCardComp";
import {
  CostItem,
  costOnGrowerFeeds,
  costOnLayerFeeds,
} from "../../../utils/States/expenseState";

interface Props {
  itemCostPerMonth: CostItem;
  date: Date;
  setUtilityTitle: (value: string) => void;
}

const ExpenseHistory = ({ itemCostPerMonth, date, setUtilityTitle }: Props) => {
  const navigation = useNavigation<NavigationProps>() as any;
  const dateToString = String(date);
  const handleNavigation = (title: string) => {
    const lowerCase = title.toLowerCase();
    if (title === "Grower feed" || title === "Layer feed") {
      navigation.navigate("Feeding", {
        date: dateToString,
        title,
      });
    } else {
      navigation.navigate("UtilityBill", {
        itemType: lowerCase,
        date: dateToString,
      });
    }
    setUtilityTitle(title);
  };

  return (
    <View style={styles.container}>
      {expenseHistoryKeys.map((item, index) => {
        return (
          <TouchableWithoutFeedback
            key={item.title}
            onPress={() => handleNavigation(item.title)}
          >
            <View>
              <MiniCardComp>
                <View style={styles.item}>
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
                      ₦{""}
                      {Intl.NumberFormat().format(
                        item.title === "Grower feed"
                          ? costOnGrowerFeeds(itemCostPerMonth)
                          : item.title === "Layer feed"
                          ? costOnLayerFeeds(itemCostPerMonth)
                          : itemCostPerMonth[item.title.toLowerCase()] ?? 0
                      )}
                    </Text>

                    <IconManager
                      IconStyle={FontAwesome6}
                      name="greater-than"
                      size={15}
                      color="grey"
                    />
                  </View>
                </View>
              </MiniCardComp>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default ExpenseHistory;

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
    paddingHorizontal: 4,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
