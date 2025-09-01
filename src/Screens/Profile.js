import { useEffect, useState } from "react"
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native"
import { apiWithUserAuth } from "../Config/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Profile = () => {
  const [data, setData] = useState({})
  const [usert, setUsert] = useState({})

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
      <Text>{data.message}</Text>
      <Text>{data.user?.username}</Text>
      <Text>{usert.username}</Text>
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
