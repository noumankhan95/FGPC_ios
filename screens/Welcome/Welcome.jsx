import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
var j = 0;
const WelcomePage = () => {
  const { navigate } = useNavigation();

  const info = [
    { text: "FGPCH", description: "Hello" },
    {
      text: "Welcome to FGPCH",
      description:
        "An Amazing Application that can keep you healthy and up to date about your health and medical reports",
      image:
        "https://aanmc.org/wp-content/uploads/2018/07/older-students-advanced-standing-iStock-642622626-1024x683.png",
    },
    {
      text: "Welcome to FGPCH",
      description: "Thousands of Doctors and Experts to Help Your Health ",
      image:
        "https://www.cigna.com/static/images/heroes/hcpdirectory/collaborative-care-index-hero.jpg",
    },
    {
      text: "Welcome to FGPCH",
      description: "Health Checks & Consultations easily anywhere anytime ",
      image:
        "https://www.newhopefertility.com/wp-content/uploads/2022/07/iStock-1325427613.jpg",
    },
    {
      text: "Welcome to FGPCH",
      description: "Lets Start Living Healthy and Well with us right now!",
      image:
        "https://t3.ftcdn.net/jpg/00/30/40/28/360_F_30402865_rYrBmAKtDWCvma7MYSAOkg588VUQZYVG.jpg",
    },
  ];

  const [data, setdata] = useState(info[j]);
  console.log("i val ", info.length);
  const changeImageHandler = () => {
    if (j <= info.length - 1) {
      console.log("seetting for j: ", j);
      setdata((p) => info[j++]);
      console.log("new j", info[j]);
    } else {
      navigate("Authenticate");
    }

    // setdata(info[i])
  };
  useEffect(() => {
    const sub = setTimeout(() => {
      setdata((p) => info[++j]);
    }, 1000);
    return () => clearTimeout(sub);
  }, []);

  return (
    <SafeAreaView style={styles.outerView}>
      <View style={styles.innerView}>
        <MaterialIcons size={40} name="medical-services" color="#1aabde" />
        <Text style={styles.text}>{data.text}</Text>
      </View>
      {!data.image && <ActivityIndicator size={"large"}></ActivityIndicator>}
      {data?.image && (
        <SafeAreaView style={[styles.innerView, styles.inContainer]}>
          <View style={styles.imgcontainer}>
            <Image style={styles.img} source={{ uri: data.image }}></Image>
          </View>
          <View>
            {/* <Text style={styles.text}>{data.text}</Text> */}
            <Text style={styles.description}>{data.description}</Text>
          </View>
        </SafeAreaView>
      )}
      {data.image && (
        <TouchableOpacity style={styles.button} onPress={changeImageHandler}>
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default WelcomePage;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "bold",
    padding: 10,
  },
  outerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "80%",
    margin: 20,
    backgroundColor: "deepskyblue",
    borderRadius: 5,
  },
  inContainer: {
    padding: 10,
    flexDirection: "column",
  },
  description: {
    fontSize: 20,
    fontWeight: 300,
  },
  nextBtn: {
    color: "white",
  },
  imgcontainer: {
    height: 200,
    width: 400,
    borderRadius: 20,
    margin: 10,
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
