import { formatCode } from "@/utils/formatCode";

type CodeBlockProps = {
  code: string;
  title?: string;
};

export default function CodeBlock({ code, title }: CodeBlockProps) {
  const lines = formatCode(code).split("\n");

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-950/95 p-4 text-sm text-slate-100 shadow-sm">
      {title ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {title}
        </p>
      ) : null}
      <pre className="overflow-x-auto">
        <code className="grid gap-1">
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className="grid grid-cols-[auto_1fr] gap-4">
              <span className="select-none text-right text-xs text-slate-500">
                {index + 1}
              </span>
              <span className="whitespace-pre-wrap text-slate-100">{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
