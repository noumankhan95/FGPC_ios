import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmergencyNumbersScreen = () => {
  const emergencyNumbers = [
    { id: 1, department: "Emergency", number: "911" },
    { id: 2, department: "Cardiology", number: "123-456-7890" },
    { id: 3, department: "Orthopedics", number: "987-654-3210" },
    { id: 4, department: "Pediatrics", number: "555-123-4567" },
    { id: 5, department: "Gynecology", number: "888-555-9999" },
  ];

  const renderEmergencyNumber = ({ item }) => (
    <View style={styles.emergencyNumberContainer}>
      <Text style={styles.department}>{item.department}</Text>
      <Text style={styles.number}>{item.number}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Numbers</Text>
      {emergencyNumbers.map((number) => (
        <View key={number.id}>{renderEmergencyNumber({ item: number })}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  emergencyNumberContainer: {
    // marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  department: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  number: {
    fontSize: 16,
  },
});

export default EmergencyNumbersScreen;
