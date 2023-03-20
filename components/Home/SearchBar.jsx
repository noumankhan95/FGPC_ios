import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const SearchBar = (props) => {
  return (
    <View style={style.container}>
      <Ionicons name="search" color={"black"} />
      <TextInput style={style.textinput} placeholder={"Search"} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 0.06,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    width: "85%",
    alignSelf: "center",
    backgroundColor: "gray",
    opacity: 0.3,
    borderRadius: 10,
    marginTop: 10,
  },
  textinput: {
    opacity: 1,
    width: "90%",
    flex: 1,
    color: "black",
    opacity: 1,
    fontSize: 20,
    paddingLeft: 3,
  },
});
export default SearchBar;
