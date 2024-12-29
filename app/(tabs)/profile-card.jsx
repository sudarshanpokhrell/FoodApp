import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AchievementCard = () => {
  // Sample user data - replace with actual user data
  const userData = {
    username: "FoodieNinja",
    joinDate: "December 2023",
    profileImage: null, // Add default profile image path
    achievements: [
      {
        id: 1,
        title: "Momo Master",
        icon: "🏆",
        description: "Tried 10 different types of momos"
      },
      {
        id: 2,
        title: "Dal Bhat Power",
        icon: "⚡",
        description: "Ordered Dal Bhat 20 times"
      },
      {
        id: 3,
        title: "Newari Expert",
        icon: "🎯",
        description: "Explored all Newari cuisines"
      },
      {
        id: 4,
        title: "Festival Foodie",
        icon: "🎉",
        description: "Completed all festival challenges"
      }
    ]
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my achievements on FoodieApp!\n
        Username: ${userData.username}\n
        Total Badges: ${userData.achievements.length}\n
        Member since: ${userData.joinDate}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              {userData.profileImage ? (
                <Image
                  source={{ uri: userData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.defaultProfile}>
                  <Text style={styles.defaultProfileText}>
                    {userData.username.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userData.username}</Text>
              <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
            </View>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <MaterialCommunityIcons name="share-variant" size={24} color="#4f46e5" />
            </TouchableOpacity>
          </View>

          {/* Achievements Section */}
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {userData.achievements.map((achievement) => (
              <TouchableOpacity 
                key={achievement.id}
                style={styles.achievementItem}
              >
                <View style={styles.achievementBadge}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  defaultProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultProfileText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  joinDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  shareButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f1f1f',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  achievementBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: '#1f1f1f',
  },
  achievementDesc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});

export default AchievementCard;