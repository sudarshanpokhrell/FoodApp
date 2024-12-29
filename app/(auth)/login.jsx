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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const validateInput = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
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
      console.log(
        "Logging in with:",
        selectedCountry.code + phoneNumber,
        "Password:",
        password
      );
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
            <TouchableOpacity
              style={styles.countryButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.countryButtonText}>
                {selectedCountry.code}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setError("");
              }}
              maxLength={10}
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
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  formWrapper: {
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  countryButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    backgroundColor: "#1f1f1f",
  },
  countryButtonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
  },
  passwordInput: {
    marginTop: 16,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  registerRedirectText: {
    color: "#9ca3af",
  },
  registerRedirectLink: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  countryName: {
    fontSize: 16,
    color: "#1F2937",
  },
  countryCode: {
    fontSize: 16,
    color: "#6B7280",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#1F2937",
  },
});

export default LoginScreen;
