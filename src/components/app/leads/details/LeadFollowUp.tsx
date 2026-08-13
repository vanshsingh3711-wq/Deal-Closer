"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { ScheduleFollowUpModal } from "./ScheduleFollowUpModal";

type FollowUp = {
  id: string;
  scheduled_at: string;
  note: string | null;
  status: "pending" | "completed" | "cancelled";
};

export function LeadFollowUp({ leadId, onFollowUpsChanged }: { leadId: string, onFollowUpsChanged?: () => void }) {
  const { getToken, userId } = useAuth();
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFollowUps = async () => {
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/leads/${leadId}/follow-ups`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        }
      });
      if (res.ok) {
        const data = await res.json();
        setFollowUps(data);
        if (onFollowUpsChanged) onFollowUpsChanged();
      }
    } catch (err) {
      console.error("Failed to fetch follow-ups:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchFollowUps();
  }, [leadId, userId]);

  const handleUpdateStatus = async (followUpId: string, status: "completed" | "cancelled") => {
    // Optimistic UI
    const originalFollowUps = [...followUps];
    setFollowUps(followUps.map(f => f.id === followUpId ? { ...f, status } : f));

    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/leads/${leadId}/follow-ups/${followUpId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Update failed");
      
      fetchFollowUps(); // Refresh to ensure timeline and history update properly
    } catch (err) {
      console.error(err);
      setFollowUps(originalFollowUps);
    }
  };

  const pendingFollowUps = followUps.filter(f => f.status === "pending");
  const nextFollowUp = pendingFollowUps.length > 0 ? pendingFollowUps[0] : null;

  const renderDateTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isToday(date)) return `Today · ${format(date, "h:mm a")}`;
    if (isTomorrow(date)) return `Tomorrow · ${format(date, "h:mm a")}`;
    return format(date, "MMM d, yyyy · h:mm a");
  };

  return (
    <>
      <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
        <div className="p-5 border-b border-border/40 flex justify-between items-center">
          <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {nextFollowUp && isPast(new Date(nextFollowUp.scheduled_at)) ? "Overdue Follow-up" : "Next Follow-Up"}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-medium text-accent hover:text-accent-hover hover:underline"
          >
            Schedule
          </button>
        </div>
        
        <div className="p-5">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-surface-hover rounded w-1/2"></div>
              <div className="h-10 bg-surface-hover rounded w-full"></div>
            </div>
          ) : nextFollowUp ? (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isPast(new Date(nextFollowUp.scheduled_at)) ? "text-red-500" : "text-amber-500"}>
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  {renderDateTime(nextFollowUp.scheduled_at)}
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${isPast(new Date(nextFollowUp.scheduled_at)) ? "bg-red-500/10 text-red-500 ring-red-500/20" : "bg-amber-500/10 text-amber-500 ring-amber-500/20"}`}>
                  {isPast(new Date(nextFollowUp.scheduled_at)) ? "Overdue" : "Scheduled"}
                </span>
              </div>
              
              {nextFollowUp.note && (
                <div className="text-sm text-foreground bg-surface/30 p-3 rounded-md border border-border/40 italic text-muted-foreground/90">
                  "{nextFollowUp.note}"
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => handleUpdateStatus(nextFollowUp.id, "completed")}
                  className="flex-1 px-3 py-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-md transition-colors border border-emerald-500/20"
                >
                  Complete
                </button>
                <button 
                  onClick={() => handleUpdateStatus(nextFollowUp.id, "cancelled")}
                  className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-surface-hover hover:bg-surface-hover/80 rounded-md transition-colors border border-border/40"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
              <p className="text-sm text-muted-foreground">No follow-up scheduled.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-xs font-medium text-foreground bg-surface-hover rounded-md hover:bg-surface-hover/80 transition-colors border border-border/40"
              >
                Schedule follow-up
              </button>
            </div>
          )}
        </div>
      </div>

      <ScheduleFollowUpModal 
        leadId={leadId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onScheduled={fetchFollowUps}
      />
    </>
  );
}
