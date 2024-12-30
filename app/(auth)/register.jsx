import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import FormComponent from "./FormComponent";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
  primary: "#FF6347",
  secondary: "#FFA07A",
  accent: "#FFE4E1",
  text: "#4A4A4A",
  textLight: "#6B7280",
  white: "#FFFFFF",
  error: "#FF3B30",
};

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "sudarshan",
    phone: "9786535412",
    email: "email@gmail.com",
    password: "helloworld",
    confirmPassword: "helloworld",
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

  const handleRegister = async () => {
    if (validateForm()) {
      console.log("Registration data:", formData);
      try {
        const response = await axios.post('http://192.168.16.75:3000/api/v1/user/register', {
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email,
          password: formData.password,
        },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );


        if (response.status === 200) {
          await AsyncStorage.setItem('user',JSON.stringify(response.data));
          router.push("/preferences");
        }
      }
      catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Error response:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Network error:', error.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
      }

    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            {/* Decorative Element */}
            <View style={styles.decorativeElement} />

            <View style={styles.formWrapper}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up now to get started with an account</Text>

              <FormComponent
                formData={formData}
                setFormData={setFormData}
                errors={errors} style={styles.formWrapper}
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
    backgroundColor: COLORS.white,
  },
  formWrapper: {
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    position: 'relative',
  },
  decorativeElement: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: COLORS.accent,
    borderBottomLeftRadius: 100,
    opacity: 0.5,
  },
  formWrapper: {
    marginTop: 32,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    color: COLORS.text,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 24,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  loginRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginRedirectText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
  loginRedirectLink: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Register;