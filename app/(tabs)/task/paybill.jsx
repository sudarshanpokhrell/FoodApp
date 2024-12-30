import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

const ANIMATION_DURATION = 1000;
const MIN_PLAYERS = 1;

export default function BillRoulettePage() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [rouletteResult, setRouletteResult] = useState(null);
  const spinAnimation = new Animated.Value(0);

  const validateInputs = useCallback(() => {
    if (players.length < MIN_PLAYERS) {
      Alert.alert('Error', 'Please add at least one player');
      return false;
    }
    
    const amount = parseFloat(billAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid bill amount');
      return false;
    }
    
    return true;
  }, [players.length, billAmount]);

  const handleAddPlayer = useCallback(() => {
    const trimmedName = newPlayer.trim();
    if (!trimmedName) {
      Alert.alert('Error', 'Please enter a player name');
      return;
    }
    
    if (players.includes(trimmedName)) {
      Alert.alert('Error', 'This player is already added');
      return;
    }

    setPlayers(currentPlayers => [...currentPlayers, trimmedName]);
    setNewPlayer('');
    Keyboard.dismiss();
  }, [newPlayer, players]);

  const handleRemovePlayer = useCallback((index) => {
    setPlayers(currentPlayers => currentPlayers.filter((_, i) => i !== index));
  }, []);

  const generateRandomPayments = useCallback((total, numPlayers) => {
    const payments = Array(numPlayers).fill(0);
    let remaining = total;

    for (let i = 0; i < numPlayers - 1; i++) {
      const maxPayment = remaining * (1 - (numPlayers - i - 1) / (numPlayers - i));
      const payment = Math.random() * maxPayment;
      payments[i] = parseFloat(payment.toFixed(2));
      remaining -= payments[i];
    }
    
    payments[numPlayers - 1] = parseFloat(remaining.toFixed(2));
    
    return payments;
  }, []);

  const handleSpinRoulette = useCallback(() => {
    if (!validateInputs()) return;

    const amount = parseFloat(billAmount);
    
    Animated.timing(spinAnimation, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      const isRandomSplit = Math.random() < 0.5;
      const result = isRandomSplit
        ? {
            type: 'random',
            payments: generateRandomPayments(amount, players.length),
            totalAmount: amount,
          }
        : {
            type: 'individual',
            winner: players[Math.floor(Math.random() * players.length)],
            amount: amount,
          };

      setRouletteResult(result);
      spinAnimation.setValue(0);
    });
  }, [billAmount, players, validateInputs, generateRandomPayments]);

  const renderPlayer = useCallback(({ item, index }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerName}>{item}</Text>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => handleRemovePlayer(index)}
      >
        <MaterialIcons name="remove-circle" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  ), [handleRemovePlayer]);

  const renderResult = () => {
    if (!rouletteResult) return null;

    return (
      <View style={styles.resultContainer}>
        {rouletteResult.type === 'individual' ? (
          <>
            <Text style={styles.resultTitle}>{rouletteResult.winner} pays the bill!</Text>
            <Text style={styles.resultText}>Total amount: Rs.{rouletteResult.amount.toFixed(2)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.resultTitle}>Random Split Result</Text>
            {players.map((player, index) => (
              <Text key={index} style={styles.resultText}>
                {player}: Rs.{rouletteResult.payments[index]}
              </Text>
            ))}
            <Text style={[styles.resultText, styles.totalText]}>
              Total: Rs.{rouletteResult.totalAmount.toFixed(2)}
            </Text>
          </>
        )}
      </View>
    );
  };

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Bill Roulette</Text>
        <Text style={styles.subtitle}>Who's paying today?</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter player name"
          value={newPlayer}
          onChangeText={setNewPlayer}
          onSubmitEditing={handleAddPlayer}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
          <MaterialIcons name="person-add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(_, index) => index.toString()}
        style={styles.playerList}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Add players to get started</Text>
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Enter bill amount (Rs.)"
        value={billAmount}
        onChangeText={setBillAmount}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity 
        style={[styles.spinButton, players.length === 0 && styles.spinButtonDisabled]} 
        onPress={handleSpinRoulette}
        disabled={players.length === 0}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MaterialIcons name="casino" size={24} color="white" />
        </Animated.View>
        <Text style={styles.spinButtonText}>Spin the Roulette</Text>
      </TouchableOpacity>

      {renderResult()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playerList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#95A5A6',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  playerName: {
    fontSize: 16,
    color: '#2C3E50',
  },
  removeButton: {
    padding: 4,
  },
  spinButton: {
    backgroundColor: '#FF6347',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  spinButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  spinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 4,
  },
  totalText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});