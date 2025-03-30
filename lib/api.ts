import { Platform } from 'react-native';

const API_URL = 'https://quantumai-878607249618.us-central1.run.app';

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new ApiError(responseData.message || 'An error occurred');
    }

    // Handle the nested data structure
    const data = endpoint === '/questions' ? responseData.data : responseData;
    return { data: data as T };
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: 'Network error occurred' };
  }
}

export interface Question {
  question: string;
  options: string[];
}

export interface UserAnswer {
  question: string;
  answer: string;
}

export interface AiResponse {
  message: string;
}

export const api = {
  // Get questions for the questionnaire
  getQuestions: (): Promise<ApiResponse<Question[]>> => {
    return fetchApi('/questions');
  },

  // Submit answers and get AI response
  submitAnswers: (answers: UserAnswer[]): Promise<ApiResponse<AiResponse>> => {
    return fetchApi('/questions', {
      method: 'POST',
      body: JSON.stringify(answers),
    });
  },
};