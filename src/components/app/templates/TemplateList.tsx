"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Template } from "./types";
import { TemplateCard } from "./TemplateCard";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";

export function TemplateList() {
  const { userId } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/templates`, {
        headers: userId ? { "X-User-Id": userId } : undefined
      });
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        console.error("Failed to fetch templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [userId]);

  const handleDelete = async () => {
    if (!templateToDelete) return;
    
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/templates/${templateToDelete.id}`, {
        method: "DELETE",
        headers: userId ? { "X-User-Id": userId } : undefined
      });
      
      if (response.ok) {
        setTemplates(templates.filter(t => t.id !== templateToDelete.id));
        setTemplateToDelete(null);
      } else {
        setDeleteError("Failed to delete template. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      setDeleteError("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-r-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground font-medium">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Templates</h1>
          <p className="text-sm text-muted-foreground font-medium">Create reusable outreach messages with dynamic lead information.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/templates/new" className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New template
          </Link>
        </div>
      </div>

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onDeleteClick={setTemplateToDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-lg border border-dashed border-border bg-surface/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No templates yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">Create your first outreach template to start building your sending workflow.</p>
          <Link href="/app/templates/new" className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            Create template
          </Link>
        </div>
      )}

      {templateToDelete && (
        <DeleteTemplateDialog
          isOpen={!!templateToDelete}
          onClose={() => setTemplateToDelete(null)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
          error={deleteError}
        />
      )}
    </div>
  );
}
