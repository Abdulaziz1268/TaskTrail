import React from "react"
import { StyleSheet, Text, View } from "react-native"

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
})

export default ForgotPassword
