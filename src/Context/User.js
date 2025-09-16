import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./Auth"
import { apiWithUserAuth } from "../Config/Api"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)
  const { isLogged } = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const api = await apiWithUserAuth()
        const response = await api.get("/api/user/profile")
        setUserData(response.data.user)
      } catch (error) {
        console.log(error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }

    if (isLogged) fetchUser()
  }, [isLogged])

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  )
}
