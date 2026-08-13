"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Lead } from "./types";
import { PipelineColumn } from "./PipelineColumn";

const AVAILABLE_STAGES = [
  { id: "new", label: "New" },
  { id: "verified", label: "Verified" },
  { id: "contacted", label: "Contacted" },
  { id: "opened", label: "Opened" },
  { id: "replied", label: "Replied" },
  { id: "followup1", label: "Follow-up 1" },
  { id: "followup2", label: "Follow-up 2" },
  { id: "closed", label: "Closed" }
];

export function LeadPipeline() {
  const { getToken, userId } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const token = await getToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/leads/?archived=false`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(userId ? { "X-User-Id": userId } : {}),
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // Map backend leads to frontend format
          const mappedLeads: Lead[] = data.map((backendLead: any) => ({
            id: backendLead.id,
            name: backendLead.name,
            company: backendLead.company,
            role: "", 
            email: backendLead.email,
            status: backendLead.stage,
            source: backendLead.source,
            lastActivity: "Added to CRM",
            nextFollowUp: "-",
            addedAt: new Date(backendLead.date_added).getTime(),
            contactedAt: backendLead.last_contacted ? new Date(backendLead.last_contacted).getTime() : 0,
            followUpAt: 0,
            activities: [],
            outreach: [],
            note: { id: "n1", content: backendLead.notes || "", updatedAt: backendLead.date_added }
          }));
          setLeads(mappedLeads);
        } else {
          setError("Unable to load your leads.");
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Unable to load your leads.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (userId) {
      fetchLeads();
    }
  }, [userId, getToken]);

  const handleMoveToStage = async (leadId: string, newStage: string) => {
    // 1. Find the lead
    const leadIndex = leads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) return;
    
    const lead = leads[leadIndex];
    const oldStage = lead.status;
    
    // 2. Optimistic UI update
    const newLeads = [...leads];
    newLeads[leadIndex] = { ...lead, status: newStage };
    setLeads(newLeads);

    // 3. Backend API call
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
        body: JSON.stringify({ stage: newStage })
      });
      
      if (!response.ok) {
        throw new Error("Failed to update stage");
      }
    } catch (err) {
      console.error("Stage update failed, rolling back", err);
      // 4. Rollback on failure
      const rollbackLeads = [...leads];
      rollbackLeads[leadIndex] = { ...lead, status: oldStage };
      setLeads(rollbackLeads);
      // Ideally show a toast error here
      alert("Failed to update lead stage. Please try again.");
    }
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessFollowups = async () => {
    setIsProcessing(true);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/followups/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to process follow-ups");
      }
      const data = await response.json();
      alert(`Follow-ups processed!\nSent: ${data.stats.sent}\nSkipped: ${data.stats.skipped}\nFailed: ${data.stats.failed}\nClosed: ${data.stats.closed}`);
      
      // Reload leads after processing
      window.location.reload();
    } catch (err) {
      console.error("Process follow-ups failed", err);
      alert("Failed to process follow-ups. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mb-4">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p className="text-sm font-medium text-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Pipeline</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your leads through the sales pipeline.</p>
        </div>
        <button
          onClick={handleProcessFollowups}
          disabled={isProcessing}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Process Follow-ups"}
        </button>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex h-full gap-4 min-w-max">
          {isLoading ? (
            /* Loading Skeleton */
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col w-[300px] min-w-[300px] bg-surface/30 rounded-lg overflow-hidden border border-border/40 h-full">
                <div className="p-3 border-b border-border/40 bg-surface/50 h-11 flex items-center">
                  <div className="w-24 h-4 bg-surface-hover rounded animate-pulse"></div>
                </div>
                <div className="p-2 gap-2 flex flex-col">
                  {[1, 2].map((j) => (
                    <div key={j} className="h-24 bg-surface-hover/50 rounded-lg animate-pulse border border-border/20"></div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            AVAILABLE_STAGES.map(stage => (
              <PipelineColumn
                key={stage.id}
                stageId={stage.id}
                stageLabel={stage.label}
                leads={leads.filter(l => l.status === stage.id)}
                onMoveToStage={handleMoveToStage}
                availableStages={AVAILABLE_STAGES}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
