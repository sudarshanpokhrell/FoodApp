import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// import { styled } from "nativewind/styled"; 
// const StyledView = styled(View)
// const StyledText = styled(Text)
// const StyledTextInput = styled(TextInput)
// const StyledTouchableOpacity = styled(TouchableOpacity)
// const StyledSafeAreaView = styled(SafeAreaView)

// Sample country codes data
const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+61', country: 'Australia' },
  // Add more country codes as needed
];

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10}$/;  // Basic validation for 10 digits
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = () => {
    if (validatePhoneNumber()) {
      console.log('Logging in with:', selectedCountry.code + phoneNumber);
      // Add your login logic here
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between p-4"
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Text className="text-base text-gray-800">{item.country}</Text>
      <Text className="text-base text-gray-600">{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold mb-2 text-gray-800">
          Login
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          Please enter your phone number
        </Text>

        <View className="flex-row mb-4">
          <TouchableOpacity
            className="border border-gray-300 p-4 rounded-lg mr-2 justify-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-base text-gray-800">
              {selectedCountry.code}
            </Text>
          </TouchableOpacity>

          <TextInput
            className="flex-1 border border-gray-300 p-4 rounded-lg text-base"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setError('');
            }}
            maxLength={10}
          />
        </View>

        {error ? (
          <Text className="text-red-500 mb-4">{error}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-semibold">
            Continue
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black bg-opacity-50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
              <Text className="text-xl font-bold mb-4 text-center">
                Select Country Code
              </Text>
              
              <FlatList
                data={countryCodes}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.code}
                ItemSeparatorComponent={() => (
                  <View className="h-[1px] bg-gray-200" />
                )}
              />
              
              <TouchableOpacity
                className="mt-4 p-4 bg-gray-100 rounded-lg items-center"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-base text-gray-800">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;