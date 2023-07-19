import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RenderDoctor = ({ item }) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.doctorContainer}>
      {/* <Image source={{ uri: item.image }} style={styles.doctorImage} /> */}
      <Fontisto name="doctor" size={40} color="skyblue" />
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorName}>{item.specialization}</Text>
      {/* <Text style={styles.doctorName}>onDuty{item.specialization}</Text> */}

      <TouchableOpacity
        style={styles.appointmentButton}
        onPress={() => {
          navigate("Appointment", { appointmentDetails: { ...item } });
        }}
      >
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
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
    borderTopWidth: 0.4,
    borderBottomWidth: 0.3,
    paddingVertical: 10,
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
export default RenderDoctor;
