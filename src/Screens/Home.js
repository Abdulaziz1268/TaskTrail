// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   StatusBar,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   Dimensions,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"

// const { width } = Dimensions.get("window")

// const Home = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           {/* Header Section */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Welcome to TaskTrail</Text>
//             <Text style={styles.subtitle}>
//               Your journey starts here. Sign in or create an account to get
//               started.
//             </Text>
//           </View>

//           {/* Illustration Section */}
//           <View style={styles.illustrationContainer}>
//             <Image
//               // source={{
//               //   uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=826&t=st=1709843903~exp=1709844503~hmac=57b6cba0c2c8b5b7c5e29746b5d5c5c5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5",
//               // }}
//               source={require("../../assets/loginImage.avif")}
//               style={styles.illustration}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Action Buttons Section */}
//           <View style={styles.actionsContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.primaryButton]}
//               onPress={() => navigation.navigate("login")}
//               activeOpacity={0.8}
//             >
//               <Ionicons name="log-in" size={22} color="#fff" />
//               <Text style={styles.primaryButtonText}>Sign In</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.secondaryButton]}
//               onPress={() => navigation.navigate("verification")}
//               activeOpacity={0.8}
//             >
//               <Ionicons name="person-add" size={22} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Create Account</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Features Section */}
//           <View style={styles.featuresContainer}>
//             <Text style={styles.featuresTitle}>Why Choose Us?</Text>

//             <View style={styles.featureItem}>
//               <View style={styles.featureIcon}>
//                 <Ionicons name="shield-checkmark" size={24} color="#007AFF" />
//               </View>
//               <View style={styles.featureText}>
//                 <Text style={styles.featureTitle}>Secure</Text>
//                 <Text style={styles.featureDescription}>
//                   Your data is protected with industry-standard encryption
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.featureItem}>
//               <View style={styles.featureIcon}>
//                 <Ionicons name="flash" size={24} color="#007AFF" />
//               </View>
//               <View style={styles.featureText}>
//                 <Text style={styles.featureTitle}>Fast</Text>
//                 <Text style={styles.featureDescription}>
//                   Lightning-fast performance for seamless experience
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.featureItem}>
//               <View style={styles.featureIcon}>
//                 <Ionicons name="phone-portrait" size={24} color="#007AFF" />
//               </View>
//               <View style={styles.featureText}>
//                 <Text style={styles.featureTitle}>Responsive</Text>
//                 <Text style={styles.featureDescription}>
//                   Works perfectly on all your devices
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 24 : 24,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     lineHeight: 22,
//   },
//   illustrationContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   illustration: {
//     width: width * 0.8,
//     height: 250,
//   },
//   actionsContainer: {
//     marginBottom: 48,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#007AFF",
//   },
//   primaryButton: {
//     backgroundColor: "#007AFF",
//   },
//   secondaryButton: {
//     backgroundColor: "transparent",
//   },
//   primaryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   secondaryButtonText: {
//     color: "#007AFF",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   featuresContainer: {
//     marginBottom: 24,
//   },
//   featuresTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 24,
//     textAlign: "center",
//   },
//   featureItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 24,
//   },
//   featureIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#E6F2FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 16,
//   },
//   featureText: {
//     flex: 1,
//   },
//   featureTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   featureDescription: {
//     fontSize: 14,
//     color: "#666",
//     lineHeight: 20,
//   },
// })

// export default Home
import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  FlatList,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

const Home = () => {
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef(null)
  const [showSignIn, setShowSignIn] = useState(false)

  const features = [
    {
      id: "1",
      title: "Secure",
      description: "Your data is protected with industry-standard encryption",
      icon: "shield-checkmark",
      image:
        "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg",
    },
    {
      id: "2",
      title: "Fast",
      description: "Lightning-fast performance for seamless experience",
      icon: "flash",
      image:
        "https://img.freepik.com/free-vector/speed-concept-illustration_114360-2928.jpg",
    },
    {
      id: "3",
      title: "Responsive",
      description: "Works perfectly on all your devices",
      icon: "phone-portrait",
      image:
        "https://img.freepik.com/free-vector/responsive-design-concept-illustration_114360-4770.jpg",
    },
  ]

  // Auto-scroll carousel
  useEffect(() => {
    let interval

    if (flatListRef.current && !showSignIn) {
      interval = setInterval(() => {
        if (flatListRef.current) {
          const newIndex =
            currentIndex < features.length - 1 ? currentIndex + 1 : 0
          flatListRef.current.scrollToIndex({
            index: newIndex,
            animated: true,
          })
        }
      }, 3000) // Change slide every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentIndex, showSignIn])

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  )

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  const renderFeatureItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.image }}
          style={styles.featureImage}
          resizeMode="contain"
        />
        <View style={styles.featureContent}>
          <View style={styles.featureIconContainer}>
            <Ionicons name={item.icon} size={32} color="#007AFF" />
          </View>
          <Text style={styles.featureTitle}>{item.title}</Text>
          <Text style={styles.featureDescription}>{item.description}</Text>
        </View>
      </View>
    )
  }

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    )
  }

  if (!showSignIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={features}
            renderItem={renderFeatureItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            scrollEventThrottle={16}
            onScrollToIndexFailed={() => {}} // Add empty fallback
          />
          {renderPagination()}

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => setShowSignIn(true)}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to TaskTrail</Text>
            <Text style={styles.subtitle}>
              Your journey starts here. Sign in or create an account to get
              started.
            </Text>
          </View>

          {/* Illustration Section */}
          <View style={styles.illustrationContainer}>
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg",
              }}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Action Buttons Section */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate("login")}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in" size={22} color="#fff" />
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate("verification")}
              activeOpacity={0.8}
            >
              <Ionicons name="person-add" size={22} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 24 : 24,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  featureImage: {
    width: width * 0.7,
    height: 250,
    marginBottom: 30,
  },
  featureContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E6F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#007AFF",
    width: 12,
  },
  skipButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
    right: 20,
    padding: 10,
  },
  skipButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  illustration: {
    width: width * 0.8,
    height: 250,
  },
  actionsContainer: {
    marginBottom: 48,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default Home
