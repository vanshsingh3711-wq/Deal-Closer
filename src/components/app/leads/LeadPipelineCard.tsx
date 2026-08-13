import { Lead } from "./types";
import { formatDistanceToNow } from "date-fns";

interface LeadPipelineCardProps {
  lead: Lead;
  onMoveToStage: (leadId: string, newStage: string) => void;
  availableStages: { id: string; label: string }[];
}

export function LeadPipelineCard({ lead, onMoveToStage, availableStages }: LeadPipelineCardProps) {
  return (
    <div className="bg-surface/50 border border-border/50 rounded-lg p-3 hover:bg-surface/80 transition-colors shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <a href={`/app/leads/${lead.id}`} className="font-semibold text-sm text-foreground hover:underline">
            {lead.name}
          </a>
          <div className="text-xs text-muted-foreground mt-0.5">{lead.company}</div>
          <div className="text-xs text-muted-foreground">{lead.email}</div>
        </div>
        
        {/* Dropdown for stage change */}
        <div className="relative group">
          <button className="p-1 rounded-md hover:bg-surface-hover text-muted-foreground hover:text-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-1 w-32 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <div className="p-1">
              <div className="text-xs font-semibold px-2 py-1 text-muted-foreground">Move to</div>
              {availableStages.filter(s => s.id !== lead.status).map(stage => (
                <button
                  key={stage.id}
                  onClick={() => onMoveToStage(lead.id, stage.id)}
                  className="w-full text-left px-2 py-1.5 text-xs text-foreground hover:bg-surface-hover hover:text-accent rounded-sm"
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/30 flex justify-between items-center">
        <span className="text-[10px] bg-surface-hover px-1.5 py-0.5 rounded text-muted-foreground">
          {lead.source}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {lead.addedAt ? formatDistanceToNow(new Date(lead.addedAt), { addSuffix: true }) : ''}
        </span>
      </div>
    </div>
  );
}
