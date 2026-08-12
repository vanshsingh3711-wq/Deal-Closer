const pipelineData = [
  { label: "New", count: 428, color: "bg-surface-hover text-muted-foreground border-border" },
  { label: "Contacted", count: 312, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { label: "Opened", count: 186, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  { label: "Replied", count: 24, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { label: "Interested", count: 11, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { label: "Closed", count: 4, color: "bg-accent/10 text-accent border-accent/20" }
];

export function PipelineSnapshot() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 p-5 shadow-sm overflow-hidden">
      <div className="mb-5">
        <h2 className="text-sm font-medium text-foreground">Pipeline snapshot</h2>
        <p className="text-xs text-muted-foreground mt-1">Current status of all active leads.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        {pipelineData.map((stage, i) => (
          <div key={stage.label} className="flex-1 min-w-[100px] flex items-center sm:block group cursor-default">
            <div className={`
              flex-1 sm:flex-none border rounded-lg p-3 transition-colors
              ${stage.color} hover:bg-opacity-20
            `}>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1.5">{stage.label}</div>
              <div className="text-xl font-extrabold">{stage.count}</div>
            </div>
            {i < pipelineData.length - 1 && (
              <div className="hidden sm:flex justify-center my-2 text-border/60 group-hover:text-border transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
