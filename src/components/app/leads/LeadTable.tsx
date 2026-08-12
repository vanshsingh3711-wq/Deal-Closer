import { Lead } from "./types";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { useRouter } from "next/navigation";

export function LeadTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border/40 bg-surface/20 shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-border/40 bg-surface/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="py-3 px-4 w-[25%]">Lead</th>
              <th className="py-3 px-4 w-[15%]">Role</th>
              <th className="py-3 px-4 w-[20%]">Email</th>
              <th className="py-3 px-4 w-[10%]">Status</th>
              <th className="py-3 px-4 w-[12%]">Last activity</th>
              <th className="py-3 px-4 w-[12%]">Next follow-up</th>
              <th className="py-3 px-4 w-[6%] text-right">More</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-surface/30 transition-colors group cursor-pointer"
                onClick={() => router.push(`/app/leads/${lead.id}`)}
              >
                <td className="py-3 px-4">
                  <div className="font-semibold text-foreground tracking-tight">{lead.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">{lead.company}</div>
                </td>
                <td className="py-3 px-4 text-muted-foreground truncate max-w-[150px]">{lead.role}</td>
                <td className="py-3 px-4 text-muted-foreground truncate max-w-[200px]">{lead.email}</td>
                <td className="py-3 px-4">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="py-3 px-4 text-muted-foreground">{lead.lastActivity || "—"}</td>
                <td className="py-3 px-4 text-muted-foreground">{lead.nextFollowUp || "Not scheduled"}</td>
                <td className="py-3 px-4 text-right">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground opacity-0 group-hover:opacity-100 transition-all focus:opacity-100">
                    <span className="sr-only">Open menu</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden flex flex-col divide-y divide-border/40 rounded-xl border border-border/40 bg-surface/20 shadow-sm">
        {leads.map((lead) => (
          <div 
            key={lead.id} 
            className="flex flex-col p-4 hover:bg-surface/30 transition-colors gap-3 cursor-pointer"
            onClick={() => router.push(`/app/leads/${lead.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-semibold text-foreground tracking-tight">{lead.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{lead.company}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{lead.role}</div>
              </div>
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground transition-colors">
                <span className="sr-only">Open menu</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-between mt-1 gap-2 border-t border-border/30 pt-3">
              <LeadStatusBadge status={lead.status} />
              <div className="text-xs text-muted-foreground text-right flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  {lead.lastActivity || "—"}
                </div>
                {lead.nextFollowUp && lead.nextFollowUp !== "Not scheduled" && (
                  <div className="flex items-center gap-1.5 text-amber-500/80">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {lead.nextFollowUp}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
