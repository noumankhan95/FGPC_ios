import { View, StyleSheet, Text, Image } from "react-native";
import * as Icon from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={Style.container}>
      <View style={Style.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=2000",
          }}
          style={Style.headerimg}
        />
      </View>
      <View style={Style.textContainer}>
        <Text style={Style.textData}>
          Good Morning <Icon.Entypo name="hand" />
        </Text>
        <Text>Ladies And Gentlemen</Text>
      </View>
      <View style={Style.iconcontainer}>
        <Icon.AntDesign name={"bells"} size={20} />
        <Icon.Ionicons name={"heart-outline"} size={20} />
      </View>
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    padding: 5,
  },
  imageContainer: {
    flex: 0.2,
    height: "100%",
  },
  headerimg: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
    borderRadius: 200,
  },
  textData: {
    fontSize: 17,
  },
  iconcontainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textContainer: {
    flex: 0.5,
    paddingLeft: 10,
  },
});

export default Header;
