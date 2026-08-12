const activities = [
  {
    time: "09:42",
    title: "Email opened",
    details: "Sarah Mitchell · Acme Commerce",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
  },
  {
    time: "09:18",
    title: "Lead added",
    details: "Daniel Carter · GrowthLabs",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
  },
  {
    time: "08:51",
    title: "Follow-up scheduled",
    details: "Michael Chen · Storefront Co.",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  },
  {
    time: "Yesterday",
    title: "Reply received",
    details: "Alex Morgan · CommerceStack",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-hover"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
  }
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 p-5 shadow-sm h-full">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-foreground">Recent activity</h2>
        <p className="text-xs text-muted-foreground mt-1">Latest events across your pipeline.</p>
      </div>
      
      <div className="relative border-l border-border/60 ml-3 space-y-7 pb-2">
        {activities.map((activity, i) => (
          <div key={i} className="relative pl-6 group">
            <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border/60 shadow-sm transition-transform group-hover:scale-110">
              {activity.icon}
            </div>
            <div className="flex flex-col justify-start gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground tracking-tight">{activity.title}</span>
                <span className="text-[11px] text-muted-foreground font-medium">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
