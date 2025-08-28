import { useEffect, useRef, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import api from "../Config/Api"
import Toast from "react-native-toast-message"
import {
  codeValidationSchema,
  emailValidationSchema,
} from "../Config/ValidationSchema"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

const Verification = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("")
  const [seconds, setSeconds] = useState(300)
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState({
    email: "",
    code: "",
  })

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })

  useEffect(() => {
    let interval = null

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0) {
      clearInterval(interval)
      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  // 🧮 Format MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  useEffect(() => {
    if (code.length === CELL_COUNT) handleCodeSubmit()
  }, [code])

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
      setIsActive(true)
    } catch (error) {
      console.log(error.message)
      setStatus("")
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error.response?.data.message ||
          error.message ||
          "something went wrong!",
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
        text2:
          error.response?.data.message ||
          error.message ||
          "Some thing went wrong!",
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
          {/* <TextInput
            style={styles.input}
            inputMode="numeric"
            value={code}
            maxLength={6}
            placeholder="code"
            onChangeText={(value) => setCode(value)}
          />
          {error.code ? (
            <Text style={styles.errorText}>{error.code}</Text>
          ) : null} */}
          <CodeField
            ref={ref} // Enables blur-on-fulfill behavior
            {...props} // Enables clear and focus on tap
            value={code} // Current code
            onChangeText={setCode} // Update state on input
            cellCount={CELL_COUNT} // How many digits
            rootStyle={styles.codeFieldRoot} // Container style
            keyboardType="number-pad" // Number-only input
            textContentType="oneTimeCode" // For SMS autofill (iOS)
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)} // Handles focusing
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {isActive ? (
            <Text style={styles.timerText}>
              Resend in {formatTime(seconds)}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}

          {error.code ? (
            <Text style={styles.errorText}>{error.code}</Text>
          ) : null}

          {/* <Text></Text>
          <Button
            title="Resend Code"
            onPress={handleEmailSubmit}
            disabled={isSubmitting}
          /> */}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   justifyContent: "center",
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   padding: 10,
  //   marginBottom: 10,
  //   borderRadius: 5,
  // },
  // errorText: {
  //   marginBottom: 10,
  //   color: "red",
  // },

  errorText: {
    color: "red",
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  codeFieldRoot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 48,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  focusCell: {
    borderColor: "#007AFF",
  },
})

export default Verification
