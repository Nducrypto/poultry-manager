import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut, auth } from "../../config/firebase";

import { NavigationProps } from "../../utils/stackParamList";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconManager from "../IconManager/IconManager";
import UniversalModal from "../UniversalModal/UniversalModal";

const BottomNavbar = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const routeData = [
    {
      title: "Home",
      icon: MaterialCommunityIcons,
      name: "home",
      size: 25,
      color: "grey",
    },
    {
      title: "Finance",
      icon: MaterialCommunityIcons,
      name: "finance",
      size: 25,
      color: "blue",
    },
    {
      title: "Settings",
      icon: Feather,
      name: "more-vertical",
      size: 25,
      color: "blue",
    },
  ];

  async function handleNavigation(screen: any) {
    if (screen === "Home") {
      return;
    }
    if (screen === "Settings") {
      setShowSettingsModal(true);
    } else if (screen === "Logout") {
      await signOut(auth);
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      setShowSettingsModal(false);
    } else if (screen === "Finance") {
      navigation.navigate(screen);
    }
  }

  return (
    <View style={styles.navbar}>
      <FlatList
        data={routeData}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => handleNavigation(item.title)}
                style={styles.itemCon}
              >
                <IconManager
                  IconStyle={item.icon}
                  name={item.name}
                  size={item.size}
                  color={item.color}
                />
                <Text style={styles.navbarText}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 100, paddingHorizontal: 25 }}
      />

      {showSettingsModal && <View style={styles.optionBackOverlay} />}
      <UniversalModal
        modalVisible={showSettingsModal}
        setModalVisible={setShowSettingsModal}
        height={30}
        width={100}
      >
        <TouchableOpacity
          onPress={() => handleNavigation("Logout")}
          style={styles.logoutButton}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </UniversalModal>
    </View>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 49,
  },
  itemCon: {
    alignItems: "center",
  },
  navbarText: {
    color: "black",
    fontSize: 11,
  },

  logoutButton: {
    top: 30,
    justifyContent: "center",
    backgroundColor: "#FF00FF",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  optionBackOverlay: {
    width: 1400,
    height: 1500,
    backgroundColor: "rgba(200, 200, 200,0.9)",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    top: -1000,
  },
});
