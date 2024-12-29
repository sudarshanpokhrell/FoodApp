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
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const countryCodes = [
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
];

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const validateInput = () => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (!phoneRegex.test(phoneNumber) && !emailRegex.test(phoneNumber)) {
      setError("Please enter a valid email or phone number");
      return false;
    }
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
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
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.country}</Text>
        <Text style={styles.countryCode}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#FF5722" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        <View style={styles.headerImage}>
          <Image
            source={{ uri: "https://via.placeholder.com/400x200" }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <MaterialIcons name="restaurant-menu" size={60} color="#fff" />
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>Sign in to continue</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formWrapper}>
            <Text style={styles.sectionTitle}>Login Details</Text>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.countryButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.countryButtonText}>
                  {selectedCountry.code}
                </Text>
              </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter email or phone number"
              keyboardType="default"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setError("");
              }}
              maxLength={10}
            />
          </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.registerRedirectContainer}>
              <Text style={styles.registerRedirectText}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerRedirectLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={countryCodes}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerImage: {
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  headerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
  },
  formWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
    height: 56, // Fixed height for input container
  },
  passwordContainer: {
    marginBottom: 16,
    height: 56, // Fixed height for password container
  },
  countryButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%", // Match parent height
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  countryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    height: "100%", // Match parent height
  },
  passwordInput: {
    marginBottom: 0,
  },
  errorText: {
    color: "#FF5722",
    fontSize: 14,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#FF5722",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    height: 56, // Fixed height for button
  },
  loginButton: {
    backgroundColor: "#FF5722",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
    fontSize: 14,
  },
  registerRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerRedirectText: {
    color: "#666",
    fontSize: 14,
  },
  registerRedirectLink: {
    color: "#FF5722",
    fontWeight: "500",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  countryItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  countryInfo: {
    marginLeft: 16,
  },
  countryName: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  countryCode: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});

export default LoginScreen;