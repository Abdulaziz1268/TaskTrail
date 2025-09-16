import { NavigationContainer } from "@react-navigation/native"
import AuthRoutes from "./src/Routes/AuthRoutes"
import Toast from "react-native-toast-message"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AuthProvider } from "./src/Context/Auth"
import { UserProvider } from "./src/Context/User"

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <UserProvider>
          <NavigationContainer>
            <AuthRoutes />
            <Toast position="bottom" />
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
