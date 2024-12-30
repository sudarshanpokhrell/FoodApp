import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Credit = () => {
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [isOldEnough, setIsOldEnough] = useState(false);
  const [isBankConnected, setIsBankConnected] = useState(false);
  const [hasMinOrder, setHasMinOrder] = useState(false);

  const allRequirementsMet = isKycVerified && isOldEnough && isBankConnected && hasMinOrder;

  const Requirement = ({ title, isChecked, onToggle }) => (
    <TouchableOpacity 
      onPress={onToggle}
      style={[styles.requirement, isChecked && styles.checked]}
    >
      <Text style={styles.requirementText}>
        {isChecked ? '✓ ' : '○ '}{title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Get 2000xp and buy Food on credit</Text>
        
        <View style={styles.requirementsContainer}>
          <Text style={styles.subheader}>Requirements</Text>
          
          <Requirement
            title="KYC Verified"
            isChecked={isKycVerified}
            onToggle={() => setIsKycVerified(!isKycVerified)}
          />
          <Requirement
            title="15 days old account"
            isChecked={isOldEnough}
            onToggle={() => setIsOldEnough(!isOldEnough)}
          />
          <Requirement
            title="Connect to bank or wallet in our app"
            isChecked={isBankConnected}
            onToggle={() => setIsBankConnected(!isBankConnected)}
          />
          <Requirement
            title="Min. 10 order in a month"
            isChecked={hasMinOrder}
            onToggle={() => setHasMinOrder(!hasMinOrder)}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !allRequirementsMet && styles.buttonDisabled]}
          disabled={!allRequirementsMet}
        >
          <Text style={[styles.buttonText, !allRequirementsMet && styles.buttonTextDisabled]}>
            Get Credit
          </Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  requirementsContainer: {
    marginBottom: 24,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  requirement: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checked: {
    backgroundColor: '#f8f8f8',
  },
  requirementText: {
    fontSize: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#888',
  },
});

export default Credit;