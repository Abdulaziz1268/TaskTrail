import { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
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

const Verification = ({ navigation, route }) => {
  // Get email from route params if coming back from registration
  const initialEmail = route.params?.email || ""
  const [email, setEmail] = useState(initialEmail)
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(initialEmail ? "sent" : "")
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

  // Timer for OTP resend
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

  // Format time as MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === CELL_COUNT) {
      handleCodeSubmit()
    }
  }, [code])

  const handleEmailSubmit = async () => {
    try {
      setIsSubmitting(true)
      Keyboard.dismiss() // Dismiss keyboard

      // Validate email
      if (email.trim() === "") {
        return setError((prevState) => ({
          ...prevState,
          email: "This field is required",
        }))
      }

      await emailValidationSchema.validate({ email })
      setError((prevState) => ({ ...prevState, email: "" }))

      // Send verification code
      const response = await api.post("/api/auth/sendEmail", { email })

      if (response.data.status === "sent") {
        setStatus("sent")
        setSeconds(300) // Reset timer
        setIsActive(true)

        Toast.show({
          type: "success",
          text1: "Verification Code Sent",
          text2: `Check your inbox at ${email}`,
        })
      }
    } catch (error) {
      console.log(error.message)
      setStatus("")

      // Handle validation errors
      if (error.name === "ValidationError") {
        setError((prevState) => ({ ...prevState, email: error.message }))
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong!",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCodeSubmit = async () => {
    try {
      setIsSubmitting(true)
      Keyboard.dismiss() // Dismiss keyboard

      // Validate code
      if (code.trim() === "") {
        return setError((prevState) => ({
          ...prevState,
          code: "This field is required",
        }))
      }

      await codeValidationSchema.validate({ code })
      setError((prevState) => ({ ...prevState, code: "" }))

      // Verify code
      const response = await api.post("/api/auth/verifyEmail", {
        email,
        code,
      })

      if (!response.data.verified) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        })
        return
      }

      // Navigate to registration on success
      navigation.navigate("register", { email })
    } catch (error) {
      console.log(error.message)

      // Handle validation errors
      if (error.name === "ValidationError") {
        setError((prevState) => ({ ...prevState, code: error.message }))
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong!",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = () => {
    setSeconds(300)
    setIsActive(true)
    handleEmailSubmit()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {status !== "sent" ? (
          <>
            <Text style={styles.title}>Enter your Email</Text>

            <TextInput
              style={[styles.input, error.email && styles.inputError]}
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              placeholder="Email"
              onChangeText={(value) => {
                setEmail(value.toLowerCase())
                setError((prevState) => ({ ...prevState, email: "" }))
              }}
              editable={!isSubmitting}
            />
            {error.email ? (
              <Text style={styles.errorText}>{error.email}</Text>
            ) : null}

            <Button
              title={isSubmitting ? "Sending..." : "Send Verification Code"}
              onPress={handleEmailSubmit}
              disabled={isSubmitting}
            />

            {isSubmitting && <ActivityIndicator style={styles.loader} />}
          </>
        ) : (
          <>
            <Text style={styles.title}>Enter verification code</Text>
            <Text style={styles.subtitle}>Sent to {email}</Text>

            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              editable={!isSubmitting}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    isFocused && styles.focusCell,
                    error.code && styles.cellError,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />

            {error.code ? (
              <Text style={styles.errorText}>{error.code}</Text>
            ) : null}

            <View style={styles.timerContainer}>
              {isActive ? (
                <Text style={styles.timerText}>
                  Resend code in {formatTime(seconds)}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={isSubmitting}
                >
                  <Text
                    style={[
                      styles.resendText,
                      isSubmitting && styles.resendDisabled,
                    ]}
                  >
                    Resend verification code
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isSubmitting && <ActivityIndicator style={styles.loader} />}

            <TouchableOpacity
              onPress={() => setStatus("")}
              style={styles.changeEmailButton}
            >
              <Text style={styles.changeEmailText}>Change email address</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 55,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    textAlign: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  cellError: {
    borderColor: "red",
  },
  focusCell: {
    borderColor: "#007AFF",
  },
  timerContainer: {
    marginVertical: 15,
  },
  timerText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  resendText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "500",
  },
  resendDisabled: {
    opacity: 0.5,
  },
  loader: {
    marginTop: 20,
  },
  changeEmailButton: {
    marginTop: 20,
  },
  changeEmailText: {
    color: "#007AFF",
    fontSize: 16,
  },
})

export default Verification
