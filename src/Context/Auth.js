import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return console.log("Invalid token")
      }

      setIsLogged(true)
      setLoading(false)
    }

    checkToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
