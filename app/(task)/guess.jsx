import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from 'react-native';

const NumberQuestGame = () => {
  const [lives, setLives] = useState(3);
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState('');
  const [attemptsToday, setAttemptsToday] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    setTargetNumber(random);
  };

  const handleSubmit = () => {
    if (guess.length !== 4) {
      Alert.alert('Invalid Input', 'Please enter a 4-digit number');
      return;
    }

    if (guess === targetNumber) {
      Alert.alert(
        'Congratulations!', 
        'You won! Here\'s your 100% off coupon!',
        [{ text: 'OK', onPress: resetGame }]
      );
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives === 0) {
        setGameOver(true);
        setAttemptsToday(attemptsToday + 1);
        
        if (attemptsToday >= 2) {
          Alert.alert(
            'Game Over',
            'No more tries today. Come back tomorrow!',
            [{ text: 'OK', onPress: resetGame }]
          );
        } else {
          Alert.alert(
            'Game Over',
            'Try again tommrow',
            [{ text: 'Retry', onPress: resetGame }]
          );
        }
      }
    }
    setGuess('');
  };

  const resetGame = () => {
    if (attemptsToday < 3) {
      setLives(3);
      setGuess('');
      setGameOver(false);
      generateNewNumber();
    }
  };

  const renderHearts = () => {
    return Array(lives)
      .fill('♦')
      .map((heart, index) => (
        <Text key={index} style={styles.heart}>
          {heart}
        </Text>
      ));
  };

  const renderNumberBlocks = () => {
   
    return (
      <View key={index} style={styles.numberBlock}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
)
  };

  const renderInputBlocks = () => {
    const blocks = Array(4).fill('');
    return blocks.map((_, index) => (
      <View key={index} style={styles.inputBlock}>
        <Text style={styles.inputText}>
          {guess[index] || '_'}
        </Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Quest</Text>
        
        <View style={styles.heartsContainer}>
          {renderHearts()}
        </View>
        
        <View style={styles.gameContainer}>
          <Text style={styles.instructions}>
            Guess the last 4 digit numbers
          </Text>
          <Text style={styles.subInstructions}>
            Get 100% off on fast food you like
          </Text>
          
          <View style={styles.inputContainer}>
            {renderInputBlocks()}
            <TextInput
              style={styles.hiddenInput}
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              maxLength={4}
              editable={!gameOver}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.button, gameOver && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={gameOver}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          
          {gameOver && attemptsToday < 3 && (
            <TouchableOpacity 
              style={styles.button}
              onPress={resetGame}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heart: {
    fontSize: 24,
    color: 'red',
    marginHorizontal: 5,
  },
  gameContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 20,
    paddingTop:20,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  subInstructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  numbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  numberBlock: {
    width: 40,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  inputBlock: {
    width: 40,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  inputText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NumberQuestGame;