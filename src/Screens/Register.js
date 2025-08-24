import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { registerValidationSchema } from "../Config/ValidationSchema"
import { Formik } from "formik"
import { useRoute } from "@react-navigation/native"
import api from "../Config/Api"
import Toast from "react-native-toast-message"

const Register = ({ navigation }) => {
  const route = useRoute()
  return (
    <View>
      <Formik
        initialValues={{ username: "", password: "", confirmPassword: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true)

            const email = (await route.params?.email) || ""
            values.email = email?.toLowerCase()
            const { confirmPassword, ...data } = values
            await api.post("/api/auth/register", data)

            setTimeout(() => {
              navigation.navigate("login")
            }, 1500)

            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Registered Successfully",
            })
            console.log(data)
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Errorr",
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
          <>
            <TextInput
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="username"
              onChangeText={handleChange("username")}
              value={values.username}
              onBlur={handleBlur("username")}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
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
            <TextInput
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              placeholder="confirm password"
              secureTextEntry
              onBlur={handleBlur("confirmPassword")}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <Button
              title="Register"
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

export default Register
