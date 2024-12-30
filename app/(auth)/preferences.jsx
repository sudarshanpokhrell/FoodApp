import React, { useState } from 'react';
import { router } from 'expo-router';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

const foodCategories = [
  { id: 1, name: 'Vegetarian', icon: '🥗' },
  { id: 2, name: 'Non-Vegetarian', icon: '🍖' },
  { id: 3, name: 'Vegan', icon: '🥬' },
  { id: 4, name: 'Gluten-Free', icon: '🌾' },
  { id: 5, name: 'Seafood', icon: '🦐' },
  { id: 6, name: 'Spicy', icon: '🌶️' },
  { id: 7, name: 'Desserts', icon: '🍰' },
  { id: 8, name: 'Fast Food', icon: '🍔' }
];

const cuisineTypes = [
  { id: 1, name: 'Italian', icon: '🍝' },
  { id: 2, name: 'Chinese', icon: '🥢' },
  { id: 3, name: 'Indian', icon: '🍛' },
  { id: 4, name: 'Mexican', icon: '🌮' },
  { id: 5, name: 'Japanese', icon: '🍱' },
  { id: 6, name: 'Thai', icon: '🍜' }
];

const FoodPreferencesModal = ({ visible, onClose, onSave }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCuisine = (cuisineId) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId)
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handleSave = () => {
    
    onSave({
      categories: selectedCategories,
      cuisines: selectedCuisines
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set Your Food Preferences</Text>
          <Text style={styles.subtitle}>
            Help us personalize your food recommendations
          </Text>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Food Categories</Text>
            <View style={styles.optionsContainer}>
              {foodCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.optionButton,
                    selectedCategories.includes(category.id) && styles.selectedOption
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <Text style={styles.optionIcon}>{category.icon}</Text>
                  <Text style={styles.optionText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Favorite Cuisines</Text>
            <View style={styles.optionsContainer}>
              {cuisineTypes.map((cuisine) => (
                <TouchableOpacity
                  key={cuisine.id}
                  style={[
                    styles.optionButton,
                    selectedCuisines.includes(cuisine.id) && styles.selectedOption
                  ]}
                  onPress={() => toggleCuisine(cuisine.id)}
                >
                  <Text style={styles.optionIcon}>{cuisine.icon}</Text>
                  <Text style={styles.optionText}>{cuisine.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.skipButton}
             onPress={() => router.push("/home")}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  skipButton: {
    padding: 15,
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#f5f5f5',
  },
  skipButtonText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#2196f3',
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FoodPreferencesModal;