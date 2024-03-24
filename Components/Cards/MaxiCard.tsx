import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";

interface Props {
  children: React.ReactNode;
  date?: Date;
  deleteItem: any;
  itemId: any;
  setCurrentId?: (value: any) => void;
  color: string;
  title?: string;
  backgroundColor?: string;
  fontSize?: number;
  showSmallCard?: number | null;
  setShowSmallCard?: any;
  marginTop?: number;
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
  showSmallCard,
  setShowSmallCard,
  marginTop,
}: Props) => {
  function handleCloseSmallCard() {
    setShowSmallCard && setShowSmallCard(null);
  }

  function openSmallCard() {
    setShowSmallCard &&
      setShowSmallCard((prev: any) =>
        prev !== null && prev === itemId ? null : itemId
      );
  }
  const isSelectedItemId = showSmallCard === itemId;
  return (
    <View>
      <View
        style={{
          ...styles.card,
          backgroundColor: isSelectedItemId ? "lightgrey" : backgroundColor,
          marginTop: marginTop ? marginTop : 0,
        }}
      >
        <TouchableWithoutFeedback onPress={handleCloseSmallCard}>
          <View style={styles.dateAndIconCon}>
            {date && (
              <Text style={{ ...styles.itemDate, color }}>
                {moment(String(date)).format("ddd MMM Do")}
              </Text>
            )}
            {title && (
              <Text
                style={{
                  ...styles.title,
                  color,
                  fontSize: fontSize ? fontSize : 20,
                }}
              >
                {title}
              </Text>
            )}

            <TouchableOpacity onPress={openSmallCard}>
              <Feather name="more-vertical" size={19} color={color} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleCloseSmallCard}>
          <View>{children}</View>
        </TouchableWithoutFeedback>
      </View>

      {isSelectedItemId && (
        <View style={styles.smallCard}>
          {setCurrentId && (
            <TouchableOpacity
              style={styles.iconCon}
              onPress={() => {
                setCurrentId(itemId);
                handleCloseSmallCard();
              }}
            >
              <AntDesign name="edit" size={17} color="black" />
              <Text style={{ ...styles.label, color: "black" }}>Edit </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ ...styles.iconCon }}
            onPress={() => {
              deleteItem(itemId);
              handleCloseSmallCard();
            }}
          >
            <AntDesign name="delete" size={17} color="red" />
            <Text style={styles.label}>Delete</Text>
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
    // marginTop: 20,
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
    borderColor: "grey",
    top: 25,
    left: 110,
    zIndex: 10,
    justifyContent: "center",
    gap: 28,
    paddingLeft: 10,
    height: 100,
    width: 210,
  },
  iconCon: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  label: {
    color: "red",
    fontSize: 17,
  },
});
