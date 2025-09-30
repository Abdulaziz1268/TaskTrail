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

const Tasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const deleteTask = async (id) => {
    try {
      const api = await apiWithUserAuth()
      const response = await api.delete(`/api/task/deleteTask/${id}`)
      Toast.show({
        type: "success",
        text1: response.data.message || "Deleted Successfully",
      })
      fetchTasks(true)
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
      Toast.show({
        type: "error",
        text1: error.response?.data?.error || error.message,
      })
    }
  }

  const fetchTasks = async (silent = false) => {
    try {
      const api = await apiWithUserAuth()
      const response = await api.get("/api/task/getTasks")
      setTasks(response.data)
      // if (!silent) {
      //   Toast.show({
      //     type: "success",
      //     text1: "Tasks fetched successfully.",
      //   })
      // }
    } catch (error) {
      console.log(error.response?.data.error || error.message)
      Toast.show({
        type: "error",
        text1: error.response?.data.error || error.message,
      })
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchTasks(true)
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskTrail</Text>
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.newTaskWrapper}
          onPress={() => navigation.navigate("newTask")}
        >
          <Text style={styles.newTaskBtn}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            deleteTask={deleteTask}
            navigation={navigation}
          />
        )}
        style={styles.taskListWrapper}
        ItemSeparatorComponent={() => <View></View>}
        contentContainerStyle={{ paddingBottom: 15 }}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "gray" }}>No tasks found.</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
    backgroundColor: "lightgray",
    paddingVertical: 5,
    paddingLeft: 24,
    margin: 2,
    borderRadius: 30,
    flex: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  newTaskBtn: {
    fontSize: 18,
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
