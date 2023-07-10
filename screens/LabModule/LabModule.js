import React from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";

const LabModule = () => {
  // Sample data for lab reports
  const labReports = [
    { id: "1", testName: "Blood Test", result: "Normal", date: "2023-07-01" },
    { id: "2", testName: "Urine Test", result: "Abnormal", date: "2023-07-02" },
    { id: "3", testName: "X-Ray", result: "Normal", date: "2023-07-03" },
  ];

  // Render item component for each lab report
  const renderLabReport = ({ item }) => (
    <View style={styles.reportItem}>
      <View style={styles.container}>
        <Text style={styles.testName}>{item.testName}</Text>
        <Text style={styles.result}>Result: {item.result}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
      </View>
      <Button title="Download Report" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={labReports}
        renderItem={renderLabReport}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
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

export default LabModule;
