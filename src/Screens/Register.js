// import { Button, StyleSheet, Text, TextInput, View } from "react-native"
// import { registerValidationSchema } from "../Config/ValidationSchema"
// import { Formik } from "formik"
// import { useRoute } from "@react-navigation/native"
// import api from "../Config/Api"
// import Toast from "react-native-toast-message"

// const Register = ({ navigation }) => {
//   const route = useRoute()
//   return (
//     <View>
//       <Formik
//         initialValues={{ username: "", password: "", confirmPassword: "" }}
//         validationSchema={registerValidationSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             setSubmitting(true)

//             const email = (await route.params?.email) || ""
//             values.email = email?.toLowerCase()
//             const { confirmPassword, ...data } = values
//             await api.post("/api/auth/register", data)

//             setTimeout(() => {
//               navigation.navigate("login")
//             }, 1500)

//             Toast.show({
//               type: "success",
//               text1: "Success",
//               text2: "Registered Successfully",
//             })
//             console.log(data)
//           } catch (error) {
//             Toast.show({
//               type: "error",
//               text1: "Errorr",
//               text2:
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Something went wrong!",
//             })
//           } finally {
//             setSubmitting(false)
//           }
//         }}
//       >
//         {({
//           handleChange,
//           handleSubmit,
//           handleBlur,
//           values,
//           errors,
//           touched,
//           isSubmitting,
//         }) => (
//           <>
//             <TextInput
//               inputMode="text"
//               autoCapitalize="none"
//               autoCorrect={false}
//               placeholder="username"
//               onChangeText={handleChange("username")}
//               value={values.username}
//               onBlur={handleBlur("username")}
//             />
//             {touched.username && errors.username && (
//               <Text style={styles.errorText}>{errors.username}</Text>
//             )}
//             <TextInput
//               inputMode="text"
//               autoCapitalize="none"
//               autoCorrect={false}
//               value={values.password}
//               onChangeText={handleChange("password")}
//               placeholder="password"
//               secureTextEntry
//               onBlur={handleBlur("password")}
//             />
//             {touched.password && errors.password && (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             )}
//             <TextInput
//               inputMode="text"
//               autoCapitalize="none"
//               autoCorrect={false}
//               value={values.confirmPassword}
//               onChangeText={handleChange("confirmPassword")}
//               placeholder="confirm password"
//               secureTextEntry
//               onBlur={handleBlur("confirmPassword")}
//             />
//             {touched.confirmPassword && errors.confirmPassword && (
//               <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//             )}
//             <Button
//               title="Register"
//               disabled={isSubmitting}
//               onPress={handleSubmit}
//             />
//           </>
//         )}
//       </Formik>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})

// export default Register
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Formik } from "formik"
import { registerValidationSchema } from "../Config/ValidationSchema"
import { useRoute } from "@react-navigation/native"
import api from "../Config/Api"
import Toast from "react-native-toast-message"
import { Ionicons } from "@expo/vector-icons"

const Register = ({ navigation }) => {
  const route = useRoute()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Register with email:{"\n"}
              <Text style={{ fontWeight: "bold" }}>
                {route.params?.email || ""}
              </Text>
            </Text>

            <Formik
              initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={registerValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true)
                  const email = route.params?.email || ""
                  values.email = email.toLowerCase()
                  const { confirmPassword, ...data } = values

                  await api.post("/api/auth/register", data)

                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Registered successfully! Redirecting to login...",
                  })

                  setTimeout(() => {
                    navigation.navigate("login")
                  }, 1500)
                } catch (error) {
                  Toast.show({
                    type: "error",
                    text1: "Registration Failed",
                    text2:
                      error.response?.data?.message ||
                      error.message ||
                      "Something went wrong!",
                  })
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.form}>
                  {/* Username Field */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.username &&
                          errors.username &&
                          styles.inputError,
                      ]}
                      inputMode="text"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Enter your username"
                      onChangeText={handleChange("username")}
                      value={values.username}
                      onBlur={handleBlur("username")}
                      editable={!isSubmitting}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  {/* Password Field */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          styles.passwordInput,
                          touched.password &&
                            errors.password &&
                            styles.inputError,
                        ]}
                        inputMode="text"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        placeholder="Enter your password"
                        secureTextEntry={!isPasswordVisible}
                        onBlur={handleBlur("password")}
                        editable={!isSubmitting}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.visibilityToggle}
                      >
                        <Ionicons
                          name={isPasswordVisible ? "eye-off" : "eye"}
                          size={24}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  {/* Confirm Password Field */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          styles.passwordInput,
                          touched.confirmPassword &&
                            errors.confirmPassword &&
                            styles.inputError,
                        ]}
                        inputMode="text"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        placeholder="Confirm your password"
                        secureTextEntry={!isConfirmPasswordVisible}
                        onBlur={handleBlur("confirmPassword")}
                        editable={!isSubmitting}
                      />
                      <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        style={styles.visibilityToggle}
                      >
                        <Ionicons
                          name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                          size={24}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      isSubmitting && styles.buttonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Register</Text>
                    )}
                  </TouchableOpacity>

                  {/* Login Redirect */}
                  <View style={styles.loginRedirect}>
                    <Text style={styles.loginText}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("login")}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.loginLink}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  visibilityToggle: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#84C1FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#666",
    fontSize: 16,
  },
  loginLink: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default Register
