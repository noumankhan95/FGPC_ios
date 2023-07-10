import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const AvailableDoctorsScreen = () => {
  const { navigate } = useNavigation();
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      image:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/doctor-male-mature.jpg?quality=82&strip=1",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      image:
        "https://www.yourfreecareertest.com/wp-content/uploads/2016/07/physician.jpg",
    },
    {
      id: 3,
      name: "Dr. Michael Johnson",
      image:
        "https://www.aucmed.edu/sites/g/files/krcnkv361/files/styles/atge_3_2_crop_md/public/2021-11/large-Smile-Guy-web.jpg?h=6b55786a&itok=Wy7cQpYS",
    },
    {
      id: 4,
      name: "Dr. Sarah Williams",
      image:
        "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    },
  ];

  const renderDoctor = ({ item }) => (
    <View style={styles.doctorContainer}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.appointmentButton}
        onPress={() => {
          navigate("Appointment");
        }}
      >
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Doctors</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  doctorContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  doctorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  appointmentButton: {
    backgroundColor: "#2e86de",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AvailableDoctorsScreen;
