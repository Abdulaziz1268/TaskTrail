import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../Screens/Home"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Verification from "../Screens/Verification"
import Profile from "../Screens/Profile"
import ForgotPassword from "../Screens/ForgotPassword"

const AuthStack = createNativeStackNavigator()

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="home" component={Home} />
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="register" component={Register} />
      <AuthStack.Screen name="profile" component={Profile} />
      <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="verification" component={Verification} />
    </AuthStack.Navigator>
  )
}
