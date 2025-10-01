import { useEffect, useState } from "react"
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Platform } from "react-native"
import TaskCard from "../Components/TaskCard"
import { apiWithUserAuth } from "../Config/Api"
import Toast from "react-native-toast-message"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Tasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    handleFilter()
  }, [tasks, selectedFilter])

  const deleteTask = async (id) => {
    try {
      const api = await apiWithUserAuth()
      const response = await api.delete(`/api/task/deleteTask/${id}`)
      Toast.show({
        type: "success",
        text1: response.data.message || "Deleted Successfully",
      })
      fetchTasks()
    } catch (error) {
      console.log(error.response?.data?.error || error.message)
      Toast.show({
        type: "error",
        text1: error.response?.data?.error || error.message,
      })
    }
  }

  const fetchTasks = async () => {
    try {
      const api = await apiWithUserAuth()
      const response = await api.get("/api/task/getTasks")
      setTasks(response.data)
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
    await fetchTasks()
    setRefreshing(false)
  }

  const handleFilter = async () => {
    try {
      if (selectedFilter === "All") {
        setFilteredTasks(tasks)
      } else if (selectedFilter === "Pending") {
        setFilteredTasks(() => tasks.filter((task) => task.completed !== true))
      } else {
        setFilteredTasks(() => tasks.filter((task) => task.completed === true))
      }
    } catch (error) {
      console.log(error.message)
    }
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
        <TouchableOpacity
          style={styles.filterBtnContainer}
          onPress={() => setShowFilter((prev) => !prev)}
        >
          <MaterialCommunityIcons
            name="filter-outline"
            size={35}
            color="#2196F3"
          />
        </TouchableOpacity>
      </View>
      {showFilter && (
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterItem,
              {
                backgroundColor:
                  selectedFilter === "All" ? "#2196F3" : "lightgray",
              },
            ]}
            onPress={() => setSelectedFilter("All")}
          >
            <Text
              style={{ color: selectedFilter === "All" ? "white" : "black" }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterItem,
              {
                backgroundColor:
                  selectedFilter === "Pending" ? "#2196F3" : "lightgray",
              },
            ]}
            onPress={() => setSelectedFilter("Pending")}
          >
            <Text
              style={{
                color: selectedFilter === "Pending" ? "white" : "black",
              }}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterItem,
              {
                backgroundColor:
                  selectedFilter === "Completed" ? "#2196F3" : "lightgray",
              },
            ]}
            onPress={() => setSelectedFilter("Completed")}
          >
            <Text
              style={{
                color: selectedFilter === "Completed" ? "white" : "black",
              }}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredTasks}
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
  filterBtnContainer: {
    // backgroundColor: "green",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  filterItem: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // width: 100,
    display: "flex",
    alignItems: "center",
    borderRadius: 20,
  },
  filtersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingLeft: 20,
    marginBottom: 15,
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
