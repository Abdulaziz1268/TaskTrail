import { useContext, useEffect, useState } from "react"
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import placeholder from "../../assets/favicon.png"
import { apiWithUserAuth, baseURL } from "../Config/Api"
import { UserContext } from "../Context/User"
import { Platform } from "react-native"
import FeedCard from "../Components/FeedCard"

const Feed = ({ navigation }) => {
  const [data, setData] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const { userData, loading } = useContext(UserContext)

  useEffect(() => {
    setPostLoading(true)
    const fetchFeeds = async () => {
      try {
        const api = await apiWithUserAuth()
        const response = await api.get("/api/post/getPosts")
        setData(response.data)
      } catch (error) {
        console.log(error.response?.data?.message || error.message)
      } finally {
        setTimeout(() => {
          setPostLoading(false)
        }, 1500)
      }
    }

    fetchFeeds()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskTrail</Text>
      <View style={styles.postContainer}>
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={
            loading || !userData.imageUrl
              ? placeholder
              : { uri: `${baseURL}${userData.imageUrl}` }
          }
        />
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate("post")}
        >
          <Text style={styles.postButtonText}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item._id.toString() || index.toString()}
        renderItem={({ item }) => (
          <FeedCard feed={item} postLoading={postLoading} />
        )}
        style={styles.feedList}
        ItemSeparatorComponent={() => <View></View>}
        contentContainerStyle={{ marginBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  feedList: {
    backgroundColor: "gray",
    width: "100%",
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
  postButton: {
    fontSize: 20,
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingLeft: 24,
    margin: 2,
    borderRadius: 25,
    flex: 1,
  },
  postButtonText: {
    fontSize: 18,
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

export default Feed
