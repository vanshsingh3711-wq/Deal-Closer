import { LeadNote } from "../types";

export function LeadNotes({ note }: { note: LeadNote }) {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Notes</h2>
          {note && (
            <span className="text-[10px] text-muted-foreground/70 font-medium hidden sm:inline-block">
              Last updated {note.updatedAt}
            </span>
          )}
        </div>
        <button className="inline-flex h-7 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-2 text-[11px] font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent opacity-80 cursor-not-allowed" disabled>
          + Add note
        </button>
      </div>
      
      <div className="p-5">
        {note ? (
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {note.content}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-4 text-center">
            No notes added yet.
          </div>
        )}
      </div>
    </div>
  );
}
