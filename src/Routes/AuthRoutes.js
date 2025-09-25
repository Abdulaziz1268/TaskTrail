import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../Screens/Home"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Verification from "../Screens/Verification"
import Profile from "../Screens/Profile"
import ForgotPassword from "../Screens/ForgotPassword"
import Feed from "../Screens/Feed"
import Post from "../Screens/Post"
import { useContext } from "react"
import { AuthContext } from "../Context/Auth"
import ImageViewer from "../Components/ImageViewer"
import VideoViewer from "../Components/VideoViewer"
import Tasks from "../Screens/Tasks"

const AuthStack = createNativeStackNavigator()

export default function AuthRoutes() {
  const { isLogged } = useContext(AuthContext)

  return (
    <AuthStack.Navigator
      initialRouteName={isLogged ? "tasks" : "home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="home" component={Home} />
      <AuthStack.Screen name="post" component={Post} />
      <AuthStack.Screen name="feed" component={Feed} />
      <AuthStack.Screen name="tasks" component={Tasks} />
      <AuthStack.Screen name="imageViewer" component={ImageViewer} />
      <AuthStack.Screen name="videoViewer" component={VideoViewer} />
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="register" component={Register} />
      <AuthStack.Screen name="profile" component={Profile} />
      <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="verification" component={Verification} />
    </AuthStack.Navigator>
  )
}
