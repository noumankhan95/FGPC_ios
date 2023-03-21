import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
const ListItem = (props) => {
  return (
    <View style={Style.itemContainer}>
      {props.icon && <props.icon />}
      <Text style={Style.itemtext}>{props.name}</Text>
    </View>
  );
};
const dummyData = [
  {
    id: 1,
    name: "general",
    icon: () => <Ionicons name="person" size={20} color={"deepskyblue"} />,
  },
  {
    name: "dentist",
    id: 2,
    icon: () => <Ionicons name="person" size={20} color={"deepskyblue"} />,
  },
  {
    name: "Opthamologist",
    id: 3,
    icon: () => <FontAwesome5 name="tooth" size={20} color={"deepskyblue"} />,
  },
  {
    name: "Nutritionist",
    id: 4,
    icon: () => <AntDesign name="eye" size={20} color={"deepskyblue"} />,
  },
  {
    name: "general",
    id: 5,
    icon: () => <Ionicons name="nutrition" size={20} color={"deepskyblue"} />,
  },
  {
    name: "dentist",
    id: 6,
    icon: () => (
      <MaterialCommunityIcons name="brain" size={20} color={"deepskyblue"} />
    ),
  },
  {
    name: "Opthamologist",
    id: 7,
    icon: () => <Feather name="radio" size={20} color={"deepskyblue"} />,
  },
  {
    name: "Nutritionist",
    id: 8,
    icon: () => <Ionicons name="add" size={20} color={"deepskyblue"} />,
  },
];
const OptionsList = (props) => {
  return (
    <View style={Style.container}>
      <View style={Style.textContainer}>
        <Text style={Style.infoText}>Doctor Specialty</Text>
        <Text style={Style.infoText}>See All</Text>
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ListItem {...item} />}
        numColumns={4}
      />
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    flex: 0.4,

    marginTop: 10,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    color: "black",
    width: "20%",
    margin: 10,
    height: 80,
    borderRadius: 40,
    padding: 10,
  },
  itemtext: {
    color: "gray",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infoText: {
    fontSize: 20,
  },
});
export default OptionsList;
