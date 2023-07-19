import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Home from "./screens/Home/Home.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupProfile from "./screens/Profile/SetupProfile.jsx";
// import Auth from "./screens/Signup/Auth.jsx";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import WelcomePage from "./screens/Welcome/Welcome.jsx";
import ChatScreen from "./screens/ChatScreen/Chatscreen.js";
import Appointment from "./screens/DoctorAppointment/Appointment.js";
import Labmodule from "./screens/LabModule/LabModule.js";
import AvailableDoctorsScreen from "./screens/Doctors/Doctors.js";
import DepartmentsScreen from "./screens/Departments/Departments.js";
import Auth from "./screens/Authentication/Auth.js";
import LabModule from "./screens/LabModule/LabModule.js";
import EmergencyNumbersScreen from "./screens/EmergencyNumbers/EmergencyNumbers.js";
import AboutUsScreen from "./screens/AboutScreen/AboutScreen.js";
import ContactUsScreen from "./screens/Contact/Contact.js";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import AuthCtxProvider, { authCtx } from "./store/auth.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Visits from "./screens/Visits/PatientVisits.js";
import DepartmentInfoScreen from "./screens/DepartmentInfo/DepartmentInfo.js";
// import ChatScreen from "./screens/ChatScreen/Chatscreen.js";
// import SetupProfile from "./screens/Profile/SetupProfile.jsx";
import MyOnlineAppointmentsScreen from "./screens/OnlineAppointments/OnlineAppointments.js";

export default function MainHome() {
  const Stack = createNativeStackNavigator();
  const uCtx = useContext(authCtx);
  const [oldUser, setoldUser] = useState(false);
  const [isAuth, setisAuth] = useState(false);
  const [loading, setisloading] = useState(false);
  console.log("auth---", uCtx.isloggedIn);
  console.log("auth?", isAuth);

  useEffect(() => {
    console.log("changing");
    setisAuth((p) => uCtx.isloggedIn);
    // const initialRoute = isAuth ? "Root" : "Authenticate";
    // Stack.Navigator.screenOptions({ initialRouteName: initialRoute }); // Update the isAuth state when the context changes
  }, [uCtx.isloggedIn]);
  useEffect(() => {
    const removeExpiredToken = async () => {
      try {
        setisloading(true);
        const tokenData = await AsyncStorage.getItem("FGPC_token");
        const userData = await AsyncStorage.getItem("FGPC_user");
        console.log("checking");

        if (tokenData && userData) {
          const { token, expiryDate } = JSON.parse(tokenData);
          const userDetails = JSON.parse(userData);
          console.log("exists", token, userDetails);
          const currentDate = new Date().getTime();
          if (currentDate > expiryDate) {
            // Token has expired, remove it from storage
            await AsyncStorage.removeItem("FGPC_token");
            await AsyncStorage.removeItem("FGPC_user");
          } else {
            uCtx.setuserInfo({ ...userDetails, token: t });
          }
        }
      } catch (error) {
        console.log("Error while removing expired token:", error);
      } finally {
        setisloading(false);
      }
    };

    const timer = setInterval(removeExpiredToken, 60 * 60 * 1000); // Check every hour if the token has expired
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);
  const getToken = async () => {
    try {
      setisloading(true);
      const tokenData = await AsyncStorage.getItem("FGPC_token");
      const userData = await AsyncStorage.getItem("FGPC_user");

      if (tokenData && userData) {
        const { token } = JSON.parse(tokenData);
        const userDetails = JSON.parse(userData);
        console.log("exists", token, userDetails);
        setoldUser((p) => true);
        setisAuth((p) => true);
        uCtx.setuserInfo({ ...userDetails, token }, true);
      }
    } catch (error) {
      console.log("Error while removing expired token:", error);
    } finally {
      setisloading(false);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            uCtx.isloggedIn ? "Root" : oldUser ? "Authenticate" : "Welcome"
          }
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Root"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Authenticate"
            component={Auth}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Departments"
            component={DepartmentsScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DepartmentInfo"
            component={DepartmentInfoScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Doctors"
            component={AvailableDoctorsScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Appointment"
            component={Appointment}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Labmodule"
            component={Labmodule}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Setup"
            component={SetupProfile}
            options={{
              headerShown: true,
              title: "Set Up Your Profile",
              headerLeft: () => (
                <Pressable>
                  <Ionicons name="arrow-back" size={25} />
                </Pressable>
              ),
              headerTitleAlign: "center",
              headerStyle: {
                shadowColor: "transparent", // this covers iOS
                elevation: 0, // this covers Android
              },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const DrawerNavigation = (props) => {
  const Drawer = createDrawerNavigator();
  const uCtx = useContext(authCtx);
  const [isAuth, setisAuth] = useState(false);
  const [isLoggingOut, setisLoggingOut] = useState(false);
  // console.log("auth?", uCtx.isloggedIn);
  useEffect(() => {
    setisAuth(uCtx.isloggedIn); // Update the isAuth state when the context changes
  }, [uCtx.isloggedIn]);
  const LogoutHandler = () => {
    setisLoggingOut(true);
    fetch("https://psychedelic-wine-production.up.railway.app/auth/logout", {
      method: "get",
      headers: {
        Authorization: `Bearer ${uCtx.userInfo?.token}`,
      },
    })
      .then((r) => {
        console.log(r.status);
        if (!r.ok) {
          if (r.status === 401) {
            return props.navigation.navigate("Authenticate");
          } else if (r.status === 200) {
            return AsyncStorage.removeItem("FGPC_token");
          }
          throw "Error";
        }
      })
      .then((c) => AsyncStorage.removeItem("FGPC_user"))
      .then((x) => props.navigation.navigate("Authenticate"))
      .catch((e) => {
        console.log(e);
        return Alert.alert(
          "Error",
          "Couldnt Log You Out.Check Internet Connection"
        );
      })
      .finally((f) => setisLoggingOut((p) => false));
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} isAuth={isAuth}>
          <View style={styles.drawerHeader}>
            <FontAwesome5 name="hand-holding-medical" size={70} color="red" />
          </View>
          <DrawerItemList {...props} />
          {uCtx.isloggedIn && isLoggingOut ? (
            <ActivityIndicator size={30} color={"orange"} />
          ) : (
            <DrawerItem label="Logout" onPress={LogoutHandler} />
          )}
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true, swipeEnabled: true }}
      />
      <Drawer.Screen
        name="Book Online Appointment"
        component={isAuth ? Appointment : Auth}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Records"
        component={isAuth ? LabModule : Auth}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Online Appointments"
        component={isAuth ? MyOnlineAppointmentsScreen : Auth}
        options={{ headerShown: true, unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="My Visits"
        component={isAuth ? Visits : Auth}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Profile"
        component={isAuth ? SetupProfile : Auth}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Chat With Admin"
        component={isAuth ? ChatScreen : Auth}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Emergency Numbers"
        component={EmergencyNumbersScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{ headerShown: true }}
      />

      {/* <Drawer.Screen name="Settings" component={Auth} /> */}
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerHeader: {
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: "red",
    padding: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  drawerItemLabel: {
    fontSize: 16,
  },
});
