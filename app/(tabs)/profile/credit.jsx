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
      <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
        <Text style={styles.checkmark}>{isChecked ? '✓' : ''}</Text>
      </View>
      <Text style={styles.requirementText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.rewardText}>2000 XP</Text>
          <Text style={styles.header}>Buy Food on Credit</Text>
          <Text style={styles.subText}>Complete all requirements to unlock credit feature</Text>
        </View>
        
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
            Activate Credit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EB',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#FF8C42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  rewardText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  requirementsContainer: {
    marginBottom: 32,
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF8C42',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#FF8C42',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checked: {
    backgroundColor: '#FFF5EB',
  },
  requirementText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#FFE0CC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#FF8C42',
  },
});

export default Credit;