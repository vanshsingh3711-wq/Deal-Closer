"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lead } from "../types";
import { Template } from "../../templates/types";
import { MergeTagPicker } from "../../templates/MergeTagPicker";

type EmailComposerModalProps = {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
};

export function EmailComposerModal({ lead, isOpen, onClose }: EmailComposerModalProps) {
  const { getToken, userId } = useAuth();
  
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const router = useRouter();
  
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchTemplates();
    }
  }, [isOpen, userId]);

  const fetchTemplates = async () => {
    setIsLoadingTemplates(true);
    setTemplateError(null);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/templates/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        }
      });
      if (!res.ok) throw new Error("Failed to load templates");
      const data = await res.json();
      setTemplates(data);
    } catch (err: any) {
      setTemplateError("Unable to load templates.");
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tId = e.target.value;
    setSelectedTemplateId(tId);
    
    if (tId) {
      const t = templates.find(temp => temp.id === tId);
      if (t) {
        setSubject(t.subject);
        setBody(t.body);
      }
    } else {
      setSubject("");
      setBody("");
    }
  };

  const handleInsertTag = (tag: string) => {
    if (!bodyRef.current) {
      setBody(prev => prev + tag);
      return;
    }
    const start = bodyRef.current.selectionStart;
    const end = bodyRef.current.selectionEnd;
    const newText = body.substring(0, start) + tag + body.substring(end);
    setBody(newText);
    
    setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.selectionStart = bodyRef.current.selectionEnd = start + tag.length;
        bodyRef.current.focus();
      }
    }, 0);
  };

  const resolveMergeTags = (text: string) => {
    return text
      .replace(/{{name}}/g, lead.name || "[Name not provided]")
      .replace(/{{company}}/g, lead.company || "[Company not provided]")
      .replace(/{{personalized_line}}/g, lead.personalized_line || "[Personalized line not provided]");
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim() || !lead.email || lead.verification_status !== 'verified') return;
    
    setIsSending(true);
    setSendError(null);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const payload = {
        subject,
        body,
        template_id: selectedTemplateId || undefined
      };

      const res = await fetch(`${apiUrl}/api/leads/${lead.id}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to send email");
      }
      
      router.refresh();
      onClose();
    } catch (err: any) {
      setSendError(err.message || "An unexpected error occurred while sending.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-6xl max-h-[90vh] bg-background border border-border/40 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-surface/50">
          <div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Compose Email</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              To: {lead.name} &lt;{lead.email}&gt;
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-surface"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Two-Pane Layout */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[400px]">
          
          {/* Left Pane: Editor */}
          <div className="flex-1 border-r border-border/40 flex flex-col overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Template Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Template</label>
              {isLoadingTemplates ? (
                <div className="h-10 bg-surface animate-pulse rounded-md border border-border/40"></div>
              ) : templateError ? (
                <div className="text-sm text-red-400 p-2 bg-red-400/10 rounded-md border border-red-400/20">{templateError}</div>
              ) : templates.length === 0 ? (
                <div className="text-sm text-muted-foreground p-3 bg-surface rounded-md border border-border/40 flex justify-between items-center">
                  <span>No templates found.</span>
                  <Link href="/app/templates/new" className="text-accent hover:underline font-medium">Create one</Link>
                </div>
              ) : (
                <select
                  value={selectedTemplateId}
                  onChange={handleTemplateChange}
                  className="w-full h-10 px-3 bg-surface border border-border/60 rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all hover:bg-surface-hover"
                >
                  <option value="">Select a template...</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Subject</span>
                <span className="text-muted-foreground font-normal text-xs">{subject.length}/100</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={100}
                placeholder="Subject line..."
                className="w-full h-10 px-3 bg-surface border border-border/60 rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {/* Body Textarea */}
            <div className="space-y-2 flex-1 flex flex-col min-h-[250px]">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                <span>Body</span>
              </label>
              <textarea
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email here..."
                className="w-full flex-1 p-3 bg-surface border border-border/60 rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none custom-scrollbar font-mono leading-relaxed"
              />
            </div>

            {/* Merge Tag Picker */}
            <div>
              <MergeTagPicker onInsertTag={handleInsertTag} />
            </div>
            
          </div>

          {/* Right Pane: Preview */}
          <div className="flex-1 bg-surface/20 flex flex-col overflow-y-auto custom-scrollbar p-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Preview</h3>
            
            <div className="bg-background border border-border/40 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-border/40 bg-surface/30 space-y-2">
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-16">From:</span>
                  <span className="text-muted-foreground italic">Not configured</span>
                </div>
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-16">To:</span>
                  <span className="text-foreground font-medium">{lead.name} &lt;{lead.email}&gt;</span>
                </div>
                <div className="flex text-sm pt-2">
                  <span className="text-muted-foreground w-16">Subject:</span>
                  <span className="text-foreground font-semibold">{resolveMergeTags(subject) || <span className="text-muted-foreground italic">No subject</span>}</span>
                </div>
              </div>
              
              <div className="p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap min-h-[200px]">
                {resolveMergeTags(body) || <span className="text-muted-foreground italic">Email body is empty...</span>}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>This is a preview of exactly how the email will render with resolved merge tags. No email will actually be sent from this interface.</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border/40 flex justify-between items-center bg-surface/50">
          <div>
            {sendError && <span className="text-sm text-red-400 bg-red-400/10 px-3 py-1.5 rounded-md border border-red-400/20">{sendError}</span>}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 text-sm font-medium text-foreground bg-surface border border-border/60 rounded-md hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSend}
              disabled={!subject.trim() || !body.trim() || !lead.email || lead.verification_status !== 'verified' || isSending}
              title={
                !lead.email ? "Lead has no email" : 
                lead.verification_status !== 'verified' ? "Email is not verified" : 
                (!subject.trim() || !body.trim()) ? "Subject and body required" : 
                "Send email"
              }
              className="px-4 py-2 text-sm font-medium text-accent-foreground bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent cursor-pointer disabled:cursor-not-allowed rounded-md border border-accent flex items-center gap-2 transition-colors"
            >
              {isSending ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4 20-7z"></path></svg>
              )}
              {isSending ? "Sending..." : "Send email"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
