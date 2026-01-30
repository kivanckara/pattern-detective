import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pattern Detective
          </p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Learn design patterns the fun way.
          </h1>
          <p className="text-lg text-slate-600">
            Guess the design pattern from code &amp; architecture hints.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/play"
            className="rounded-full bg-cobalt px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start Game
          </Link>
          <Link
            href="/results"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            View Results
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
        <ul className="mt-4 space-y-3 text-slate-600">
          <li className="flex gap-2">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-cobalt" aria-hidden="true" />
            Read the C# snippet and architectural hints.
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-cobalt" aria-hidden="true" />
            Pick the pattern that best matches the intent.
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-cobalt" aria-hidden="true" />
            Learn why other patterns do not fit.
          </li>
        </ul>
      </section>
    </div>
  );
}
