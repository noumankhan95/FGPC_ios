import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { authCtx } from "../../store/auth";
import { Entypo } from "@expo/vector-icons";
const PatientVisits = () => {
  //   // Sample data for lab reports
  const uctx = useContext(authCtx);
  const labReports = [
    {
      visit_id: 2,
      token: 2,
      department: "Nurorolgy",
      sub_department: "Unit-I",
      doctor: "Dr.Ali",
      date: "2023-07-14T17:17:38.000+05:00",
    },
    {
      visit_id: 1,
      token: 1,
      department: "Nurorolgy",
      sub_department: "Unit-I",
      doctor: "Dr.Ali",
      date: "2023-07-14T16:49:27.000+05:00",
    },
  ];
  const [vists, setvisits] = useState([]);

  useEffect(() => {
    fetch(
      `https://psychedelic-wine-production.up.railway.app/patient_user/get_patient_visits`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${uctx.userInfo?.token}`,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => setvisits((p) => data))
      .catch((e) => console.log(e));
  }, []);

  // Render item component for each lab report
  const renderLabReport = ({ item }) => (
    <View style={styles.reportItem}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.testName}>Department: {item.department}</Text>
          <Text style={styles.testName}>
            SubDepartment: {item.sub_department}
          </Text>
        </View>

        <Text style={styles.testName}>Doctor:{item.doctor}</Text>
        <Text style={styles.result}>Token Number: {item.token}</Text>
        <Text style={styles.date}>
          Date: {new Date(item.date).toDateString()}
        </Text>
      </View>
      {/* <Button title="Download Report" /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {labReports.length === 0 ? (
        <>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            You Dont Have Any Visits Yet
          </Text>
          <Entypo
            name="emoji-happy"
            size={54}
            color="orange"
            style={{ alignSelf: "center", marginTop: 30 }}
          />
        </>
      ) : (
        <FlatList
          data={labReports}
          renderItem={renderLabReport}
          keyExtractor={(item) => item.visit_id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 5,
    // borderWidth: 0.5,
    // borderColor: "grey",
    marginVertical: 10,
  },
  reportItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  testName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  result: {
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
});

export default PatientVisits;
