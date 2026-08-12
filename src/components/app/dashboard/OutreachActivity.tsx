export function OutreachActivity() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 p-5 shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-foreground">Outreach activity</h2>
        <p className="text-xs text-muted-foreground mt-1">Your recent outreach performance.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* Sent */}
        <div className="group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Sent
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">186</span>
              <span className="text-xs text-muted-foreground w-12 text-right">100%</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-1000 ease-out" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        {/* Opened */}
        <div className="group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Opened
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">94</span>
              <span className="text-xs text-muted-foreground w-12 text-right">50.5%</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
            <div className="h-full bg-blue-500/80 transition-all duration-1000 ease-out delay-150" style={{ width: '50.5%' }}></div>
          </div>
        </div>
        
        {/* Replied */}
        <div className="group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Replied
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">24</span>
              <span className="text-xs text-muted-foreground w-12 text-right">12.9%</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500/80 transition-all duration-1000 ease-out delay-300" style={{ width: '12.9%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
