import { LeadOutreach } from "../types";

export function LeadOutreachHistory({ outreach }: { outreach: LeadOutreach[] }) {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Outreach History</h2>
      </div>
      
      <div className="p-5">
        {outreach.length === 0 ? (
          <div className="text-sm text-muted-foreground py-2 text-center">No outreach recorded yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {outreach.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 border-b border-border/20 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-semibold text-foreground tracking-tight">{item.title}</div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                    item.statusStr === 'Sent' ? 'bg-accent/10 text-accent ring-accent/20' :
                    item.statusStr === 'Opened' ? 'bg-blue-500/10 text-blue-400 ring-blue-500/20' :
                    item.statusStr === 'Replied' ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20' :
                    'bg-amber-500/10 text-amber-500 ring-amber-500/20'
                  }`}>
                    {item.statusStr}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-border/80"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
