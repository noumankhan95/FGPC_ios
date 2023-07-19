import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { authCtx } from "../../store/auth";
import { RadioButton } from "react-native-paper";
const DoctorAppointment = () => {
  const uctx = useContext(authCtx);

  const now = new Date();
  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const today4PM = new Date(now);
  today4PM.setHours(16, 0, 0, 0);
  const [selectedTime, setSelectedTime] = useState(twoHoursFromNow);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [minSelectableTime, setMinSelectableTime] = useState(twoHoursFromNow);
  const [maxSelectableTime, setMaxSelectableTime] = useState(today4PM);
  const [runningOpds, setrunningOpds] = useState([]);
  const openTimePicker = () => {
    setShowTimePicker(true);
  };
  const [checked, setChecked] = useState();
  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(Platform.OS === "ios"); // Hide the picker for iOS automatically

    if (selectedDate) {
      // Check if the selected time is within the allowed range
      if (
        selectedDate >= minSelectableTime &&
        selectedDate <= maxSelectableTime
      ) {
        setSelectedTime(selectedDate);
      } else {
        // If the selected time is outside the allowed range, reset to the minimum or maximum selectable time.
        setSelectedTime(
          selectedDate < minSelectableTime
            ? minSelectableTime
            : maxSelectableTime
        );
      }
    }
  };
  useEffect(() => {
    fetch(
      `https://psychedelic-wine-production.up.railway.app/patient_user/get_list_of_queue`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${uctx.userInfo?.token}`,
        },
      }
    )
      .then((r) => r.json())
      .then((d) => {
        setrunningOpds(d);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleAppointmentSubmit = () => {
    // Handle appointment submission logic here
    // You can access the values of name, selectedDate, and selectedTime to process the appointment request
    // For this example, we'll simply log the values to the console
    if (!selectedTime || !checked)
      return Alert.alert(
        "Please Provide Complete Details of Time and Running Opd Unit"
      );
    const splitDpts = checked.split("-");
    // console.log(selectedTime, checked, splitDpts);
    const subdpts = splitDpts.slice(1).join("-");
    console.log(
      selectedTime
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(/(:\d{2}| [APap][mM])$/, ""),

      splitDpts[0],
      subdpts,
      uctx.userInfo?.token
    );

    fetch(
      `https://psychedelic-wine-production.up.railway.app/patient_user/create_new_appointment`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uctx.userInfo?.token}`,
        },
        body: JSON.stringify({
          opd_dep: splitDpts[0].trim(),
          opd_sub_dep: subdpts.trim(),
          appointmentTime: selectedTime
            .toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(/(:\d{2}| [APap][mM])$/, "")
            .trim(),
        }),
      }
    )
      .then((r) => {
        // if (!r.ok || r.status === 401) throw "error";
        return r.json();
      })
      .then((d) => {
        console.log(d);

        if (d.response === "Appointment Booked") {
          return Alert.alert(
            "Success",
            `Appointment Booked Successfully at ${d.appointment.appointmentTime}`
          );
        } else throw "Error";
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "Error",
          "Your Appointment Couldnt Be Booked.Please Ensure That you Provide Correct Details"
        );
      });
    // Reset form after submission
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 0.4,
          paddingVertical: 10,
        }}
      >
        <Text style={[styles.instructionsText, { fontSize: 29, color: "red" }]}>
          Note
        </Text>
        <Text style={styles.instructionsText}>
          1-The appointment timing starts from 9 AM & ends at 4 PM.
        </Text>
        <Text style={styles.instructionsText}>
          2-The appointment must be taken 2 hours before the time the patient
          wants.
        </Text>
        <Text style={styles.instructionsText}>
          3-The Appointment time taking minutes must be {`{ 0, 15, 30, 45 }`} of
          an hour.
        </Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 17 }}>
          OPD is Currently Running For The Following.Please Select One
        </Text>
        {runningOpds.map((o) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={o}
          >
            <Text>{o}</Text>
            <RadioButton
              value={o}
              status={checked === o ? "checked" : "unchecked"}
              onPress={() => setChecked(o)}
              key={o.toString()}
            />
          </View>
        ))}
      </View>
      <Text style={styles.selectedTime}>
        Selected Time
        <Text style={{ color: "gray", textAlign: "right" }}>
          {"       " + selectedTime.toLocaleTimeString()}
        </Text>
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Button title="Choose Appointment Time" onPress={openTimePicker} />
        <Button title="Book Appointment" onPress={handleAppointmentSubmit} />
      </View>

      <View>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={selectedTime}
            mode="time"
            is24Hour={false}
            minimumDate={twoHoursFromNow}
            maximumDate={today4PM}
            onChange={onTimeChange}
            minuteInterval={15}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 5,
    // alignItems: "center",
  },
  selectedTime: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  instructionsText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
export default DoctorAppointment;
