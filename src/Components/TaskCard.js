import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Alert, View } from "react-native"
import { StyleSheet, Text } from "react-native"

const TaskCard = ({ item, deleteTask, navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusBar,
          { backgroundColor: item.completed ? "#4CAF50" : "#FF9800" },
        ]}
      />
      <View style={[styles.detailContainer]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: item.completed ? "#E8F5E8" : "#FFF3E0" },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: item.completed ? "#4CAF50" : "#FF9800" },
              ]}
            >
              {item.completed ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.deleteBtn}>
        <MaterialCommunityIcons
          name="delete"
          size={25}
          color="#F44336"
          onPress={() =>
            Alert.alert(
              "Delete task",
              "are you sure you want to delete this task?",
              [
                { text: "cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => deleteTask(item._id),
                },
              ]
            )
          }
        />
        <MaterialCommunityIcons
          name="pencil"
          size={25}
          color="#2196F3"
          onPress={() => navigation.navigate("editTask", { item })}
        />
      </View>
    </View>
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
    paddingTop: 10,
    gap: 15,
  },
  description: {
    marginLeft: 8,
  },
  statusBar: {
    width: 5,
    height: "90%",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  statusContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 15,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default TaskCard
// import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { View } from "react-native"
// import { StyleSheet, Text, TouchableOpacity } from "react-native"

// const TaskCard = ({ item, deleteTask, editTask }) => {
//   // Get status color and display text based on your backend model
//   const getStatusInfo = (status) => {
//     switch (status) {
//       case "completed":
//         return { color: "#4CAF50", text: "Completed", bgColor: "#E8F5E8" }
//       case "in-progress":
//         return { color: "#2196F3", text: "In Progress", bgColor: "#E3F2FD" }
//       case "pending":
//       default:
//         return { color: "#FF9800", text: "Pending", bgColor: "#FFF3E0" }
//     }
//   }

//   // Get priority color and display text
//   const getPriorityInfo = (priority) => {
//     switch (priority) {
//       case "high":
//         return { color: "#D32F2F", bgColor: "#FFEBEE" }
//       case "medium":
//         return { color: "#F57C00", bgColor: "#FFF3E0" }
//       case "low":
//       default:
//         return { color: "#388E3C", bgColor: "#E8F5E8" }
//     }
//   }

//   const statusInfo = getStatusInfo(item.status)
//   const priorityInfo = getPriorityInfo(item.priority)

//   return (
//     <TouchableOpacity style={styles.container}>
//       {/* Status Indicator */}
//       <View
//         style={[styles.statusIndicator, { backgroundColor: statusInfo.color }]}
//       />

//       <View style={styles.detailContainer}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>{item.title}</Text>
//           <View
//             style={[
//               styles.statusBadge,
//               { backgroundColor: statusInfo.bgColor },
//             ]}
//           >
//             <Text style={[styles.statusText, { color: statusInfo.color }]}>
//               {statusInfo.text}
//             </Text>
//           </View>
//         </View>

//         {item.description && (
//           <Text style={styles.description}>{item.description}</Text>
//         )}

//         {/* Additional Info Row */}
//         <View style={styles.infoRow}>
//           {/* Priority Badge */}
//           {item.priority && (
//             <View
//               style={[
//                 styles.priorityBadge,
//                 { backgroundColor: priorityInfo.bgColor },
//               ]}
//             >
//               <MaterialCommunityIcons
//                 name={
//                   item.priority === "high"
//                     ? "alert-circle"
//                     : item.priority === "medium"
//                     ? "information"
//                     : "minus-circle"
//                 }
//                 size={14}
//                 color={priorityInfo.color}
//               />
//               <Text
//                 style={[styles.priorityText, { color: priorityInfo.color }]}
//               >
//                 {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
//               </Text>
//             </View>
//           )}

//           {/* Due Date */}
//           {item.dueDate && (
//             <View style={styles.dateBadge}>
//               <MaterialCommunityIcons name="calendar" size={14} color="#666" />
//               <Text style={styles.dateText}>
//                 {new Date(item.dueDate).toLocaleDateString()}
//               </Text>
//             </View>
//           )}

//           {/* Created Date */}
//           <View style={styles.dateBadge}>
//             <MaterialCommunityIcons
//               name="clock-outline"
//               size={14}
//               color="#666"
//             />
//             <Text style={styles.dateText}>
//               {new Date(item.createdAt).toLocaleDateString()}
//             </Text>
//           </View>
//         </View>

//         {/* Tags */}
//         {item.tags && item.tags.length > 0 && (
//           <View style={styles.tagsContainer}>
//             {item.tags.slice(0, 3).map((tag, index) => (
//               <View key={index} style={styles.tag}>
//                 <Text style={styles.tagText}>#{tag}</Text>
//               </View>
//             ))}
//             {item.tags.length > 3 && (
//               <Text style={styles.moreTags}>+{item.tags.length - 3} more</Text>
//             )}
//           </View>
//         )}
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionsContainer}>
//         <TouchableOpacity style={styles.editBtn} onPress={() => editTask(item)}>
//           <MaterialCommunityIcons name="pencil" size={20} color="#2196F3" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.deleteBtn}
//           onPress={() => deleteTask(item._id)}
//         >
//           <MaterialCommunityIcons name="delete" size={20} color="#F44336" />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     marginVertical: 6,
//     marginHorizontal: 12,
//     borderRadius: 16,
//     paddingVertical: 16,
//     paddingLeft: 12,
//     paddingRight: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: "#2196F3",
//   },
//   statusIndicator: {
//     width: 4,
//     height: "80%",
//     borderRadius: 2,
//     marginRight: 12,
//   },
//   detailContainer: {
//     flex: 1,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 6,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//     flex: 1,
//     marginRight: 8,
//     color: "#2D3748",
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     minWidth: 80,
//     alignItems: "center",
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   description: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 8,
//     lineHeight: 18,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: 8,
//     marginBottom: 6,
//   },
//   priorityBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     gap: 4,
//   },
//   priorityText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   dateBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7FAFC",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     gap: 4,
//   },
//   dateText: {
//     fontSize: 12,
//     color: "#4A5568",
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: 6,
//   },
//   tag: {
//     backgroundColor: "#EDF2F7",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   tagText: {
//     fontSize: 11,
//     color: "#4A5568",
//     fontWeight: "500",
//   },
//   moreTags: {
//     fontSize: 11,
//     color: "#718096",
//     fontStyle: "italic",
//   },
//   actionsContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 8,
//     marginLeft: 8,
//   },
//   editBtn: {
//     padding: 6,
//     borderRadius: 8,
//     backgroundColor: "#E3F2FD",
//   },
//   deleteBtn: {
//     padding: 6,
//     borderRadius: 8,
//     backgroundColor: "#FFEBEE",
//   },
// })

// export default TaskCard
