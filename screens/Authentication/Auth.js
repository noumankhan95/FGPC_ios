import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { authCtx } from "../../store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Authentication = (props) => {
  const { params } = useRoute();
  const [authMode, setauthMode] = useState(0);
  const [isloading, setisloading] = useState(false);
  const [tokenStored, setTokenStored] = useState(false);

  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
  });
  const { navigate, replace } = useNavigation();

  const ChangetoSignup = useCallback(() => {
    setauthMode((p) => 0);
  }, [authMode]);
  const ChangetoLogin = useCallback(() => {
    setauthMode((p) => 1);
  }, [authMode]);
  const uctx = useContext(authCtx);

  const LoginHandler = useCallback(async () => {
    try {
      setisloading((p) => true);
      // const sform = new FormData();
      //   const Device_id = await AsyncStorage.getItem("DeviceToken");
      // sform.append("email", userInfo.email.trim());
      // sform.append("password", userInfo.password.trim());
      //   sform.append("device_id", Device_id);
      console.log(process.env.EXPO_PUBLIC_WEB_URL);
      const r = await fetch(
        `https://psychedelic-wine-production.up.railway.app/auth/login_for_app`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInfo.email.trim(),
            password: userInfo.password,
          }),
        }
      );

      if (!r.ok || r.status === 401) throw "An Error Occured";
      const d = await r.json();
      // if (d.status) {
      console.log(d);
      await AsyncStorage.setItem("FGPC_user", JSON.stringify(d.user));
      const expiryDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      await AsyncStorage.setItem(
        "FGPC_token",
        JSON.stringify({ token: d.token, expiryDate })
      );
      setTokenStored(true);
      uctx.setuserInfo({ ...d.user, token: d.token }, true);
      replace("Root", { ...params });

      // if (!d.status) throw d.message;
    } catch (e) {
      console.log(e);
      Alert.alert(
        "An Error Occured",
        "Please Make Sure You Entered Details Correctly And have Active Internet Connection"
      );
    } finally {
      setisloading((p) => false);
    }
  }, [userInfo, authMode, isloading]);
  const SignupHandler = useCallback(async () => {
    try {
      setisloading((p) => true);

      console.log(userInfo);
      //   const DeviceToken = await AsyncStorage.getItem("DeviceToken");
      //   const sform = new FormData();
      //   sform.append("c_name", userInfo.name.trim());
      //   sform.append("c_email", userInfo.email.trim());
      //   sform.append("c_password", userInfo.password.trim());
      //   sform.append("c_contact", userInfo.contact.trim());
      //   sform.append("c_address", userInfo.address.trim());
      //   sform.append("c_deviceToken", DeviceToken || "");
      //   const r = await fetch("https://tarrhoon.com/Api/customerRegistration", {
      //     method: "POST",
      //     headers: { "Content-Type": "multipart/form-data" },
      //     body: sform,
      //   });
      //   if (!r.ok) throw "An Error Occured";
      //   const d = await r.json();
      //   if (d.status) {
      //     console.log(d.status);
      return Alert.alert("Success", "Please Continue With Logging In", [
        {
          text: "OK",
          onPress: () => {
            ChangetoLogin();
            setuserInfo((p) => ({
              name: "",
              email: "",
              password: "",
              address: "",
              contact: "",
            }));
          },
        },
      ]);
      //   }
    } catch (e) {
      console.log(e);
      Alert.alert(
        "An Error Occured",
        "Please Make Sure You Entered Details Correctly And have Active Internet Connection"
      );
    } finally {
      setisloading((p) => false);
    }
  }, [userInfo, authMode, isloading]);
  const ChangeInputHandler = useCallback(
    (type, text) => {
      setuserInfo((p) => ({ ...p, [type]: text }));
    },
    [userInfo, setuserInfo]
  );
  if (isloading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "rgba(115,105,239,255)",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: "black", margin: 10 }}>
          Completing Your Request.Please Wait A Moment
        </Text>
        <ActivityIndicator color={"red"} size={70} />
      </View>
    );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -330}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="scrollableAxes"
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: "lightsteelblue",
          }}
        >
          <FontAwesome5
            name="clinic-medical"
            size={80}
            color="red"
            style={{ alignSelf: "center", marginVertical: 60 }}
          />
          {/* <Image
            source={require("../assets/Group6.png")}
            style={{
              flex: 0.3,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          /> */}

          {authMode === 0 && (
            <View
              style={{
                flex: 0.35,
                justifyContent: "space-between",
                padding: 10,
                width: "95%",
                alignSelf: "center",
              }}
            >
              {/* <Text style={styles.text}>Enter Name</Text> */}
              <TextInput
                placeholder={"Enter Name"}
                value={userInfo.name}
                onChangeText={ChangeInputHandler.bind(null, "name")}
                style={styles.input}
              />
              {/* <Text style={styles.text}>Enter Contact Number</Text> */}

              <TextInput
                placeholder={"Enter Contact"}
                value={userInfo.contact}
                onChangeText={ChangeInputHandler.bind(null, "contact")}
                style={styles.input}
              />
              {/* <Text style={styles.text}>Enter Address</Text> */}

              <TextInput
                placeholder={"Enter Address"}
                value={userInfo.address}
                onChangeText={ChangeInputHandler.bind(null, "address")}
                style={styles.input}
              />
              {/* <Text style={styles.text}>Enter Email</Text> */}
              <TextInput
                placeholder={"Enter Email"}
                value={userInfo.email}
                onChangeText={ChangeInputHandler.bind(null, "email")}
                style={styles.input}
              />
              {/* <Text style={styles.text}>Enter Password</Text> */}
              <TextInput
                placeholder={"Enter Password"}
                secureTextEntry
                value={userInfo.password}
                onChangeText={ChangeInputHandler.bind(null, "password")}
                style={styles.input}
              />
            </View>
          )}
          {authMode === 1 && (
            <View
              style={{
                flex: 0.03,
                justifyContent: "space-between",
                padding: 10,
                width: "95%",
                alignSelf: "center",
              }}
            >
              {/* <Text style={styles.text}>Enter Email</Text> */}

              <TextInput
                // placeholder={"Enter Email"}
                value={userInfo.email}
                onChangeText={ChangeInputHandler.bind(null, "email")}
                style={styles.input}
                placeholder="Email"
              />
              {/* <Text style={styles.text}>Enter Password</Text> */}

              <TextInput
                // placeholder={"Enter Password"}
                secureTextEntry
                value={userInfo.password}
                onChangeText={ChangeInputHandler.bind(null, "password")}
                style={styles.input}
                placeholder="Password"
              />
            </View>
          )}

          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "crimson",
                borderRadius: 8,
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={authMode === 0 ? SignupHandler : LoginHandler}
            >
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                {authMode === 0 ? "Sign Up" : "Login"}
              </Text>
            </TouchableOpacity>
            <Text
              onPress={authMode === 0 ? ChangetoLogin : ChangetoSignup}
              style={styles.text}
            >
              {authMode === 0 ? "Login Instead" : "SignUp Instead"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 48,
    width: "100%",
    padding: 5,
    // borderWidth: 1,
    borderRadius: 10,
    color: "black",
    backgroundColor: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 19,
    color: "purple",
    fontWeight: "400",
  },
});
export default Authentication;
