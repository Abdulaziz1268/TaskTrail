import { useRoute } from "@react-navigation/native"
import { Image, Platform, Text } from "react-native"
import { StyleSheet, View } from "react-native"
import { baseURL } from "../Config/Api"
import { FontAwesome } from "@expo/vector-icons"
import { StatusBar } from "react-native"

const ImageViewer = ({ navigation }) => {
  const route = useRoute()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Image Viewer</Text>
      </View>
      <Image
        source={{ uri: `${baseURL}${route.params?.mediaUrl}` }}
        resizeMode="contain"
        style={styles.image}
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

export default ImageViewer
