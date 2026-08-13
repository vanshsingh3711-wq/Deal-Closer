import { TemplateFormData } from "./types";

interface TemplatePreviewProps {
  data: TemplateFormData;
}

export function TemplatePreview({ data }: TemplatePreviewProps) {
  const sampleData = {
    "{{name}}": "Sarah",
    "{{company}}": "Acme Commerce",
    "{{personalized_line}}": "I noticed Acme Commerce recently expanded its online storefront."
  };

  const renderText = (text: string) => {
    if (!text) return "";
    let rendered = text;
    for (const [tag, value] of Object.entries(sampleData)) {
      // Use global regex replacement
      const regex = new RegExp(tag.replace(/[{}]/g, "\\$&"), "g");
      rendered = rendered.replace(regex, value);
    }
    return rendered;
  };

  const renderedSubject = renderText(data.subject);
  const renderedBody = renderText(data.body);

  return (
    <div className="flex flex-col h-full rounded-xl border border-border/60 bg-surface shadow-sm overflow-hidden sticky top-6">
      <div className="bg-surface-hover border-b border-border/40 px-5 py-3">
        <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Rendered with sample data</p>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-6 space-y-1 pb-4 border-b border-border/40">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</div>
          <div className="text-sm font-medium text-foreground">
            {renderedSubject || <span className="text-muted-foreground/50 italic">No subject</span>}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Message</div>
          <div className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
            {renderedBody || <span className="text-muted-foreground/50 italic">No body content</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
