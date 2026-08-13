"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { TemplateEditor } from "@/components/app/templates/TemplateEditor";
import { TemplatePreview } from "@/components/app/templates/TemplatePreview";
import { TemplateFormData, Template } from "@/components/app/templates/types";

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { userId } = useAuth();
  
  const [formData, setFormData] = useState<TemplateFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/templates/${params.id}`, {
          headers: userId ? { "X-User-Id": userId } : undefined
        });
        
        if (response.ok) {
          const data: Template = await response.json();
          setFormData({
            name: data.name,
            subject: data.subject,
            body: data.body
          });
        } else {
          setError("Template not found or you don't have access.");
        }
      } catch (err) {
        setError("Error loading template.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplate();
  }, [params.id, userId]);

  const handleSave = async () => {
    if (!formData || !formData.name || !formData.subject || !formData.body) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/templates/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(userId ? { "X-User-Id": userId } : {})
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push("/app/templates");
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to update template. Please check for invalid merge tags.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-r-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground font-medium">Loading template...</p>
      </div>
    );
  }

  if (!formData && error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">{error}</p>
        <Link href="/app/templates" className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
          Back to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-3">
            <Link href="/app/templates" className="hover:text-foreground transition-colors">Templates</Link>
            <span>/</span>
            <span className="text-foreground">Edit template</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Edit template</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/app/templates" className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive font-medium border border-destructive/20">
          {error}
        </div>
      )}

      {formData && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px] gap-8 items-start pb-12">
          <TemplateEditor 
            initialData={formData}
            onChange={setFormData}
            onFocusedFieldChange={() => {}}
          />
          
          <div className="hidden lg:block lg:sticky lg:top-6">
            <TemplatePreview data={formData} />
          </div>
          
          {/* Mobile Preview */}
          <div className="block lg:hidden mt-4">
            <TemplatePreview data={formData} />
          </div>
        </div>
      )}
    </div>
  );
}
