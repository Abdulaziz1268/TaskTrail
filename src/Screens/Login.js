// import { Formik } from "formik"
// import {
//   Button,
//   Platform,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native"
// import { TextInput } from "react-native-gesture-handler"
// import Toast from "react-native-toast-message"
// import { loginValidationSchema } from "../Config/ValidationSchema"
// import api from "../Config/Api"
// import AsyncStorage from "@react-native-async-storage/async-storage"

// const Login = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={loginValidationSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             setSubmitting(true)

//             values.email = values.email.toLowerCase()
//             const response = await api.post("/api/auth/login", values)
//             await AsyncStorage.setItem("token", response.data.token)
//             await AsyncStorage.setItem(
//               "user",
//               JSON.stringify(response.data.user)
//             )
//             console.log(response.data)
//             setTimeout(() => {
//               navigation.navigate("profile")
//             }, 1500)

//             Toast.show({ type: "success", text1: "Success" })
//           } catch (error) {
//             Toast.show({
//               type: "error",
//               text1: "Errorr",
//               text2:
//                 error.response?.data.message ||
//                 error.message ||
//                 "something went wrong!",
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
//               inputMode="email"
//               autoCapitalize="none"
//               autoCorrect={false}
//               placeholder="email"
//               onChangeText={handleChange("email")}
//               value={values.email}
//               onBlur={handleBlur("email")}
//             />
//             {touched.email && errors.email && (
//               <Text style={styles.errorText}>{errors.email}</Text>
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
//             <Button
//               title="Login"
//               disabled={isSubmitting}
//               onPress={handleSubmit}
//             />
//           </>
//         )}
//       </Formik>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// })

// export default Login
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
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Formik } from "formik"
import { loginValidationSchema } from "../Config/ValidationSchema"
import Toast from "react-native-toast-message"
import api from "../Config/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"

const Login = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setIsLoggingIn(true)
      values.email = values.email.toLowerCase()
      const response = await api.post("/api/auth/login", values)

      await AsyncStorage.setItem("token", response.data.token)
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user))

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      })

      setTimeout(() => {
        navigation.navigate("profile")
      }, 1500)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong! Please try again.",
      })
    } finally {
      setSubmitting(false)
      setIsLoggingIn(false)
    }
  }

  const handleForgotPassword = () => {
    navigation.navigate("forgotPassword")
    Toast.show({
      type: "info",
      text1: "Feature Coming Soon",
      text2: "Forgot password functionality will be available soon.",
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
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
                  {/* Email Field */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.email && errors.email && styles.inputError,
                      ]}
                      inputMode="email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Enter your email"
                      onChangeText={handleChange("email")}
                      value={values.email}
                      onBlur={handleBlur("email")}
                      editable={!isSubmitting}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
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
                        disabled={isSubmitting}
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

                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      style={styles.forgotPasswordButton}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot your password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      (isSubmitting || isLoggingIn) && styles.buttonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting || isLoggingIn}
                  >
                    {isSubmitting || isLoggingIn ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Sign In</Text>
                    )}
                  </TouchableOpacity>

                  {/* Sign Up Redirect */}
                  <View style={styles.signupRedirect}>
                    <Text style={styles.signupText}>
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("verification")}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.signupLink}>Sign Up</Text>
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
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
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
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#666",
    fontSize: 16,
  },
  signupLink: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default Login
