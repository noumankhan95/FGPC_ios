import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
// import { Userctx } from "../store/userContext";
import { Audio } from "expo-av";
import { extname } from "path";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ShowFileType = (ftype, isUser, filedetail) => {
  const [isloadingFile, setisloadingFile] = useState(false);
  const [isSoundFinished, setisSoundFinished] = useState(true);
  const [isloadingDocument, setisloadingDocument] = useState(false);
  const [isloadingAudio, setisloadingAudio] = useState(false);
  const playAudioFromUri = useCallback(
    async (ftype, filedetail) => {
      try {
        setisSoundFinished((p) => false);
        setisloadingAudio((p) => true);
        // const soundUri = `https://tarrhoon.com/uploads/queries/${ftype}`;
        // const soundObject = new Audio.Sound();
        // await soundObject.loadAsync({ uri: soundUri });
        console.log("playing ", filedetail);
        const { sound } = await Audio.Sound.createAsync({
          uri: filedetail._uri,
        });
        // setSound(sound);
        await sound.playAsync();

        setisSoundFinished((p) => false);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isPlaying) setisloadingAudio((p) => false);
          if (status.didJustFinish) {
            // Audio playback has finished
            console.log("Audio playback finished");
            setisSoundFinished((p) => true);

            // Perform any necessary actions after audio playback completion
          }
        });
      } catch (error) {
        setisSoundFinished((p) => true);
        console.log(error);
        return Alert.alert("Couldn't play audio");
      } finally {
        setisloadingAudio((p) => false);
      }
    },
    [isloadingFile, isSoundFinished, isloadingAudio]
  );

  const saveDocumentToAppFolder = useCallback(
    async (ftype, filedetail) => {
      try {
        setisloadingDocument((p) => true);
        const documentUrl = filedetail.uri; // Replace with your document URL

        const documentName = ftype; // Replace with the desired document name

        // await FileSystem.makeDirectoryAsync(appFolder, { intermediates: true });

        const fileUri = `${FileSystem.cacheDirectory}${documentName}`;
        // await FileSystem.downloadAsync(documentUrl, fileUri);
        await FileSystem.copyAsync({
          from: documentUrl,
          to: fileUri,
        });
        await Sharing.shareAsync(fileUri, { dialogTitle: "Open With" });
      } catch (error) {
        console.log(error);
        return Alert.alert("Couldn't Complete Your Action.Please Try Again");
      } finally {
        setisloadingDocument((p) => false);
      }
    },
    [isloadingFile]
  );
  const saveToGallery = useCallback(
    async (ftype) => {
      try {
        setisloadingFile((p) => true);
        const imageUrl = `https://tarrhoon.com/uploads/queries/${ftype}`;
        const { granted, status } =
          await MediaLibrary.requestPermissionsAsync();

        if (!granted) return;
        const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
        await FileSystem.downloadAsync(imageUrl, fileUri);

        await MediaLibrary.saveToLibraryAsync(fileUri);

        ToastAndroid.show("Image saved to gallery", ToastAndroid.SHORT);
      } catch (error) {
        console.log(error);
        return Alert.alert("Couldnt Save File To Gallery");
      } finally {
        setisloadingFile((p) => false);
      }
    },
    [isloadingFile]
  );
  const type = extname(ftype);

  switch (type) {
    case ".png":
    case ".jpg":
    case ".gif":
    case ".jpeg":
      return (
        <TouchableOpacity
          style={[{ height: 170, width: 240 }, !isUser && { width: 230 }]}
          onPress={!isloadingFile ? saveToGallery.bind(null, ftype) : null}
        >
          {isloadingFile && (
            <ActivityIndicator
              size={60}
              color={"rgba(115,105,239,255)"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            />
          )}
          <Image
            source={{ uri: `${filedetail}` }}
            style={[{ height: "100%", width: "100%", resizeMode: "cover" }]}
          />
        </TouchableOpacity>
      );

    case ".mp4":
    case ".wmv":
    case ".mp3":
    case ".m4a":
    case ".wav":
      return (
        <TouchableOpacity
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: 100,
            },
            !isUser && {
              width: 120,
            },
          ]}
        >
          {isloadingAudio ? (
            <ActivityIndicator
              size={30}
              color={"rgba(115,105,239,255)"}
              style={{
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            />
          ) : (
            <Ionicons
              name={isSoundFinished ? "play" : "pause"}
              size={30}
              color={"gold"}
              onPress={
                isSoundFinished
                  ? playAudioFromUri.bind(null, ftype, filedetail)
                  : null
              }
            />
          )}

          <Text
            style={[
              !isUser && {
                color: "white",
                fontWeight: "800",
              },
            ]}
          >
            Play Voice
          </Text>
        </TouchableOpacity>
      );

    case ".pdf":
    case ".doc":
    case ".docx":
    case ".xlsx":
      return (
        <TouchableOpacity
          style={[
            { flexDirection: "row", flexWrap: "wrap" },
            !isUser && { width: 230 },
          ]}
          onPress={
            !isloadingDocument
              ? saveDocumentToAppFolder.bind(null, ftype, filedetail)
              : null
          }
        >
          {isloadingDocument && <ActivityIndicator size={30} color={"white"} />}
          <Text
            style={[
              styles.text,
              {
                color: !isUser ? "white" : "black",
                fontWeight: "800",
              },
            ]}
          >
            Document: {`${ftype}`}
          </Text>
        </TouchableOpacity>
      );
  }
};
const ChatMessage = React.memo(
  (props) => {
    // const { userInfo } = useContext(Userctx);

    return (
      <View
        style={{
          width: "100%",
          marginVertical: 2,
          justifyContent: "flex-start",
          paddingHorizontal: 13,
        }}
      >
        <Text
          style={[
            { fontSize: 19, color: "darkorchid" },
            !props.user && {
              alignSelf: "flex-end",
              // marginRight: 22,
            },
          ]}
        >
          {!props.user ? "You" : "Admin"}
        </Text>

        <View
          style={[
            styles.container,
            !props.user && {
              alignSelf: "flex-end",
              backgroundColor: "mediumpurple",
              // maxWidth: 280,
            },
          ]}
        >
          {ShowFileType(props.q_file, props.user, props.q_filedetail)}
          <Text
            style={[
              !props.user && {
                color: "white",
                paddingBottom: 10,
              },
            ]}
          >
            {props.qa_desc}
          </Text>
          <Text
            style={[
              { alignSelf: "flex-end", fontSize: 12, fontWeight: "300" },
              !props.user && {
                color: "white",
              },
            ]}
          >
            {props.qa_date} {props.qa_time}
          </Text>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return prev.qa_id === next.qa_id;
  }
);

const styles = StyleSheet.create({
  container: {
    maxWidth: 250,
    padding: 10,
    // marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "sandybrown",
    alignSelf: "flex-start",
  },
  text: {
    textDecorationLine: "underline",
  },
});

export default React.memo(ChatMessage);
