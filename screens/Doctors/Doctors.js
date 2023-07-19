import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RenderDoctor from "../../components/Home/DoctorItem";
const AvailableDoctorsScreen = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const [docDetails, setdocDetails] = useState(params.doctorsAvailable || []);
  const [loading, setisloading] = useState(false);
  console.log(params);
  // useEffect(() => {
  //   setisloading((p) => true);
  //   fetch(
  //     `https://psychedelic-wine-production.up.railway.app/patient_user/find_department_by_title?department_title=${params.dept_title}`,
  //     {
  //       method: "get",
  //       headers: {
  //         Authorization: `Bearer ${params.token}`,
  //       },
  //     }
  //   )
  //     .then((r) => {
  //       if (!r.ok || r.status === 401) throw "Error";
  //       return r.json();
  //     })
  //     .then((d) => {
  //       console.log(d);
  //     })
  //     .catch((e) => console.log(e))
  //     .finally((f) => setisloading(false));
  // }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available {params.dept_title} Doctors</Text>
      <FlatList
        data={docDetails}
        renderItem={({ item }) => <RenderDoctor item={item} />}
        keyExtractor={(item) => item.doctor_id.toString()}
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

export default AvailableDoctorsScreen;
