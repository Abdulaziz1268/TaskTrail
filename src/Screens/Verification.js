import React, { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import api, { apiWithUserAuth } from "../Config/Api"
import { Formik } from "formik"
import Toast from "react-native-toast-message"
import {
  codeValidationSchema,
  emailValidationSchema,
} from "../Config/ValidationSchema"

const Verification = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("")
  const [error, setError] = useState({
    email: "",
    code: "",
  })

  const handleEmailSubmit = async () => {
    try {
      setIsSubmitting(true)

      if (email.trim() === "") {
        return setError((prevState) => ({
          ...prevState,
          email: "This field is required",
        }))
      }

      await emailValidationSchema.validate({ email })

      setError((prevState) => ({ ...prevState, email: "" }))
      const response = await api.post("/api/auth/sendEmail", {
        email,
      })
      if (response.data.status === "sent") setStatus("sent")
      Toast.show({
        type: "success",
        text1: "Verification Code Sent ",
        text2: `check your inbox at ${email}`,
      })
    } catch (error) {
      console.log(error.message)
      setStatus("")
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "something went wrong!",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    try {
      setIsSubmitting(true)
      if (code.trim() === "") {
        return setError((prevState) => ({
          ...prevState,
          code: "This field is required",
        }))
      }

      await codeValidationSchema.validate({ code })
      setError((prevState) => ({ ...prevState, code: "" }))

      const response = await api.post("/api/auth/verifyEmail", {
        email,
        code,
      })
      if (!response.data.verified) {
        console.log(response)
        setIsSubmitting(false)
        return Toast.show({
          type: "success",
          text1: "Email Verified Successfully",
          text2: response.data.message,
        })
      }

      navigation.navigate("register", { email })
      setIsSubmitting(false)
    } catch (error) {
      console.log(error.message)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Some thing went wrong!",
      })
      setIsSubmitting(false)
    }
  }
  return (
    <View style={styles.container}>
      {status !== "sent" ? (
        <>
          <Text>Enter your Email</Text>

          <TextInput
            style={styles.input}
            inputMode="email"
            autoCapitalize="none"
            value={email}
            name="email"
            placeholder="Email"
            onChangeText={(value) => setEmail(value.toLowerCase())}
          />
          {error.email ? (
            <Text style={styles.errorText}>{error.email}</Text>
          ) : null}
          <Button
            title="Submit"
            onPress={handleEmailSubmit}
            disabled={isSubmitting}
          />
        </>
      ) : (
        <>
          <Text>Enter the code sent to your email</Text>
          <TextInput
            style={styles.input}
            inputMode="numeric"
            value={code}
            maxLength={6}
            placeholder="code"
            onChangeText={(value) => setCode(value)}
          />
          {error.code ? (
            <Text style={styles.errorText}>{error.code}</Text>
          ) : null}

          <Button
            title="Submit"
            onPress={handleCodeSubmit}
            disabled={isSubmitting}
          />
          <Text></Text>
          <Button
            title="Resend Code"
            onPress={handleEmailSubmit}
            disabled={isSubmitting}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
})

export default Verification
