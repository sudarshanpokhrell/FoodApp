import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.xp}>XP ⚡: 1200</Text>
          <Text style={styles.joined}>Joined: Jan 2024</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Quests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Quests</Text>
        <View style={styles.questsContainer}>
          <View style={styles.questBox} />
          <View style={styles.questBox} />
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementContainer}>
          <View style={styles.achievementIcon} />
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>Momo Marathon</Text>
            <Text style={styles.achievementDescription}>Order 5 different types</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  xp: {
    fontSize: 14,
    color: '#FFA500',
  },
  joined: {
    fontSize: 12,
    color: '#888',
  },
  settingsButton: {
    padding: 10,
  },
  settingsText: {
    fontSize: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questBox: {
    width: '48%',
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  achievementInfo: {
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#555',
  },
  achievementProgress: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProfileScreen;
