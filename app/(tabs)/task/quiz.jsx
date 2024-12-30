import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const questions = [
    {
      question: "Which district in Nepal is famous for Yomari?",
      options: ["Kathmandu", "Bhaktapur", "Lalitpur", "Kavre"],
      correct: 1
    },
    {
      question: "What is the main ingredient in Sel Roti?",
      options: ["Wheat flour", "Rice flour", "Corn flour", "Buckwheat flour"],
      correct: 1
    },
    {
      question: "Which festival is associated with Samay Baji?",
      options: ["Dashain", "Tihar", "Indra Jatra", "Teej"],
      correct: 2
    },
    {
      question: "What type of meat is traditionally used in Thakali cuisine?",
      options: ["Chicken", "Mutton", "Buffalo", "Duck"],
      correct: 1
    },
    {
      question: "Which valley is known for Juju Dhau?",
      options: ["Kathmandu", "Pokhara", "Bhaktapur", "Chitwan"],
      correct: 2
    },
    {
      question: "What is the traditional cooking vessel for Dal Bhat?",
      options: ["Pressure cooker", "Karai", "Tapke", "Dekchi"],
      correct: 3
    },
    {
      question: "Which region is famous for Dhido?",
      options: ["Terai", "Hills", "Mountains", "All of above"],
      correct: 3
    },
    {
      question: "What is the main spice in Gundruk?",
      options: ["None", "Turmeric", "Chili", "Cumin"],
      correct: 0
    },
    {
      question: "Which momo filling is considered traditional?",
      options: ["Chicken", "Buff", "Vegetable", "Paneer"],
      correct: 1
    },
    {
      question: "What drink commonly accompanies Choyla?",
      options: ["Tea", "Lassi", "Local alcohol", "Water"],
      correct: 2
    }
  ];

  useEffect(() => {
    if (!quizEnded && quizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleNextQuestion();
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion, quizEnded, quizStarted]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: timeLeft / 10,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(10);
    setScore(0);
    setCurrentQuestion(0);
    setQuizEnded(false);
  };

  const handleAnswer = (selectedOption) => {
    if (questions[currentQuestion].correct === selectedOption) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setQuizEnded(true);
      showResults();
    }
  };

  const updatePoints = async (score) => {
    try {
      const newPoints = score * 1;
      const currentPoints = await AsyncStorage.getItem('point');
      const totalPoints = currentPoints ? parseInt(currentPoints) + newPoints : newPoints;
      await AsyncStorage.setItem('point', totalPoints.toString());
      return totalPoints;
    } catch (error) {
      console.error('Error updating points:', error);
      return null;
    }
  };

  const showResults = () => {
    const discount = score * 1;
    Alert.alert(
      "Quiz Completed!",
      `You scored ${score} out of 10!\nYou've earned ${discount} coin`,
      [
        {
          text: "Claim Reward",
          onPress: () => {
            console.log("Coin claimed:", discount);
          }
        }
      ]
    );
    updatePoints();
  };





  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.startContainer}>
          <Text style={styles.startTitle}>Food Quiz Challenge</Text>
          <Text style={styles.startDescription}>
            Test your knowledge about Nepali cuisine!{'\n\n'}
            • 10 questions{'\n'}
            • 10 seconds per question{'\n'}
            • Earn up to 100 coin
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={startQuiz}
          >
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (quizEnded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>Your Score: {score}/10</Text>
          <Text style={styles.resultDiscount}>
            You earned {score * 10}% discount!
          </Text>
          <TouchableOpacity
            style={styles.claimButton}
            onPress={() => {
              console.log("Claiming discount");
              router.back();
            }}
          >
            <Text style={styles.claimButtonText}>Claim Your Discount</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.startButton, { marginTop: 20 }]}
            onPress={startQuiz}
          >
            <Text style={styles.startButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.score}>Score: {score}/10</Text>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <Text style={styles.timer}>Time: {timeLeft}s</Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}/10
        </Text>
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9291A',
  },
  backButtonText: {
    fontSize: 16,
    color: '#D9291A',
    fontWeight: '500',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  startDescription: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 16,
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4f46e5',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  resultScore: {
    fontSize: 20,
    marginBottom: 8,
    color: '#4f46e5',
  },
  resultDiscount: {
    fontSize: 18,
    marginBottom: 24,
    color: '#059669',
  },
  claimButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  claimButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Quiz;