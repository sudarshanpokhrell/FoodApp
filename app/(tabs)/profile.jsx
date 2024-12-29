
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import images from "../../constants/images";

// QuestBox Component
const QuestBox = ({ questTitle, questDescription }) => {
  return (
    <View style={styles.questBox}>
      <Text style={styles.questTitle}>{questTitle}</Text>
      <Text style={styles.questDescription}>{questDescription}</Text>
    </View>
  );
};

// Achievements Component
const Achievements = ({ achievementTitle, achievementDescription, progress }) => {
  return (
    <View style={styles.achievementContainer}>
      <View style={styles.achievementIcon}>
        <Ionicons name="trophy-outline" size={32} color="#FFD700" />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{achievementTitle}</Text>
        <Text style={styles.achievementDescription}>{achievementDescription}</Text>
        <Text style={styles.achievementProgress}>Progress: {progress}%</Text>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <Image source={images.profile} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>Sanjay Malla</Text>
          <Text style={styles.xp}>XP ⚡: 1200</Text>
          <Text style={styles.joined}>Joined: Jan 2024</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="share-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Today's Quests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Quests ❤️</Text>
        <View style={styles.questsContainer}>
          <QuestBox questTitle="Daily Feast" questDescription="Complete 2 orders" />
          <QuestBox questTitle="New Cuisine" questDescription="Try a new restaurant" />
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements 🔥</Text>
        <Achievements
          achievementTitle="Momo Marathon"
          achievementDescription="Order 5 different types"
          progress={7}
        />
        
        <Achievements
          achievementTitle="Spicy Specialist"
          achievementDescription="Complete 10 spicy quests"
          progress={50}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8fc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 25,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    position: "relative",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 35,
    borderColor: "#FFA500",
    borderWidth: 2,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  xp: {
    fontSize: 15,
    color: "#FFA500",
    fontWeight: "800",
    marginVertical: 2,
  },
  joined: {
    fontSize: 15,
    color: "#888",
    fontWeight: "600",
  },
  settingsButton: {
    padding: 10,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  questsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questBox: {
    width: "48%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  questDescription: {
    fontSize: 12,
    color: "#666",
  },
  achievementContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  achievementProgress: {
    fontSize: 12,
    color: "#888",
  },
});


export default ProfileScreen;
