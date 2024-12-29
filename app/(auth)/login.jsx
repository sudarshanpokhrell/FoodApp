import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const countryCodes = [
  { code: "+977", country: "Nepal" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+61", country: "Australia" },
];

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      setError("Please enter a valid email or phone number");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = () => {
    if (validateInput()) {
      const formattedIdentifier =
        /^\d{10}$/.test(identifier) && selectedCountry.code
          ? `${selectedCountry.code}${identifier}`
          : identifier;

      console.log("Logging in with:", formattedIdentifier, "Password:", password);
      router.push("/home");
    }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.countryName}>{item.country}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#161622" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.inputContainer}>
            {/^\d{10}$/.test(identifier) && (
              <TouchableOpacity
                style={styles.countryButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.countryButtonText}>
                  {selectedCountry.code}
                </Text>
              </TouchableOpacity>
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter email or phone number"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                setError("");
              }}
            />
          </View>

          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.registerRedirectContainer}>
            <Text style={styles.registerRedirectText}>
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.registerRedirectLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Country Code</Text>

              <FlatList
                data={countryCodes}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.code}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Keep all styles unchanged
});

export default LoginScreen;
