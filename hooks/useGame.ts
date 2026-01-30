"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnswerRecord, GameProgress, Question } from "@/types";
import { shuffleOptions } from "@/utils/shuffleOptions";

const STORAGE_KEY = "pattern-detective-progress";
const SESSION_SEED_KEY = "pattern-detective-seed";

const defaultProgress: GameProgress = {
  currentIndex: 0,
  score: 0,
  answers: []
};

const loadProgress = () => {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultProgress;
  }

  try {
    const parsed = JSON.parse(stored) as GameProgress;
    return {
      currentIndex: parsed.currentIndex ?? 0,
      score: parsed.score ?? 0,
      answers: parsed.answers ?? []
    };
  } catch {
    return defaultProgress;
  }
};

const saveProgress = (progress: GameProgress) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const clearProgress = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
};

const getSessionSeed = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  const stored = window.sessionStorage.getItem(SESSION_SEED_KEY);
  if (stored) {
    const parsed = Number(stored);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  const seed = Math.floor(Math.random() * 1_000_000_000);
  window.sessionStorage.setItem(SESSION_SEED_KEY, seed.toString());
  return seed;
};

export const useGame = (questions: Question[]) => {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [sessionSeed] = useState(getSessionSeed);

  useEffect(() => {
    const stored = loadProgress();
    setProgress(stored);
    setHydrated(true);
  }, []);

  const currentQuestion = questions[progress.currentIndex];
  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) {
      return [];
    }
    return shuffleOptions(currentQuestion.options, sessionSeed, currentQuestion.id);
  }, [currentQuestion, sessionSeed]);

  useEffect(() => {
    if (!hydrated) return;
    const existing = progress.answers.find(
      (answer) => answer.id === currentQuestion?.id
    );
    if (existing) {
      setSelectedOption(existing.selectedOption);
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setSubmitted(false);
    }
  }, [hydrated, progress.currentIndex, progress.answers, currentQuestion?.id]);

  useEffect(() => {
    if (hydrated) {
      saveProgress(progress);
    }
  }, [progress, hydrated]);

  const selectOption = (option: string) => {
    if (submitted) return;
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!currentQuestion || !selectedOption || submitted) return;

    const isCorrect = selectedOption === currentQuestion.correctOption;
    const nextScore = isCorrect ? progress.score + 10 : progress.score;

    const updatedAnswer: AnswerRecord = {
      id: currentQuestion.id,
      selectedOption,
      isCorrect
    };

    const filteredAnswers = progress.answers.filter(
      (answer) => answer.id !== currentQuestion.id
    );

    setProgress({
      currentIndex: progress.currentIndex,
      score: nextScore,
      answers: [...filteredAnswers, updatedAnswer]
    });

    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (progress.currentIndex >= questions.length - 1) return;
    setProgress({
      ...progress,
      currentIndex: progress.currentIndex + 1
    });
  };

  const resetGame = () => {
    clearProgress();
    setProgress(defaultProgress);
    setSelectedOption(null);
    setSubmitted(false);
  };

  const correctCount = useMemo(
    () => progress.answers.filter((answer) => answer.isCorrect).length,
    [progress.answers]
  );

  return {
    progress,
    currentQuestion,
    selectedOption,
    submitted,
    hydrated,
    shuffledOptions,
    correctCount,
    selectOption,
    submitAnswer,
    nextQuestion,
    resetGame
  };
};
