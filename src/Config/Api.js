import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const baseURL = "http://192.168.46.73:2005"

const api = axios.create({
  baseURL,
  timeout: 10000,
})

// Use this function for authenticated requests
export const apiWithUserAuth = async () => {
  const token = await AsyncStorage.getItem("token")
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      // token,
    },
  })
  return instance
}

export default api
