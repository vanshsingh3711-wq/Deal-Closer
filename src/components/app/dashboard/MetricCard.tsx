export function MetricCard({ title, value, subtitle }: { title: string, value: string | number, subtitle: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 p-5 shadow-sm transition-all hover:bg-surface/30 hover:border-border/60">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-2 text-xs text-muted-foreground/80 font-medium">{subtitle}</div>
    </div>
  );
}
