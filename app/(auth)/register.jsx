import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import FormComponent from "./FormComponent";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#161622" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.formWrapper}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up now to get started with an account</Text>

              <FormComponent
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />

              <TouchableOpacity onPress={handleRegister} style={styles.button}>
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
        </TouchableWithoutFeedback>
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

export default Register;
