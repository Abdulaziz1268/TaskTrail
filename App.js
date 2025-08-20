import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Text, StyleSheet, Button } from "react-native"


const stack = createNativeStackNavigator()

function Login({ navigation }) {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text>Login Screen</Text>
      <Button title="home" onPress={() => navigation.navigate("tasks")} />
    </View>
  )
}
function TaskListScreen() {
  return (
    <View>
      <Text>Tasks list screen</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="login">
        <stack.Screen name="login" component={Login} />
        <stack.Screen name="tasks" component={TaskListScreen} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
