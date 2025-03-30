import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useQuestionnaireStore } from '@/store/questionnaire';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

export default function Onboarding() {
  const { 
    questions,
    currentQuestionIndex, 
    answers, 
    setAnswer, 
    nextQuestion, 
    previousQuestion,
    submitAnswers,
    isLoading,
    error,
    fetchQuestions
  } = useQuestionnaireStore();
  
  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isLoading && questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  if (error && questions.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchQuestions}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No questions available</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setAnswer({ questionId: currentQuestion.id, selectedOption: optionIndex });
  };

  const handleContinue = async () => {
    if (isLastQuestion) {
      await submitAnswers();
      if (!error) {
        router.push('/result');
      }
    } else {
      nextQuestion();
    }
  };

  return (
    <LinearGradient
      colors={['#F9FAFB', '#F3F4F6']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Back Button and Progress Text */}
        <View style={styles.header}>
          {currentQuestionIndex > 0 && (
            <Pressable onPress={previousQuestion} style={styles.backButton}>
              <ArrowLeft size={24} color="#6B7280" />
            </Pressable>
          )}
          <Text style={styles.progress}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        </View>

        <Text style={styles.question}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentAnswer?.selectedOption === index;
            
            return (
              <Pressable
                key={index}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => handleOptionSelect(index)}
              >
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Continue Button */}
        <Pressable
          style={[
            styles.continueButton, 
            !currentAnswer && styles.continueButtonDisabled,
            isLoading && styles.continueButtonLoading
          ]}
          onPress={handleContinue}
          disabled={!currentAnswer || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={[
                styles.continueButtonText, 
                !currentAnswer && styles.continueButtonTextDisabled
              ]}>
                {isLastQuestion ? 'Complete' : 'Continue'}
              </Text>
              <ArrowRight 
                size={20} 
                color={currentAnswer ? '#FFFFFF' : '#9CA3AF'} 
              />
            </>
          )}
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
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
  retryButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2,
    transition: 'width 0.3s ease-in-out',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  progress: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  question: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
    flex: 1,
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  continueButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  continueButtonLoading: {
    backgroundColor: '#000000',
  },
  continueButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: '#9CA3AF',
  },
});