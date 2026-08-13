import Link from "next/link";
import { Template } from "./types";
import { formatDistanceToNow } from "date-fns";

interface TemplateCardProps {
  template: Template;
  onDeleteClick: (template: Template) => void;
}

export function TemplateCard({ template, onDeleteClick }: TemplateCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border/60 bg-surface p-5 shadow-sm transition-all hover:border-border hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground truncate">{template.name}</h3>
          <p className="text-sm font-medium text-muted-foreground truncate">{template.subject}</p>
        </div>
      </div>
      
      <div className="mt-4 mb-6 flex-1 text-sm text-muted-foreground line-clamp-3">
        {template.body}
      </div>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40">
        <span className="text-xs font-medium text-muted-foreground">
          Updated {formatDistanceToNow(new Date(template.updated_at), { addSuffix: true })}
        </span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDeleteClick(template)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Delete ${template.name}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
          
          <Link
            href={`/app/templates/${template.id}/edit`}
            className="inline-flex h-8 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-3 text-xs font-medium text-foreground transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
