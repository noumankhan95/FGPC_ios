import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainHome from "./MainHome.js";
import AuthCtxProvider from "./store/auth.js";
// import ChatScreen from "./screens/ChatScreen/Chatscreen.js";
// import SetupProfile from "./screens/Profile/SetupProfile.jsx";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthCtxProvider>
        <MainHome />
      </AuthCtxProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // drawerContent: {
  //   flex: 1,
  //   paddingTop: 20,
  // },
  // drawerHeader: {
  //   alignItems: "center",
  //   marginBottom: 20,
  //   // backgroundColor: "red",
  //   padding: 40,
  // },
  // logo: {
  //   width: 100,
  //   height: 100,
  // },
  // drawerItemLabel: {
  //   fontSize: 16,
  // },
});
