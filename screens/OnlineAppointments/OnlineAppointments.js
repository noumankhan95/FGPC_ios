import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext } from "react";
import { authCtx } from "../../store/auth";
import { ActivityIndicator } from "react-native";
const MyOnlineAppointmentsScreen = () => {
  const uctx = useContext(authCtx);
  const [onlineAppointment, setonlineAppointments] = useState([]);
  const [loading, setisloading] = useState(false);

  const appointments = [
    // List of appointments with date
    {
      appointment_id: 5,
      opd_dep: "Nurorolgy",
      opd_sub_dep: "Unit-I",
      appointmentTime: "16:00:00",
      appointmentExpiryTime: "17:00:00",
      status: "Expired",
    },
    {
      appointment_id: 9,
      opd_dep: "Nurorolgy",
      opd_sub_dep: "Unit-I",
      appointmentTime: "17:00:00",
      appointmentExpiryTime: "18:00:00",
      status: "Completed",
    },
    // Add more appointments as needed
  ];
  useEffect(() => {
    setisloading(true);
    fetch(
      `https://psychedelic-wine-production.up.railway.app/patient_user/get_patient_all_appointment`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${uctx.userInfo?.token}`,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => setonlineAppointments((p) => data))
      .catch((e) => console.log(e))
      .finally((f) => setisloading(false));
  }, []);
  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.dateText}>{item.opd_dep}</Text>
      <Text style={styles.dateText}>{item.opd_sub_dep}</Text>

      <Text style={styles.timeText}>
        Appointment Time :{item.appointmentTime}
      </Text>
      <Text style={styles.timeText}>
        Appointment Expiry :{item.appointmentExpiryTime}
      </Text>
      <Text style={styles.timeText}>{item.status}</Text>

      <Text style={styles.descriptionText}>{item.description}</Text>
    </View>
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <>
        {onlineAppointment.length === 0 ? (
          <Text>You Dont Have Any appointments Yet</Text>
        ) : (
          <FlatList
            data={onlineAppointment}
            renderItem={renderAppointmentItem}
            keyExtractor={(item) => item.appointment_id.toString()}
          />
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 16,
    color: "gray",
  },
  descriptionText: {
    fontSize: 16,
    color: "black",
  },
});

export default MyOnlineAppointmentsScreen;
