import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
const { width, height } = Dimensions.get("window");
const SetupProfile = (props) => {
  const [status, requestpermission] = ImagePicker.useCameraPermissions();
  const [selectedimg, setselectedimg] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
  );
  const CameraHandler = async () => {
    console.log("tap");
    try {
      const { status } = await requestpermission();
      if (status !== "granted") return Alert.alert("need Permissions");
      const res = await ImagePicker.launchCameraAsync();
      if (res.canceled) return;
      console.log(res);
      setselectedimg((p) => res.assets[0].uri);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={"height"} style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: selectedimg,
            }}
            style={styles.img}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={CameraHandler}
          >
            <Ionicons name="pencil" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Full Name" />
          <TextInput style={styles.input} placeholder="Date Of Birth" />
          <TextInput style={styles.input} placeholder="Nickname" />
          <TextInput style={styles.input} placeholder="Email" />
          <View style={[styles.input, { padding: 0 }]}>
            <Picker selectedValue="Male">
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <Text>
            Lorem ipsum dolor sitm sit iste voluptatum ducimus fugiat
            cupiditate!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => props.navigation.navigate("Root")}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  imgContainer: {
    flex: 0.3,
    alignItems: "flex-end",
    padding: 0,
    justifyContent: "center",
    flexDirection: "row",
    height: height * 0.2,
    width: width * 1.06,
  },
  img: {
    minWidth: "50%",
    minHeight: height * 0.25,
    resizeMode: "cover",
    borderRadius: 400,
    borderWidth: 0.3,
    borderColor: "black",
  },
  iconContainer: {
    backgroundColor: "skyblue",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",

    right: 40,
    zIndex: 1, // 1 for stacking the element on top of the previous element and -1
    // for stacking the element under the above previous element.
    elevation: 1,
  },
  inputContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  input: {
    backgroundColor: "gainsboro",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    width: "88%",
    fontSize: 17,
  },
  btnContainer: {
    backgroundColor: "deepskyblue",
    width: "50%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnText: { textAlign: "center", color: "white" },
});
export default SetupProfile;
