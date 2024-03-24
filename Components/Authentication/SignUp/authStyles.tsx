import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    top: 50,
  },
  image: {
    width: "100%",
    height: "27%",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#333",
    fontSize: 15,
    textAlign: "center",
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  formWrapper: {
    justifyContent: "center",
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
    backgroundColor: "#710193",
    paddingVertical: 13,
    paddingHorizontal: 100,
    marginTop: 30,
    borderRadius: 14,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomTextCon: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    alignSelf: "center",
  },
  forgotPassword: {
    alignSelf: "center",
    marginTop: 10,
  },
  bottomText: {
    fontSize: 14,
  },
  link: {
    color: "blue",
    fontSize: 14,
  },
});
