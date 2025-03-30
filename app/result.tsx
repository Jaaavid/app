import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useQuestionnaireStore } from '@/store/questionnaire';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResultScreen() {
  const { aiResponse, isLoading, error } = useQuestionnaireStore();

  useEffect(() => {
    if (!isLoading && !aiResponse && !error) {
      // If there's no response and we're not loading, go back to the questionnaire
      router.replace('/onboarding');
    }
  }, [isLoading, aiResponse, error]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Analyzing your responses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!aiResponse) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#F9FAFB', '#F3F4F6']}
      style={styles.container}
    >
      <Text style={styles.title}>Your Analysis</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{aiResponse.message}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 24,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});