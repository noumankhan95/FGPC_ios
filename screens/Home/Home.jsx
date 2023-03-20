import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../../components/Home/Header.jsx";
import SearchBar from "../../components/Home/SearchBar.jsx";
import Slider from "../../components/Home/Slider.jsx";
import OptionsList from "../../components/Home/OptionsList.jsx";
const Home = (props) => {
  return (
    <View style={style.container}>
      <Header />
      <SearchBar />
      <Slider />
      <OptionsList />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
});
export default Home;
