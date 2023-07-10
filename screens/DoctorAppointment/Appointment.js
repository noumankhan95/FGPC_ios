import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DoctorAppointment = () => {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleAppointmentSubmit = () => {
    // Handle appointment submission logic here
    // You can access the values of name, selectedDate, and selectedTime to process the appointment request
    // For this example, we'll simply log the values to the console
    console.log('Name:', name);
    console.log('Date:', selectedDate);
    console.log('Time:', selectedTime);

    // Reset form after submission
    setName('');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctor Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={selectedDate}
        onChangeText={setSelectedDate}
        
      />

      <TextInput
        style={styles.input}
        placeholder="Time"
        value={selectedTime}
        onChangeText={setSelectedTime}
      />

      <Button title="Submit" onPress={handleAppointmentSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default DoctorAppointment;