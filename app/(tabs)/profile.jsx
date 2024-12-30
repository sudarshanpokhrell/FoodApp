import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import images from "../../constants/images";

// QuestBox Component with Progress Bar
const QuestBox = ({
  questTitle,
  questDescription,
  progress,
  reward,
  timeLeft,
}) => {
  return (
    <View style={styles.questBox}>
      <View style={styles.questHeader}>
        <MaterialCommunityIcons name="sword-cross" size={24} color="#FFA500" />
        <Text style={styles.questReward}>+{reward} XP</Text>
      </View>
      <Text style={styles.questTitle}>{questTitle}</Text>
      <Text style={styles.questDescription}>{questDescription}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.timeLeft}>{timeLeft}</Text>
    </View>
  );
};

// Achievements Component with Animation
const Achievements = ({
  taskName,
  taskDescription,
  progress,
  xpReward,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.achievementContainer}>
      <View
        style={[
          styles.achievementIcon,
          { backgroundColor: progress === 100 ? "#FFE5B4" : "#f9f9f9" },
        ]}
      >
        <Ionicons
          name={icon}
          size={32}
          color={progress === 100 ? "#FFD700" : "#FFA500"}
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{taskName}</Text>
        <Text style={styles.achievementDescription}>{taskDescription}</Text>
        <View style={styles.achievementProgressContainer}>
          <View style={styles.achievementProgressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
        <View style={styles.rewardContainer}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={16}
            color="#FFA500"
          />
          <Text style={styles.achievementXP}>{xpReward} XP</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/background.png")}
          style={styles.headerBackground}
        />

        <View style={styles.profileContent}>
          <View style={styles.profilePicture}>
            <Image source={images.profile} style={styles.profileImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>Sanjay Malla</Text>
            <Text style={styles.xp}> 1200 XP ⚡</Text>
            <Text style={styles.joined}>Foodie since Jan 2024</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Quests ❤️</Text>
          <MaterialCommunityIcons name="sword" size={24} color="#333" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.questsScroll}
        >
          <QuestBox
            questTitle="Daily Feast"
            questDescription="Complete 2 orders today"
            progress={75}
            reward={50}
            timeLeft="2h remaining"
          />
          <QuestBox
            questTitle="New Cuisine"
            questDescription="Try a new restaurant"
            progress={0}
            reward={100}
            timeLeft="12h remaining"
          />
          <QuestBox
            questTitle="Social Foodie"
            questDescription="Share 3 food reviews"
            progress={30}
            reward={75}
            timeLeft="5h remaining"
          />
        </ScrollView>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Achievements 🔥</Text>
          <MaterialCommunityIcons name="trophy" size={24} color="#333" />
        </View>
        <Achievements
          taskName="Momo Master"
          taskDescription="Order 5 different types of momo"
          progress={80}
          xpReward={100}
          icon="restaurant"
        />
        <Achievements
          taskName="Review King"
          taskDescription="Write 10 detailed reviews"
          progress={100}
          xpReward={150}
          icon="star"
        />
        <Achievements
          taskName="Explorer"
          taskDescription="Try 5 new restaurants"
          progress={40}
          xpReward={200}
          icon="compass"
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
    height: 200,
    position: 'relative',
    borderRadius: 50,
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 30,

  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  profilePicture: {
    position: "relative",
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "#FFF",
    borderWidth: 3,
  },
 
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF", // White color for the name for better contrast
    marginBottom: 8, // Added spacing for readability
  },
  xp: {
    fontSize: 18,
    color: "#FFD700", // Gold color for XP to make it stand out
    fontWeight: "bold",
    marginVertical: 4,
  },
  joined: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  shareButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  questsScroll: {
    marginLeft: -20,
    paddingHorizontal: 20,
  },
  questBox: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  questHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  questReward: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  questTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  questDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA500",
    borderRadius: 3,
  },
  timeLeft: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },

  // Achievement styles
  achievementContainer: {
    height: 140,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  achievementIcon: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },

  achievementTitle:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  achievementDescription:{
    color: "#666",
    marginBottom: 5,
  },
  achievementProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  achievementProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFA500",
    borderRadius: 2,
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  achievementXP: {
    fontSize: 14,
    color: "#FFA500",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ProfileScreen;
