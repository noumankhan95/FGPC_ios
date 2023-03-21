import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Pressable, Image } from "react-native";
const items = [
  {
    image:
      "https://i.pinimg.com/736x/1f/64/72/1f64724836e7eb60f24100ca9cad8bad.jpg",
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/portrait-happy-asian-woman-doctor-260nw-1197871165.jpg",
  },
  {
    image:
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/317/317994/female-doctor-surrounded-by-men.jpg",
  },
];
const Slider = (props) => {
  const [sliderimg, setsliderimg] = useState(items[0].image);
  var i = 0;
  useEffect(() => {
    const timer = setInterval(() => {
      if (i > items.length - 1) i = 0;
      console.log("changing image", i);
      setsliderimg((p) => items[i].image);
      i += 1;
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const changeImageHandler = useCallback(() => {
    if (i > items.length - 1) i = 0;
    setsliderimg((p) => items[i].image);
    i += 1;
  }, []);
  return (
    <View style={style.container}>
      <Text style={[style.maintext, { fontSize: 30 }]}>Medical Checks</Text>
      <Text style={style.maintext}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit saepe
        deleniti quo nemo
      </Text>
      <View style={style.slidercontainer}>
        <Pressable style={style.btnContainer}>
          <Text style={style.btnText}>Check Now</Text>
        </Pressable>
        <View style={style.Slidercontroller}>
          <View style={style.imgcontainer}>
            <Image source={{ uri: sliderimg }} style={style.img} />
          </View>

          <Pressable style={style.sliderbtns}>
            <Text style={style.sliderbtn} onPress={changeImageHandler}>
              _
            </Text>
            <Text style={style.sliderbtn} onPress={changeImageHandler}>
              _
            </Text>
            <Text style={style.sliderbtn} onPress={changeImageHandler}>
              _
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "mediumslateblue",
    flex: 0.3,
    marginTop: 10,
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
  },
  btnContainer: {
    width: "30%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  btnText: {
    textAlign: "center",
  },
  maintext: {
    color: "white",
  },
  slidercontainer: {
    height: "70%",
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  sliderbtns: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: -30,
  },
  sliderbtn: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
  },
  imgcontainer: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img: {
    resizeMode: "contain",
    width: "90%",
    height: "100%",
    borderRadius: 20,
  },
  Slidercontroller: {
    height: "100%",
    width: "50%",
    // backgroundColor: "red",
    alignItems: "center",
  },
});
export default Slider;
