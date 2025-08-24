import { Formik } from "formik"
import { Button, StyleSheet, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import Toast from "react-native-toast-message"
import { loginValidationSchema } from "../Config/ValidationSchema"
import api from "../Config/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true)

            values.email = values.email.toLowerCase()
            const response = await api.post("/api/auth/login", values)
            await AsyncStorage.setItem("token", response.data.token)
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(response.data.user)
            )
            console.log(response.data)
            setTimeout(() => {
              navigation.navigate("home")
            }, 1500)

            Toast.show({ type: "success", text1: "Success" })
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: error.message || "something went wrong!",
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
          <>
            <TextInput
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="email"
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="password"
              secureTextEntry
              onBlur={handleBlur("password")}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button
              title="Login"
              disabled={isSubmitting}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({})

export default Login
