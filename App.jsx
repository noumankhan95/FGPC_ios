import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Home from "./screens/Home/Home.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupProfile from "./screens/Profile/SetupProfile.jsx";
import Auth from "./screens/Signup/Auth.jsx";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
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
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Settings" component={Auth} />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
