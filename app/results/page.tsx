"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { useGameResults } from "@/hooks/useGameResults";

const STORAGE_KEY = "pattern-detective-progress";

export default function ResultsPage() {
  const router = useRouter();
  const { progress, hydrated, correctCount } = useGameResults();

  if (!hydrated) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading results...
      </div>
    );
  }

  const totalQuestions = questions.length;
  const score = progress.score;
  const performanceMessage =
    score >= totalQuestions * 8
      ? "Pattern pro! You read architecture like a detective."
      : score >= totalQuestions * 5
      ? "Solid instincts. Review the explanations and try again."
      : "Keep practicing. The patterns will start to pop out.";

  const handlePlayAgain = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    router.push("/play");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Results
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          {score} points
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          {correctCount} correct out of {totalQuestions}
        </p>
        <p className="mt-4 text-base text-slate-700">{performanceMessage}</p>
      </section>

      <section className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handlePlayAgain}
          className="rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Play Again
        </button>
        <Link
          href="/"
          className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
}
