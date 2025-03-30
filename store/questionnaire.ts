import { create } from 'zustand';
import { api, Question, UserAnswer } from '@/lib/api';

export interface Answer {
  questionId: number;
  selectedOption: number;
}

interface QuestionnaireState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isLoading: boolean;
  error: string | null;
  aiResponse: {
    message: string;
  } | null;
  fetchQuestions: () => Promise<void>;
  setAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuestionnaire: () => void;
  submitAnswers: () => Promise<void>;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useQuestionnaireStore = create<QuestionnaireState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isLoading: false,
  error: null,
  aiResponse: null,
  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await api.getQuestions();
      if (error) throw new Error(error);
      if (data) {
        // Map the questions array to include IDs
        const questionsWithIds = data.map((q, index) => ({
          ...q,
          id: index + 1
        }));
        set({ questions: questionsWithIds });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch questions' });
    } finally {
      set({ isLoading: false });
    }
  },
  setAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers.filter(a => a.questionId !== answer.questionId), answer]
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
    })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    })),
  resetQuestionnaire: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      error: null,
      aiResponse: null,
    }),
  submitAnswers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { questions, answers } = get();
      
      // Format answers as required by the API
      const formattedAnswers: UserAnswer[] = answers.map(answer => ({
        question: questions[answer.questionId - 1].question,
        answer: questions[answer.questionId - 1].options[answer.selectedOption]
      }));

      // Add artificial delay
      await sleep(2000);

      const { data, error } = await api.submitAnswers(formattedAnswers);
      if (error) throw new Error(error);
      if (data) {
        set({ aiResponse: data });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to get AI response' });
    } finally {
      set({ isLoading: false });
    }
  }
}));