interface MergeTagPickerProps {
  onInsertTag: (tag: string) => void;
}

export function MergeTagPicker({ onInsertTag }: MergeTagPickerProps) {
  const tags = [
    { tag: "{{name}}", label: "Name", desc: "First name of the lead" },
    { tag: "{{company}}", label: "Company", desc: "Company name" },
    { tag: "{{personalized_line}}", label: "Personalized Line", desc: "Custom outreach sentence" },
  ];

  return (
    <div className="rounded-lg border border-border/60 bg-surface/50 p-3 shadow-sm">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Insert Merge Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t.tag}
            type="button"
            onClick={() => onInsertTag(t.tag)}
            title={t.desc}
            className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-muted-foreground"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
