import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
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
import { useState } from "react";

// import ChatScreen from "./screens/ChatScreen/Chatscreen.js";
// import SetupProfile from "./screens/Profile/SetupProfile.jsx";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
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
            name="Root"
            component={DrawerNavigation}
            options={{ headerShown: false }}
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
    </View>
  );
}

const DrawerNavigation = (props) => {
  const Drawer = createDrawerNavigator();
  const [isAuth, setisAuth] = useState(true);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerHeader}>
            <FontAwesome5 name="hand-holding-medical" size={70} color="red" />
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true, swipeEnabled: true }}
      />

      <Drawer.Screen
        name="Records"
        component={LabModule}
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
