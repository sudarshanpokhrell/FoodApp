import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingPoll = ({ isVisible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [polls, setPolls] = useState([
    { id: 1, dish: 'Pizza', votes: 100, hasVoted: false },
    { id: 2, dish: 'Chicken Burger', votes: 50, hasVoted: false },
    { id: 3, dish: 'Daal bhat', votes: 9, hasVoted: false }
  ]);

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isVisible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleVote = (id) => {
    setPolls(polls.map(poll => 
      poll.id === id && !poll.hasVoted 
        ? { ...poll, votes: poll.votes + 1, hasVoted: true }
        : poll
    ));
  };

  const totalVotes = polls.reduce((sum, poll) => sum + poll.votes, 0);

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.container,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }]
                }
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>Weekly's Food Poll</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {polls.map(poll => (
                <View key={poll.id} style={styles.pollItem}>
                  <View style={styles.pollHeader}>
                    <Text style={styles.dishName}>{poll.dish}</Text>
                    <TouchableOpacity 
                      onPress={() => handleVote(poll.id)}
                      disabled={poll.hasVoted}
                      style={[
                        styles.voteButton,
                        poll.hasVoted && styles.votedButton
                      ]}
                    >
                      <Ionicons 
                        name={poll.hasVoted ? "checkmark" : "thumbs-up"} 
                        size={16} 
                        color="white" 
                      />
                      <Text style={styles.voteText}> {poll.votes}</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.progressBg}>
                    <Animated.View 
                      style={[
                        styles.progressFill,
                        { width: `${(poll.votes / totalVotes) * 100}%` }
                      ]}
                    />
                  </View>
                </View>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  pollItem: {
    marginBottom: 20,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '500',
  },
  voteButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  votedButton: {
    backgroundColor: '#34C759',
  },
  voteText: {
    color: 'white',
    marginLeft: 4,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
});

export default FloatingPoll;