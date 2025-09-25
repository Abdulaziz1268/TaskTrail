import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const TaskCard = ({ item, deleteTask }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.content}>➤ {item.content}</Text>
      <MaterialCommunityIcons
        name="delete"
        size={30}
        color="black"
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 4,
    height: 80,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingLeft: 15,
  },
  content: {
    margin: 8,
    fontSize: 16,
    flex: 1,
  },
  deleteBtn: {
    marginRight: 20,
  },
})

export default TaskCard
