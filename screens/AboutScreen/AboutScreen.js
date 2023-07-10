import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel metus ac metus pharetra euismod.
        Quisque iaculis est ut turpis mollis, a dapibus sem gravida. Nulla facilisi. Mauris efficitur nisi ac
        semper venenatis. Nulla eleifend elementum arcu vel vulputate. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; In semper scelerisque erat, eu dapibus sem sollicitudin vitae.
      </Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
  },
});

export default AboutUsScreen;