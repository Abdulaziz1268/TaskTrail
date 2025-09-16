import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { useState } from "react"
import { Image, Pressable, TouchableOpacity } from "react-native"
import { StyleSheet, View } from "react-native"

import placeholder from "../../assets/placeholder.jpg"
import imagePlaceholder from "../../assets/imagePlaceholder.png"
import videoPlaceholder from "../../assets/videoPlaceholder.png"
import { Text } from "react-native"
import { Video } from "expo-av"

const FeedCard = ({ feed, postLoading }) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => setClicked((prev) => !prev)

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Image
          style={styles.authorImage}
          resizeMode="contain"
          source={
            postLoading || !feed.author.imageUrl
              ? placeholder
              : { uri: `http://localhost:2005${feed.author.imageUrl}` }
          }
        />
        <View style={styles.authorDetail}>
          <Text style={styles.authorName}>{feed.author.username}</Text>
          <Text style={styles.authoredDate}>
            {new Date(feed.updatedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>
        </View>
      </View>
      <Text style={styles.content}>{feed.content}</Text>
      {feed.mediaUrl && feed.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) && (
        <View style={styles.imageMediaContainer}>
          <Image
            style={styles.imageMedia}
            resizeMode="contain"
            source={
              postLoading
                ? imagePlaceholder
                : { uri: `http://localhost:2005${feed.mediaUrl}` }
            }
          />
        </View>
      )}
      {feed.mediaUrl && feed.mediaUrl.match(/\.(mp4|webm|ogg)$/i) && (
        <View style={styles.videoMediaContainer}>
          {postLoading ? (
            <Image
              style={styles.videoPlaceholder}
              resizeMode="contain"
              source={videoPlaceholder}
            />
          ) : (
            <Video
              style={styles.videoMedia}
              source={{ uri: `http://localhost:2005${feed.mediaUrl}` }}
              controls
              resizeMode="contain"
              repeat={false}
              paused
            />
          )}
        </View>
      )}
      <View style={styles.reactionContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleClick}>
          {clicked ? (
            <FontAwesome name="thumbs-up" size={24} color="black" />
          ) : (
            <FontAwesome name="thumbs-o-up" size={24} color="black" />
          )}
          <Text style={styles.btnText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome name="comment-o" size={24} color="black" />
          <Text style={styles.btnText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  authorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  authorDetail: {
    margin: 8,
    paddingVertical: 8,
  },
  authoredDate: {
    color: "gray",
  },
  authorImage: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
  },
  authorName: {
    fontWeight: "600",
  },
  authoredDate: {
    fontWeight: "200",
    fontSize: 14,
    color: "lightgray",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "lightgray",
    borderRadius: 25,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: "white",
    marginVertical: 4,
  },
  content: {
    margin: 8,
  },
  imageMediaContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "black",
    maxHeight: 255,
    overflow: "hidden",
  },
  imageMedia: {
    width: "100%",
  },
  reactionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    height: "auto",
    borderTopWidth: 2,
    borderTopColor: "lightgray",
    marginTop: 8,
  },
  videoMediaContainer: {
    backgroundColor: "black", // Optional: better for video
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 16 / 9, // Consistent container size
    overflow: "hidden", // Clip anything overflowing
  },
  videoPlaceholder: {
    width: "100%",
  },
  videoMedia: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
})

export default FeedCard
