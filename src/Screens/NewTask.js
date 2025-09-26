import { FontAwesome } from "@expo/vector-icons"
import { Formik } from "formik"
import {
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
import { apiWithUserAuth } from "../Config/Api"
import Toast from "react-native-toast-message"

const NewTask = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="darkGray"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Create Task</Text>
      </View>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)

          try {
            const api = await apiWithUserAuth()
            const response = await api.post("/api/task/createTask", values)
            Toast.show({
              type: "success",
              text1: response.data.message || "Task created successfully",
            })
            navigation.navigate("tasks")
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
              <Text style={styles.lable}>Title</Text>
              <TextInput
                name="title"
                placeholder="Add title"
                onChangeText={handleChange("title")}
                style={styles.title}
              />

              <Text style={styles.lable}>Description</Text>
              <TextInput
                name="description"
                placeholder="Add description"
                onChangeText={handleChange("description")}
                multiline={true}
                numberOfLines={20}
                style={[styles.description, {}]}
                textAlignVertical="top"
              />
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[styles.postBtn, isSubmitting && styles.disabledPostBtn]}
              >
                <Text style={styles.postBtnText}>Create</Text>
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
  description: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    height: "40%",
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
  lable: {
    margin: 10,
    fontSize: 20,
    fontWeight: "600",
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
    verticalAlign: "bottom",
  },
  postBtnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  title: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    minHeight: 70,
  },
})

export default NewTask
