const attentionItems = [
  {
    type: "Follow-up due",
    person: "Sarah Mitchell",
    company: "Acme Commerce",
    description: "Follow-up #1",
    time: "Due today · 10:30",
    color: "amber"
  },
  {
    type: "Reply received",
    person: "Daniel Carter",
    company: "GrowthLabs",
    description: "Interested — let's talk.",
    time: "12 minutes ago",
    color: "emerald"
  },
  {
    type: "Follow-up due",
    person: "Michael Chen",
    company: "Storefront Co.",
    description: "Follow-up #2",
    time: "Due today · 15:00",
    color: "amber"
  }
];

export function AttentionList() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-border/40 bg-surface/40">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Needs attention
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Actions requiring your response.</p>
      </div>
      
      <div className="flex-1 divide-y divide-border/40">
        {attentionItems.map((item, i) => (
          <div key={i} className="p-4 hover:bg-surface/40 transition-colors group cursor-pointer flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                item.color === 'amber' 
                  ? 'bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/20' 
                  : 'bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20'
              }`}>
                {item.type}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">{item.time}</span>
            </div>
            
            <div>
              <div className="text-sm font-semibold text-foreground tracking-tight">
                {item.person} <span className="text-muted-foreground font-medium ml-1">· {item.company}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors truncate">
                "{item.description}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
