import { LeadStatus } from "./types";

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const config = {
    NEW: "bg-surface-hover text-muted-foreground ring-border",
    CONTACTED: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    OPENED: "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20",
    REPLIED: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    INTERESTED: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
    CLOSED: "bg-accent/10 text-accent ring-accent/20",
  }[status];

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${config}`}>
      {status}
    </span>
  );
}
