import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, error }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={placeholder === "Phone Number" ? "phone-pad" : "default"}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const FormComponent = ({ formData, setFormData, errors }) => {
  return (
    <>
      <InputField
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        error={errors.fullName}
      />

      <InputField
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        error={errors.phone}
      />

      <InputField
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        error={errors.email}
      />

      <InputField
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        error={errors.password}
      />

      <InputField
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
        error={errors.confirmPassword}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default FormComponent;