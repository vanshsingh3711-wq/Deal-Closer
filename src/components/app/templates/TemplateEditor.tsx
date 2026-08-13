import { useState, useRef, useEffect } from "react";
import { MergeTagPicker } from "./MergeTagPicker";
import { TemplateFormData } from "./types";

interface TemplateEditorProps {
  initialData?: TemplateFormData;
  onChange: (data: TemplateFormData) => void;
  onFocusedFieldChange: (field: "subject" | "body") => void;
}

export function TemplateEditor({ initialData, onChange, onFocusedFieldChange }: TemplateEditorProps) {
  const [formData, setFormData] = useState<TemplateFormData>(
    initialData || { name: "", subject: "", body: "" }
  );

  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [lastFocused, setLastFocused] = useState<"subject" | "body">("body");

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleChange = (field: keyof TemplateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field: "subject" | "body") => {
    setLastFocused(field);
    onFocusedFieldChange(field);
  };

  const insertTag = (tag: string) => {
    const inputRef = lastFocused === "subject" ? subjectRef.current : bodyRef.current;
    if (!inputRef) return;

    const start = inputRef.selectionStart ?? 0;
    const end = inputRef.selectionEnd ?? 0;
    
    const text = formData[lastFocused];
    const newText = text.substring(0, start) + tag + text.substring(end);
    
    handleChange(lastFocused, newText);
    
    // Focus back and move cursor after tag
    setTimeout(() => {
      inputRef.focus();
      inputRef.setSelectionRange(start + tag.length, start + tag.length);
    }, 0);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Template Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Initial Outreach - Engineers"
            className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
            Subject Line
          </label>
          <input
            ref={subjectRef}
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            onFocus={() => handleFocus("subject")}
            placeholder="e.g. Quick question for {{company}}"
            className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            maxLength={200}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-foreground mb-1.5">
            Email Body
          </label>
          <textarea
            ref={bodyRef}
            id="body"
            value={formData.body}
            onChange={(e) => handleChange("body", e.target.value)}
            onFocus={() => handleFocus("body")}
            placeholder="Hi {{name}},&#10;&#10;{{personalized_line}}&#10;&#10;Let me know if you're open to chatting."
            className="flex min-h-[300px] w-full rounded-md border border-input bg-surface px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            maxLength={20000}
          />
        </div>
      </div>
      
      <MergeTagPicker onInsertTag={insertTag} />
    </div>
  );
}
