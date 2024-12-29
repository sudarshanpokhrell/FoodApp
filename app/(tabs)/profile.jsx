import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <Ionicons name="person-circle-outline" size={70} color="#ccc" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>Sanjay</Text>
          <Text style={styles.xp}>XP ⚡: 1200</Text>
          <Text style={styles.joined}>Joined: Jan 2024</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Today's Quests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Quests</Text>
        <View style={styles.questsContainer}>
          <View style={styles.questBox}>
            <Text style={styles.questTitle}>Daily Feast</Text>
            <Text style={styles.questDescription}>Complete 2 orders</Text>
          </View>
          <View style={styles.questBox}>
            <Text style={styles.questTitle}>New Cuisine</Text>
            <Text style={styles.questDescription}>Try a new restaurant</Text>
          </View>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementContainer}>
          <View style={styles.achievementIcon}>
            <Ionicons name="trophy-outline" size={32} color="#FFD700" />
          </View>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Momo Marathon</Text>
            <Text style={styles.achievementDescription}>
              Order 5 different types
            </Text>
            <Text style={styles.achievementProgress}>Progress: 7%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8fc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  xp: {
    fontSize: 14,
    color: "#FFA500",
    marginVertical: 2,
  },
  joined: {
    fontSize: 12,
    color: "#888",
  },
  settingsButton: {
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
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
