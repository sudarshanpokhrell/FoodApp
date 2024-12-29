import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform,Keyboard } from "react-native";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email:"",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email:"",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      phone: "",
      email:"",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = true;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/; 
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = true;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
      isValid = true;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = true;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = true;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Registration data:", formData);
      router.push("/preferences");
    }
  };

  const InputField = ({ placeholder, value, onChangeText, secureTextEntry, error }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={placeholder === "Phone Number" ? "phone-pad" : "default"}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="light" backgroundColor="#161622" />
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up now to get started with an account</Text>

          <InputField
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => 
              setFormData({ ...formData, fullName: text })
            }
            error={errors.fullName}
          />

          <InputField
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => 
              setFormData({ ...formData, phone: text })
            }
            error={errors.phone}
          />

          <InputField
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => 
              setFormData({ ...formData, email: text })
            }
            error={errors.email}
          />

          <InputField
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => 
              setFormData({ ...formData, password: text })
            }
            secureTextEntry
            error={errors.password}
          />

          <InputField
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            secureTextEntry
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.loginRedirectContainer}>
            <Text style={styles.loginRedirectText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginRedirectLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 8,
    color: "#ffffff",
  },
  inputError: {
    borderColor: "#ff0000",
    borderWidth: 1,
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
  loginRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginRedirectText: {
    color: "#9ca3af",
  },
  loginRedirectLink: {
    color: "#4f46e5",
    fontWeight: "500",
  },
});

export default Form;