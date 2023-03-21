import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import color from "../../config/color/color";

export default function Auth({ navigation }) {
  return (
    <View style={Styles.container}>
      <Image
        source={require("../../assets/medical.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={Styles.title}>Create New Account</Text>
      <TextInput
        style={Styles.emailInput}
        label="Email"
        //value={text}
        //onChangeText={text => setText(text)
        placeholder="addmail@gmail.com"
        // right={<TextInput.Icon icon="email" />}
      />
      <TextInput
        style={Styles.passwordInput}
        label="Password"
        placeholder="Password"
        secureTextEntry
        // right={<TextInput.Icon icon="eye" />}
      />
      <Button
        style={{ backgroundColor: color.Primary, width: "80%" }}
        // mode="contained"
        onPress={() => navigation.navigate("Setup")}
        title="Sign up"
      />
      {/* <TouchableOpacity
        style={{ backgroundColor: color.Primary, width: "80%" }}
        // mode="contained"
        onPress={() => navigation.navigate("Setup")}
      >
        <Text>Signup</Text>
      </TouchableOpacity> */}

      <Text style={{ marginTop: 30 }}>
        ---------- or continue with ------------
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 30,
        }}
      >
        <View
          style={{
            marginRight: 40,
            marginLeft: 20,
            borderColor: color.black,
            borderWidth: 1,
            borderRadius: 3,
            padding: 10,
          }}
        >
          <Image
            source={require("../../assets/facebook.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View
          style={{
            marginRight: 30,
            borderColor: color.black,
            borderWidth: 1,
            borderRadius: 3,
            padding: 10,
          }}
        >
          <Image
            source={require("../../assets/google.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View
          style={{
            marginRight: 30,
            borderColor: color.black,
            borderWidth: 1,
            borderRadius: 3,
            padding: 10,
          }}
        >
          <Image
            source={require("../../assets/apple-logo.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Text>Alerady have an account? </Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold", color: "#3062C8" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emailInput: {
    width: "80%",
    marginBottom: 20,
  },
  passwordInput: {
    width: "80%",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
