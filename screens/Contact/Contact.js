import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>
          Email: info@example.com{"\n"}
          Phone: +1234567890{"\n"}
          Address: 123 Main Street, City, Country
        </Text>
      </View>
      <View style={{ flex: 0.4, width: "100%" }}>
        <Text style={styles.heading}>Location</Text>
        <Image
          source={require("../../assets/Location.png")}
          style={{ width: "100%", height: "90%" }}
          resizeMode="cover"
        />
      </View>
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
  text: {
    fontSize: 16,
  },
});

export default ContactUsScreen;
