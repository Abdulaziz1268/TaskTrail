import { useEffect, useRef, useState } from "react"
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Platform } from "react-native"
import TaskCard from "../Components/TaskCard"
import { apiWithUserAuth } from "../Config/Api"
import Toast from "react-native-toast-message"

const Tasks = () => {
  const [data, setData] = useState([])

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([
    { id: "1695643200001", content: "Buy groceries" },
    { id: "1695643201002", content: "Finish project report" },
    { id: "1695643202003", content: "Call the dentist" },
    { id: "1695643203004", content: "Book flight tickets" },
    { id: "1695643204005", content: "Read a book" },
    { id: "1695643205006", content: "Go for a run" },
    { id: "1695643206007", content: "Schedule a meeting" },
    { id: "1695643207008", content: "Respond to emails" },
    { id: "1695643208009", content: "Organize workspace" },
    { id: "1695643209010", content: "Prepare dinner" },
    { id: "1695643210011", content: "Do laundry" },
    { id: "1695643211012", content: "Practice guitar" },
    { id: "1695643212013", content: "Plan the weekend" },
    { id: "1695643213014", content: "Update resume" },
    { id: "1695643214015", content: "Clean the kitchen" },
  ])
  const inputRef = useRef(null)

  const addTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), content: task }])
    setTask("")
    inputRef.current?.blur()
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id))
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const api = await apiWithUserAuth()
        const response = await api.get("/api/task/getTasks")
        setTasks(response.data)
        console.log(response)
        Toast.show({
          type: "success",
          text1: "Tasks retrievedvvv successfully.",
        })
      } catch (error) {
        console.log(error.response?.data.error || error.message)
        Toast.show({
          type: "error",
          text1: error.response?.data.error || error.message,
        })
      }
    }

    fetchTasks()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskTrail</Text>
      <View style={styles.postContainer}>
        <View style={styles.newTaskWrapper}>
          <TextInput
            placeholder="Add task"
            onChangeText={setTask}
            style={styles.newTaskInput}
            ref={inputRef}
            value={task}
          />
          {task.length > 0 && (
            <TouchableOpacity style={styles.addBtn} onPress={addTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        renderItem={({ item }) => (
          <TaskCard item={item} deleteTask={deleteTask} />
        )}
        style={styles.taskListWrapper}
        ItemSeparatorComponent={() => <View></View>}
        contentContainerStyle={{ paddingBottom: 15 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#0047AB",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 5,
    marginVertical: 5,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "white",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  taskListWrapper: {
    backgroundColor: "gray",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 2,
  },
  header: {
    fontSize: 25,
    fontWeight: "900",
    margin: 5,
    marginLeft: 20,
  },
  postContainer: {
    width: "100%",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  newTaskWrapper: {
    fontSize: 20,
    backgroundColor: "lightgray",
    // paddingVertical: 5,
    paddingLeft: 24,
    margin: 2,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
  },
  newTaskInput: {
    height: 50,
    flex: 1,
    marginVertical: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 4,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "gray",
  },
})

export default Tasks
