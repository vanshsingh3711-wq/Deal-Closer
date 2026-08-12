import { Lead } from "../types";

export function LeadInfo({ lead }: { lead: Lead }) {
  const formatDate = (ms: number) => {
    if (ms === 0) return "—";
    return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const fields = [
    { label: "Company", value: lead.company },
    { label: "Role", value: lead.role },
    { label: "Email", value: lead.email },
    { label: "Source", value: lead.source },
    { label: "Created", value: formatDate(lead.addedAt) },
    { label: "Last activity", value: lead.lastActivity || "—" }
  ];

  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lead Information</h2>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <div className="text-[11px] font-medium text-muted-foreground">{field.label}</div>
              <div className={`text-sm font-medium ${field.label === 'Email' ? 'text-accent hover:underline cursor-pointer' : 'text-foreground'}`}>
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
