// import React from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { router } from 'expo-router';
// import { useQuestionnaireStore } from '@/store/questionnaire';
// import { RefreshCw } from 'lucide-react-native';

// export default function ProfileScreen() {
//   const { resetQuestionnaire } = useQuestionnaireStore();

//   const handleRetakeQuestionnaire = () => {
//     resetQuestionnaire();
//     router.push('/onboarding');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
      
//       <Pressable 
//         style={styles.button}
//         onPress={handleRetakeQuestionnaire}
//       >
//         <RefreshCw size={20} color="#FFFFFF" />
//         <Text style={styles.buttonText}>Retake Questionnaire</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     padding: 24,
//     paddingTop: 60,
//   },
//   title: {
//     fontFamily: 'PlusJakartaSans_600SemiBold',
//     fontSize: 28,
//     color: '#1F2937',
//     marginBottom: 24,
//   },
//   button: {
//     backgroundColor: '#7C3AED',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   buttonText: {
//     fontFamily: 'Inter_600SemiBold',
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
// });