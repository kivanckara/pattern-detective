"use client";

import { useEffect, useMemo, useState } from "react";
import type { GameProgress } from "@/types";

const STORAGE_KEY = "pattern-detective-progress";

const defaultProgress: GameProgress = {
  currentIndex: 0,
  score: 0,
  answers: []
};

export const useGameResults = () => {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as GameProgress;
        setProgress({
          currentIndex: parsed.currentIndex ?? 0,
          score: parsed.score ?? 0,
          answers: parsed.answers ?? []
        });
      } catch {
        setProgress(defaultProgress);
      }
    }
    setHydrated(true);
  }, []);

  const correctCount = useMemo(
    () => progress.answers.filter((answer) => answer.isCorrect).length,
    [progress.answers]
  );

  return {
    progress,
    hydrated,
    correctCount
  };
};
