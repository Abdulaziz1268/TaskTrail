import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { StyleSheet, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { apiWithUserAuth } from "../Config/Api"
import Toast from "react-native-toast-message"

const Post = ({ navigation }) => {
  const [media, setMedia] = useState(null)
  const [mediaHeight, setMediaHeight] = useState(0)
  const [mediaWidth, setMediaWidth] = useState(0)
  const [minimized, setMinimized] = useState(false)

  const handleMinimized = () => setMinimized((prev) => !prev)

  const screenWidth = Dimensions.get("window").width

  useEffect(() => {
    if (media && media.match(/\.(jpeg|jpg|png|gif)$/i)) {
      Image.getSize(
        media,
        (width, height) => {
          const scaledHeight = (height / width) * screenWidth
          setMediaHeight(scaledHeight)
          setMediaWidth(screenWidth)
        },
        (error) => {
          console.error("Failed to get image size:", error)
          setMediaHeight(200) // fallback
        }
      )
    }
  }, [media])

  const pickImage = async (mediaType) => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Please allow access to your media library."
      )
      return
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType === "image" ? ["images"] : ["videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setMedia(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="darkGray"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Post</Text>
      </View>
      <Formik
        initialValues={{ content: "", media: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          values.media = media
          setSubmitting(true)
          const formData = new FormData()
          formData.append("content", values.content)

          if (media) {
            const filename = media.split("/").pop()
            const match = /\.(\w+)$/.exec(filename ?? "")
            const ext = match?.[1]?.toLowerCase()

            let type = ""
            if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
              type = `image/${ext}`
            } else if (["mp4", "mov", "webm", "ogg"].includes(ext)) {
              type = `video/${ext}`
            } else {
              type = "application/octet-stream"
            }

            formData.append("media", {
              uri: media,
              name: filename,
              type,
            })
          }

          try {
            const api = await apiWithUserAuth()
            await api.post("/api/post/createPost", formData)
            Toast.show({
              type: "success",
              text1: "Posted successfully",
            })
            navigation.navigate("feed")
          } catch (error) {
            console.log(error.response?.data?.message || error)
            Toast.show({
              type: "error",
              text1: error.message || "Something went wrong.",
              text2: "Please try again.",
            })
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              style={styles.formContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                name="content"
                placeholder="What's on your mind"
                onChangeText={handleChange("content")}
                multiline={true}
                numberOfLines={10}
                style={[styles.content, {}]}
                textAlignVertical="top"
              />
              {media && (
                <View
                  style={[
                    styles.mediaContainer,
                    { height: minimized ? 50 : mediaHeight },
                  ]}
                >
                  <View style={styles.controlBtnContainer}>
                    <FontAwesome
                      name={minimized ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="gray"
                      style={styles.controlBtn}
                      onPress={handleMinimized}
                    />
                    <FontAwesome
                      name="close"
                      size={20}
                      color="gray"
                      style={styles.controlBtn}
                      onPress={() => setMedia(null)}
                    />
                  </View>
                  <Image
                    source={{ uri: media }}
                    resizeMode="contain"
                    style={[
                      styles.pickedImage,
                      { height: mediaHeight, width: mediaWidth },
                    ]}
                  />
                </View>
              )}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => pickImage("image")}
                >
                  <FontAwesome6 name="file-image" size={24} color="darkGray" />
                  <Text>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => pickImage("video")}
                >
                  <FontAwesome6 name="file-video" size={24} color="darkGray" />
                  <Text>Select Video</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[styles.postBtn, isSubmitting && styles.disabledPostBtn]}
              >
                <Text style={styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 30,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
  },
  controlBtn: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 2,
    paddingHorizontal: 5,
  },
  controlBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    height: "100%",
  },
  content: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    paddingLeft: 15,
    flex: 1,
  },
  disabledPostBtn: {
    opacity: 0.7,
  },
  formContainer: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
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
  },
  mediaInput: {
    display: "none",
  },
  mediaContainer: {
    borderWidth: 2,
    borderColor: "gray",
    marginTop: 15,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  pickedImage: {
    backgroundColor: "black",
  },
  postBtn: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
  },
  postBtnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
})

export default Post
