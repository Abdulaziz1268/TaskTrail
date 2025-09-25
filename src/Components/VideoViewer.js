import { useNavigation, useRoute } from "@react-navigation/native"
import { Platform, Text } from "react-native"
import { StyleSheet, View } from "react-native"
import { baseURL } from "../Config/Api"
import { FontAwesome } from "@expo/vector-icons"
import { StatusBar } from "react-native"
import { VideoView, useVideoPlayer } from "expo-video"

const VideoViewer = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const videoSource = `${baseURL}${route.params?.mediaUrl}`

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Video Viewer</Text>
      </View>
      <VideoView
        style={styles.image}
        player={useVideoPlayer(videoSource, (player) => {
          player.loop = true
          player.play()
        })}
        allowsPictureInPicture
        allowsFullscreen
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "85%",
    alignSelf: "center",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 25,
    color: "white",
  },
})

export default VideoViewer
