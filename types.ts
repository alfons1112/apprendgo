export enum YearLevel {
  L1 = 'Licence 1',
  L2 = 'Licence 2',
  L3 = 'Licence 3'
}

export interface Course {
  id: string;
  title: string;
  year: YearLevel;
  description: string;
  content: string; // The full text of the lesson
  category: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
  year: YearLevel;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}