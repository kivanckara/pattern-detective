"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import OptionButton from "@/components/OptionButton";
import ResultPanel from "@/components/ResultPanel";
import ScoreChip from "@/components/ScoreChip";
import { questions } from "@/data/questions";
import { useGame } from "@/hooks/useGame";

export default function PlayPage() {
  const router = useRouter();
  const {
    progress,
    currentQuestion,
    selectedOption,
    submitted,
    hydrated,
    shuffledOptions,
    selectOption,
    submitAnswer,
    nextQuestion,
    resetGame
  } = useGame(questions);
  const [contentLanguage, setContentLanguage] = useState<"en" | "tr">("en");

  if (!hydrated || !currentQuestion) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading game...
      </div>
    );
  }

  const isCorrect =
    selectedOption === currentQuestion.correctOption && submitted;
  const hints =
    contentLanguage === "en"
      ? currentQuestion.hintsEn
      : currentQuestion.hintsTr;
  const explanation =
    contentLanguage === "en"
      ? currentQuestion.explanationEn
      : currentQuestion.explanationTr;

  const handleNext = () => {
    if (progress.currentIndex >= questions.length - 1) {
      router.push("/results");
    } else {
      nextQuestion();
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset progress? Your current score and answers will be cleared."
    );
    if (confirmed) {
      resetGame();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Question {progress.currentIndex + 1} / {questions.length}
          </p>
          <p className="text-xs text-slate-500">{currentQuestion.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {currentQuestion.difficulty.toUpperCase()} ·
            {" "}{currentQuestion.category}
          </span>
          <ScoreChip score={progress.score} />
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Reset progress
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <CodeBlock code={currentQuestion.codeSnippet} title="C# Snippet" />
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">Hints</h2>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Hints &amp; explanations</span>
                <div className="flex rounded-full border border-slate-200 bg-white p-0.5">
                  {(["en", "tr"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setContentLanguage(lang)}
                      aria-pressed={contentLanguage === lang}
                      className={
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold transition " +
                        (contentLanguage === lang
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900")
                      }
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {hints.map((hint, index) => (
                <div
                  key={`${currentQuestion.id}-hint-${index}`}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {hint}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Choose the pattern</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {shuffledOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={selectedOption === option}
                  submitted={submitted}
                  correct={option === currentQuestion.correctOption}
                  disabled={submitted}
                  onClick={() => selectOption(option)}
                />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!selectedOption || submitted}
                className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Submit
              </button>
              {submitted ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                >
                  {progress.currentIndex >= questions.length - 1
                    ? "View Results"
                    : "Next Question"}
                </button>
              ) : null}
            </div>
          </section>

          {submitted ? (
            <ResultPanel
              isCorrect={isCorrect}
              explanation={explanation}
              whyNotOthers={currentQuestion.whyNotOthers}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
