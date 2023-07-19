import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const DepartmentInfoScreen = ({ route, navigation }) => {
  const params = route.params;
  const [loading, setisloading] = useState(false);
  const [subdepts, setissubdepts] = useState(false);
  const [subdeptsdoctors, setissubdeptsdoctors] = useState(false);

  console.log(params);
  useEffect(() => {
    setisloading((p) => true);
    fetch(
      `https://psychedelic-wine-production.up.railway.app/patient_user/find_department_by_title?department_title=${params.dept_title}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((r) => {
        if (!r.ok || r.status === 401) throw "Error";
        return r.json();
      })
      .then((d) => {
        setissubdepts((p) => d.sub_departments);
        setissubdeptsdoctors((p) => d.doctors);
      })
      .catch((e) => console.log(e))
      .finally((f) => setisloading(false));
  }, []);
  const subdepartments = [
    // List of subdepartments for the selected department
    // You can fetch this data from an API or define it statically
    { id: 1, name: "Subdepartment 1" },
    { id: 2, name: "Subdepartment 2" },
    { id: 3, name: "Subdepartment 3" },
    // Add more subdepartments as needed
  ];
  console.log(params);
  const renderSubdepartmentItem = ({ item }) => (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingVertical: 20,
      }}
    >
      <View style={styles.subdepartmentItem}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="clinic-medical" size={44} color="red" />
          <Text>{item.title}</Text>
        </View>
        <View>
          <Text
            style={[
              styles.departmentName,
              { marginBottom: 0, fontWeight: "400" },
            ]}
          >
            Room Number {item.room_number}
          </Text>
          <Text
            style={[
              styles.departmentName,
              { marginBottom: 0, fontWeight: "400" },
            ]}
          >
            Incharge {item.inCharge_id.name}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.departmentName,
          { marginBottom: 0, fontWeight: "400", paddingVertical: 10 },
        ]}
      >
        OPDS AVAILABLE On
      </Text>
      {item._opd_days_list.map((i) => (
        <View
          style={{
            flexDirection: "row",
            width: "30%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          key={i}
        >
          <AntDesign name="checkcircle" size={14} color="green" />

          <Text>{i}</Text>
        </View>
      ))}
    </View>
  );

  const navigateToDoctorsScreen = () => {
    // Navigate to the Doctors screen
    navigation.navigate("Doctors", {
      doctorsAvailable: subdeptsdoctors,
      dept_title: params.dept_title,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={60} color={"green"} />
      ) : (
        <>
          <Text
            style={[
              styles.departmentName,
              { color: "red", textAlign: "center" },
            ]}
          >
            {params.dept_title}
          </Text>
          <Text style={[styles.departmentName, { textAlign: "center" }]}>
            SubDepartments
          </Text>

          <FlatList
            data={subdepts}
            renderItem={renderSubdepartmentItem}
            keyExtractor={(item) => item.sub_department_id.toString()}
          />
        </>
      )}
      <Button title="Go to Doctors" onPress={navigateToDoctorsScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  departmentName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subdepartmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,

    // backgroundColor: "red",
  },
});

export default DepartmentInfoScreen;
