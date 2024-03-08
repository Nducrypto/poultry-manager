import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../utils/stackParamList";
import IconManager from "../../IconManager/IconManager";
import { routeText } from "./quickAccessData";

const QuickAccess = () => {
  const navigation = useNavigation<NavigationProps>();

  function handleNavigation(screen: any) {
    try {
      navigation.navigate(screen);
    } catch (error) {}
  }

  const numberOfColumns = 4;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quick Access</Text>
      <View style={styles.dataContainer}>
        <FlatList
          data={routeText}
          key={`FlatList-${numberOfColumns}`}
          numColumns={numberOfColumns}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemWrapper}>
                <TouchableOpacity onPress={() => handleNavigation(item.title)}>
                  <View style={styles.iconWrapper}>
                    <IconManager
                      IconStyle={item.IconStyle}
                      name={item.name}
                      size={item.size}
                      color="white"
                    />
                  </View>
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
    </View>
  );
};

export default QuickAccess;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  header: {
    fontSize: 18,
    marginLeft: 10,
  },
  dataContainer: {
    alignItems: "center",
  },

  itemWrapper: {
    width: 70,
    borderRadius: 10,
    marginTop: 29,
    marginLeft: 7,
    marginRight: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5fefd",
  },
  iconWrapper: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: "#710193",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 11,
    color: "black",
    marginTop: 10,
    textAlign: "center",
  },
});
