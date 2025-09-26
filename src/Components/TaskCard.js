import { MaterialCommunityIcons } from "@expo/vector-icons"
import { View } from "react-native"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const TaskCard = ({ item, deleteTask }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <MaterialCommunityIcons
        name="delete"
        size={30}
        color="black"
        style={styles.deleteBtn}
        onPress={() => deleteTask(item._id)}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 4,
    height: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  detailContainer: {
    flex: 1,
  },
  title: {
    margin: 8,
    fontSize: 18,
    fontWeight: "900",
    flex: 1,
  },
  deleteBtn: {
    marginHorizontal: 20,
  },
  description: {
    // color: "gray",
    marginLeft: 8,
  },
})

export default TaskCard
