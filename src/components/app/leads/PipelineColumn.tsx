import { Lead } from "./types";
import { LeadPipelineCard } from "./LeadPipelineCard";

interface PipelineColumnProps {
  stageId: string;
  stageLabel: string;
  leads: Lead[];
  onMoveToStage: (leadId: string, newStage: string) => void;
  availableStages: { id: string; label: string }[];
}

export function PipelineColumn({ stageId, stageLabel, leads, onMoveToStage, availableStages }: PipelineColumnProps) {
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] bg-surface/30 rounded-lg overflow-hidden border border-border/40 h-full">
      <div className="flex items-center justify-between p-3 border-b border-border/40 bg-surface/50">
        <h3 className="font-semibold text-sm text-foreground tracking-tight">{stageLabel}</h3>
        <span className="text-xs font-medium bg-surface-hover text-muted-foreground px-2 py-0.5 rounded-full">
          {leads.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 custom-scrollbar">
        {leads.length > 0 ? (
          leads.map(lead => (
            <LeadPipelineCard
              key={lead.id}
              lead={lead}
              onMoveToStage={onMoveToStage}
              availableStages={availableStages}
            />
          ))
        ) : (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-border/50 rounded-lg text-xs text-muted-foreground">
            No leads in {stageLabel.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}
