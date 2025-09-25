import { FontAwesome } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Dimensions, Image, Pressable, TouchableOpacity } from "react-native"
import { StyleSheet, View, Text } from "react-native"

import placeholder from "../../assets/placeholder.jpg"
import imagePlaceholder from "../../assets/imagePlaceholder.png"
import videoPlaceholder from "../../assets/videoPlaceholder.png"
import { baseURL } from "../Config/Api"
import { useNavigation } from "@react-navigation/native"
import { useVideoPlayer, VideoView } from "expo-video"

const FeedCard = ({ feed, postLoading }) => {
  const [clicked, setClicked] = useState(false)
  const [mediaHeight, setMediaHeight] = useState(0)
  const [mediaWidth, setMediaWidth] = useState(0)

  const navigation = useNavigation()

  const handleClick = () => setClicked((prev) => !prev)

  const player = useVideoPlayer(`${baseURL}${feed.mediaUrl}`, (player) => {
    player.loop = false
    player.pause()
  })

  const screenWidth = Dimensions.get("window").width

  useEffect(() => {
    if (
      !postLoading &&
      feed.mediaUrl &&
      feed.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i)
    ) {
      Image.getSize(
        `${baseURL}${feed.mediaUrl}`,
        (width, height) => {
          const scaledHeight = (height / width) * screenWidth
          setMediaHeight(scaledHeight)
          setMediaWidth(screenWidth)
        },
        (error) => {
          console.error("Failed to get image size:", error)
          setMediaHeight(200) // fallback
        }
      )
    }
  }, [feed.mediaUrl, postLoading])

  return (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Image
          style={styles.authorImage}
          resizeMode="contain"
          source={
            postLoading || !feed.author.imageUrl
              ? placeholder
              : { uri: `${baseURL}${feed.author.imageUrl}` }
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
        <Pressable
          style={[styles.imageMediaContainer, { height: mediaHeight }]}
          onPress={() =>
            navigation.navigate("imageViewer", { mediaUrl: feed.mediaUrl })
          }
        >
          <Image
            style={[
              styles.imageMedia,
              { width: mediaWidth, height: mediaHeight },
            ]}
            resizeMode="cover"
            source={
              postLoading
                ? imagePlaceholder
                : { uri: `${baseURL}${feed.mediaUrl}` }
            }
          />
        </Pressable>
      )}
      {feed.mediaUrl && feed.mediaUrl.match(/\.(mp4|webm|ogg)$/i) && (
        <View
          style={styles.videoMediaContainer}
          // onPress={() =>
          //   navigation.navigate("videoViewer", { mediaUrl: feed.mediaUrl })
          // }
        >
          {postLoading ? (
            <Image
              style={styles.videoPlaceholder}
              resizeMode="cover"
              source={videoPlaceholder}
            />
          ) : (
            <VideoView
              style={styles.videoMedia}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
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
    height: "100%",
    resizeMode: "cover",
  },
  videoMedia: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
})

export default FeedCard
