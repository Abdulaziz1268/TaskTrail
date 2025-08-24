import {
  Button,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Home</Text>
        <Button title="Login" onPress={() => navigation.navigate("login")} />
        <Text></Text>
        <Button
          title="reg"
          onPress={() => navigation.navigate("verification")}
        />
        <Text></Text>
        <Button
          title="register"
          onPress={() => navigation.navigate("register")}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})

export default Home
