import { NavigationContainer } from "@react-navigation/native"
import AuthRoutes from "./src/Routes/AuthRoutes"
import Toast from "react-native-toast-message"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {
  return (
    <GestureHandlerRootView>
      <AppRoutes />
      <Toast />
    </GestureHandlerRootView>
  )
}

function AppRoutes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
