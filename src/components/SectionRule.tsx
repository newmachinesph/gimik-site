/** Editorial section opener: hairline, index number, running label.
 *  One consistent system across the page — the art direction's spine. */
export function SectionRule({
  index,
  label,
  tone = "paper",
}: {
  index: string;
  label: string;
  tone?: "paper" | "night";
}) {
  const line = tone === "night" ? "border-rule-invert" : "border-rule";
  const text = tone === "night" ? "text-paper/50" : "text-ink-muted";
  return (
    <div
      aria-hidden="true"
      className={`mb-14 flex items-baseline justify-between border-t ${line} pt-4`}
    >
      <span className={`mono-label ${text}`}>{label}</span>
      <span className={`font-mono text-[13px] ${text}`}>({index})</span>
    </div>
  );
}
