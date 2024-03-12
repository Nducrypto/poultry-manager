import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";

interface Props {
  children: React.ReactNode;
  date?: Date;
  deleteItem: (value: number) => void;
  itemId: number;
  setCurrentId: (value: number) => void;
  color: string;
  title?: string;
  backgroundColor?: string;
  fontSize?: number;
}

const MaxiCard = ({
  date,
  children,
  deleteItem,
  itemId,
  setCurrentId,
  color,
  title,
  backgroundColor,
  fontSize,
}: Props) => {
  const [showSmallCard, setShowSmallCard] = useState(false);

  return (
    <View>
      <View style={{ ...styles.card, backgroundColor }}>
        <View style={styles.dateAndIconCon}>
          {date && (
            <Text style={{ ...styles.itemDate, color }}>
              {moment(String(date)).format("Do MMM y")}
            </Text>
          )}
          {title && (
            <Text
              style={{ ...styles.title, fontSize: fontSize ? fontSize : 20 }}
            >
              {title}
            </Text>
          )}
          <TouchableOpacity onPress={() => setShowSmallCard(!showSmallCard)}>
            <Feather name="more-vertical" size={19} color={color} />
          </TouchableOpacity>
        </View>

        <View>
          <View>{children}</View>
        </View>
      </View>
      {showSmallCard && (
        <View style={styles.smallCard}>
          <TouchableOpacity
            onPress={() => {
              setCurrentId(itemId);
              setShowSmallCard(false);
            }}
          >
            <AntDesign name="edit" size={16} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() => {
              deleteItem(itemId);
              setShowSmallCard(false);
            }}
          >
            <AntDesign name="delete" size={16} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MaxiCard;

const styles = StyleSheet.create({
  card: {
    gap: 1,
    marginBottom: 4,
    paddingHorizontal: 10,
    marginTop: 20,
    elevation: 2,
    paddingVertical: 10,
  },
  dateAndIconCon: { flexDirection: "row", justifyContent: "space-between" },
  itemDate: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  smallCard: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    top: 15,
    left: 250,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 50,
  },
});
