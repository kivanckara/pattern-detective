const baseStyles =
  "rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export type OptionButtonProps = {
  label: string;
  selected: boolean;
  submitted: boolean;
  correct: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function OptionButton({
  label,
  selected,
  submitted,
  correct,
  disabled,
  onClick
}: OptionButtonProps) {
  const stateStyles = submitted
    ? correct
      ? "border-emerald-400 bg-emerald-50 text-emerald-900"
      : selected
      ? "border-rose-400 bg-rose-50 text-rose-900"
      : "border-slate-200 bg-white text-slate-600"
    : selected
    ? "border-blue-500 bg-blue-50 text-blue-900"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

  const className = [
    baseStyles,
    stateStyles,
    disabled ? "cursor-not-allowed opacity-60" : "",
    "focus-visible:outline-blue-500"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={className}
    >
      {label}
    </button>
  );
}
