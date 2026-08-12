export function LeadFollowUp({ nextFollowUp }: { nextFollowUp: string }) {
  const isScheduled = nextFollowUp && nextFollowUp !== "Not scheduled";

  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40 flex justify-between items-center">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Next Follow-Up</h2>
        <button className="text-[11px] font-medium text-accent hover:text-accent-hover hover:underline" disabled>
          View sequence
        </button>
      </div>
      
      <div className="p-5">
        {isScheduled ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="text-sm font-semibold text-foreground tracking-tight">Follow-up #1</div>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset bg-amber-500/10 text-amber-500 ring-amber-500/20">
                Scheduled
              </span>
            </div>
            
            <div className="text-sm text-foreground bg-surface/30 p-3 rounded-md border border-border/40 italic text-muted-foreground/90">
              "Checking in on my previous message."
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm font-medium text-foreground">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              {nextFollowUp}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-2 text-center">
            No follow-up scheduled.
          </div>
        )}
      </div>
    </div>
  );
}
