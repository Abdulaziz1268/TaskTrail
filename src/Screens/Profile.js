import { useEffect, useState } from "react"
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native"
import { apiWithUserAuth } from "../Config/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import OtpInputs from "react-native-otp-textinput"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

const CELL_COUNT = 6

const Profile = () => {
  const [data, setData] = useState({})
  const [usert, setUsert] = useState({})

  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    handleClick()
  }, [])

  const handleClick = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) return console.log("no token found")

      const api = await apiWithUserAuth()
      const response = await api.get("/api/user/profile")

      setData(response.data)
      console.log(response.data)
      const userTest = await AsyncStorage.getItem("user")
      setUsert(JSON.parse(userTest))
      console.log(usert)
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      {/* <Text>{data.message}</Text>
      <Text>{data.user?.username}</Text>
      <Text>{usert.username}</Text> */}
      {/* <OtpInputs
        handleChange={(code) => setOtp(code)}
        numberOfInputs={6}
        inputStyles={styles.otpInput}
      /> */}
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  otpInput: {
    width: "75%",
  },
})

export default Profile
