import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const DepartmentsScreen = () => {
  const { navigate } = useNavigation();
  const departments = [
    {
      id: 1,
      name: "OPD",
      icon: () => <Ionicons name="person" size={35} color={"orange"} />,
    },
    {
      id: 2,
      name: "Cardiology",
      icon: () => (
        <MaterialCommunityIcons name="heart-pulse" size={35} color="red" />
      ),
    },
    {
      id: 3,
      name: "Orthopedics",
      icon: () => <FontAwesome5 name="tooth" size={35} color={"white"} />,
    },
    {
      id: 4,
      name: "Pediatrics",
      icon: () => <Ionicons name="person" size={35} color={"purple"} />,
    },
    {
      id: 5,
      name: "Gynecology",
      icon: () => <Ionicons name="person" size={35} color={"cadetblue"} />,
    },
    {
      id: 6,
      name: "Dermatology",
      icon: () => <Ionicons name="person" size={35} color={"darksalmon"} />,
    },
    {
      id: 7,
      name: "Neurology",
      icon: () => (
        <MaterialCommunityIcons name="brain" size={35} color={"forestgreen"} />
      ),
    },
    {
      id: 8,
      name: "Ophthalmology",
      icon: () => <Ionicons name="person" size={35} color={"hotpink"} />,
    },
    {
      id: 9,
      name: "ENT",
      icon: () => <Ionicons name="nutrition" size={35} color={"green"} />,
    },
    {
      id: 10,
      name: "Urology",
      icon: () => <AntDesign name="eye" size={35} color={"lightsalmon"} />,
    },
    {
      id: 11,
      name: "Radiology",
      icon: () => <Feather name="radio" size={35} color={"deepskyblue"} />,
    },
  ];

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigate("Doctors");
        }}
      >
        {item?.icon && <item.icon />}
        <Text style={styles.itemtext}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Departments</Text>
      <FlatList
        data={departments}
        renderItem={ListItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  departmentName: {
    fontSize: 16,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    color: "black",
    width: "30%",
    margin: 6,
    height: 100,
    borderRadius: 10,
    // padding: 10,
  },
  itemtext: {
    color: "black",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infoText: {
    fontSize: 20,
  },
});

export default DepartmentsScreen;
