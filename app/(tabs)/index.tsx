import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Language Selector */}
      <Pressable style={styles.languageSelector}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1628626126093-97c2d922a83d?w=32&h=24&fit=crop' }}
          style={styles.flagIcon}
        />
        <Text style={styles.languageText}>EN</Text>
      </Pressable>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Calorie tracking{'\n'}made easy
        </Text>

        <Pressable 
          style={styles.getStartedButton}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>

        <View style={styles.signInContainer}>
          <Text style={styles.purchaseText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/auth/signin')}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  languageSelector: {
    position: 'absolute',
    top: 60,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 20,
    gap: 6,
  },
  flagIcon: {
    width: 16,
    height: 12,
    borderRadius: 2,
  },
  languageText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
    color: '#111827',
    marginBottom: 40,
    lineHeight: 48,
  },
  getStartedButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginBottom: 24,
  },
  getStartedText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  signInText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  bottomIndicator: {
    width: 140,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 8,
  },
});