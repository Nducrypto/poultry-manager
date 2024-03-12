import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  formWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    borderColor: "grey",
    height: 50,
    borderRadius: 14,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF10F0",
    paddingLeft: 60,
    paddingBottom: 10,
    paddingRight: 60,
    paddingTop: 10,
    marginTop: 20,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomTextCon: {
    flexDirection: "row",
    marginTop: 10,
  },
  bottomText: {
    fontSize: 16,
  },
  link: {
    color: "blue",
    fontSize: 16,
  },
});
