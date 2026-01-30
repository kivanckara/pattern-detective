type ScoreChipProps = {
  score: number;
};

export default function ScoreChip({ score }: ScoreChipProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      Score
      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-white">
        {score}
      </span>
    </span>
  );
}
