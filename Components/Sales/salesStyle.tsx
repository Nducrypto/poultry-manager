import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  totalValueCon: {
    backgroundColor: "#051094",
    borderRadius: 7,
    paddingBottom: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  headerAndDateCon: { flexDirection: "row", justifyContent: "space-between" },

  totalHeader: {
    fontSize: 15,
    color: "white",
  },
  valueCon: {
    marginTop: 20,
    marginBottom: 15,
  },
  totalValue: {
    fontSize: 23,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  openModalButCon: {
    backgroundColor: "#FC46AA",
    width: 130,
    alignSelf: "center",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  button: { textAlign: "center", color: "white" },
  itemCon: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  sharedData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerType: {
    fontSize: 13,
    fontWeight: "300",
  },
  itemValue: {
    fontSize: 16,
    color: "#051094",
    fontWeight: "700",
  },
  sharedText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#051094",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#FC46AA",
  },
  fetchedCustCon: {
    height: 100,
    position: "absolute",
    top: 80,
    backgroundColor: "white",
    zIndex: 10,
    width: "98%",
    borderWidth: 3,
    borderColor: "grey",
  },
  fetchedCustName: {
    marginTop: 10,
    left: 10,
    fontSize: 16,
  },
  customerTypeDropTitle: {
    fontWeight: "300",
    marginBottom: 5,
    marginTop: 10,
  },
  pickerCon: {
    borderWidth: 0.5,
    borderColor: "grey",
    width: "98%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 8,
  },
  crateInfo: {
    fontSize: 17,
    fontWeight: "bold",
  },
  saveButCon: {
    marginTop: 10,
    width: 190,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "blue",
  },
});
