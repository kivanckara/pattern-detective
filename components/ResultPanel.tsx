type ResultPanelProps = {
  isCorrect: boolean;
  explanation: string;
  whyNotOthers: string[];
};

export default function ResultPanel({
  isCorrect,
  explanation,
  whyNotOthers
}: ResultPanelProps) {
  return (
    <div
      className={
        "rounded-2xl border p-5 shadow-sm " +
        (isCorrect
          ? "border-emerald-200 bg-emerald-50"
          : "border-rose-200 bg-rose-50")
      }
      aria-live="polite"
    >
      <h3 className="text-lg font-semibold text-slate-900">
        {isCorrect ? "Correct!" : "Not quite."}
      </h3>
      <p className="mt-2 text-sm text-slate-700">{explanation}</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-800">Why not the others</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {whyNotOthers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
