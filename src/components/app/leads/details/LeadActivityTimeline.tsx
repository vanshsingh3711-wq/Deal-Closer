import { LeadActivity } from "../types";

export function LeadActivityTimeline({ activities }: { activities: LeadActivity[] }) {
  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">Activity</h2>
      </div>
      
      <div className="p-5">
        {activities.length === 0 ? (
          <div className="text-sm text-muted-foreground py-4 text-center">No activity recorded yet.</div>
        ) : (
          <div className="relative border-l border-border/60 ml-4 space-y-8 pb-2">
            {activities.map((activity, i) => (
              <div key={activity.id} className="relative pl-6 group">
                <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border/60 shadow-sm transition-transform group-hover:scale-110">
                  {activity.type === 'email_opened' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}
                  {activity.type === 'email_sent' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4 20-7z"></path></svg>}
                  {activity.type === 'follow_up_scheduled' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                  {activity.type === 'lead_imported' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>}
                  {activity.type === 'reply_received' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {activity.timestamp}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {activity.title}
                  </div>
                  <div className="text-sm text-muted-foreground bg-surface/30 p-3 rounded-md border border-border/40 mt-1 inline-block">
                    {activity.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
