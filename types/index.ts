export type Difficulty = "easy" | "medium" | "hard";
export type Category = "creational" | "structural" | "behavioral" | "architectural";

export type Question = {
  id: string;
  title: string;
  difficulty: Difficulty;
  codeSnippet: string;
  hints: string[];
  options: string[];
  correctOption: string;
  explanation: string;
  whyNotOthers: string[];
  category: Category;
};

export type AnswerRecord = {
  id: string;
  selectedOption: string;
  isCorrect: boolean;
};

export type GameProgress = {
  currentIndex: number;
  score: number;
  answers: AnswerRecord[];
};
