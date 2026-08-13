"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";

type FollowUp = {
  id: string;
  scheduled_at: string;
  note: string | null;
  status: "pending" | "completed" | "cancelled";
  completed_at: string | null;
  created_at: string;
};

type TimelineEvent = {
  id: string;
  type: 'lead_created' | 'follow_up_scheduled' | 'follow_up_completed' | 'follow_up_cancelled' | 'email_sent' | 'email_opened' | 'email_replied';
  title: string;
  description: string;
  timestamp: Date;
};

type EmailLog = {
  id: string;
  subject: string;
  sent_at: string;
  opened_at: string | null;
  open_count: number;
  replied_at: string | null;
};

export function LeadActivityTimeline({ leadId, addedAtMs }: { leadId: string; addedAtMs: number }) {
  const { getToken, userId } = useAuth();
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const headers = {
        Authorization: `Bearer ${token}`,
        ...(userId ? { "X-User-Id": userId } : {}),
      };

      const [fuRes, emailsRes] = await Promise.all([
        fetch(`${apiUrl}/api/leads/${leadId}/follow-ups`, { headers }),
        fetch(`${apiUrl}/api/leads/${leadId}/emails`, { headers })
      ]);

      if (fuRes.ok) {
        const data = await fuRes.json();
        setFollowUps(data);
      }
      
      if (emailsRes.ok) {
        const data = await emailsRes.json();
        setEmailLogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch timeline data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const [isCheckingReplies, setIsCheckingReplies] = useState(false);
  const [replyStats, setReplyStats] = useState<{ checked: number; matched: number; replies_detected: number } | null>(null);

  const checkReplies = async () => {
    try {
      setIsCheckingReplies(true);
      setReplyStats(null);
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${apiUrl}/api/email/check-replies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        }
      });
      if (res.ok) {
        const data = await res.json();
        setReplyStats(data);
        await fetchData(); // refresh timeline
        // After 5s clear the stats message
        setTimeout(() => setReplyStats(null), 5000);
      }
    } catch (err) {
      console.error("Failed to check replies:", err);
    } finally {
      setIsCheckingReplies(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
    
    // Set up an interval to refetch every 5 seconds just in case we scheduled a follow up from the side panel
    const interval = setInterval(() => {
      if (userId) fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [leadId, userId]);

  // Construct timeline events
  const events: TimelineEvent[] = [];

  // 1. Lead Created Event
  events.push({
    id: 'lead-created',
    type: 'lead_created',
    title: 'Lead created',
    description: 'Added to CRM',
    timestamp: new Date(addedAtMs)
  });

  // 2. Follow Up Events
  followUps.forEach(fu => {
    // Scheduled event
    events.push({
      id: `fu-sched-${fu.id}`,
      type: 'follow_up_scheduled',
      title: 'Follow-up scheduled',
      description: fu.note ? `"${fu.note}"` : 'No note provided',
      timestamp: new Date(fu.created_at)
    });

    if (fu.status === 'completed' && fu.completed_at) {
      events.push({
        id: `fu-comp-${fu.id}`,
        type: 'follow_up_completed',
        title: 'Follow-up completed',
        description: fu.note ? `Completed: "${fu.note}"` : 'Task completed',
        timestamp: new Date(fu.completed_at)
      });
    }

    if (fu.status === 'cancelled') {
      // For cancelled, we don't have a specific timestamp in DB since completed_at is null, 
      // but we can just use a synthetic time slightly after created_at or just the current time of fetch.
      // Ideally we would have updated_at, but we'll just use a mock time for now or updated_at if we expose it.
      // Wait, let's just use the scheduled time to place it in the past loosely, or the created_at + 1 min
      events.push({
        id: `fu-canc-${fu.id}`,
        type: 'follow_up_cancelled',
        title: 'Follow-up cancelled',
        description: fu.note ? `Cancelled: "${fu.note}"` : 'Task cancelled',
        timestamp: new Date(new Date(fu.created_at).getTime() + 1000) // synthetic timestamp
      });
    }
  });

  // 3. Email Events
  emailLogs.forEach(email => {
    // Sent event
    events.push({
      id: `email-sent-${email.id}`,
      type: 'email_sent',
      title: 'Email sent',
      description: `Subject: "${email.subject}"`,
      timestamp: new Date(email.sent_at)
    });

    // Opened event (only if opened)
    if (email.opened_at) {
      events.push({
        id: `email-open-${email.id}`,
        type: 'email_opened',
        title: 'Email opened',
        description: `Subject: "${email.subject}" (Opened ${email.open_count} time${email.open_count > 1 ? 's' : ''})`,
        timestamp: new Date(email.opened_at)
      });
    }
    // Replied event
    if (email.replied_at) {
      events.push({
        id: `email-reply-${email.id}`,
        type: 'email_replied',
        title: 'Email replied',
        description: `Subject: "Re: ${email.subject}"`,
        timestamp: new Date(email.replied_at)
      });
    }
  });

  // Sort descending (newest first)
  events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">Activity & History</h2>
        <div className="flex items-center gap-3">
          {replyStats && (
            <span className="text-xs text-green-500 font-medium">
              Checked {replyStats.checked}, Found {replyStats.replies_detected} new
            </span>
          )}
          <button 
            onClick={checkReplies} 
            disabled={isCheckingReplies}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border hover:bg-surface-hover text-muted-foreground transition-colors disabled:opacity-50"
          >
            {isCheckingReplies ? (
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            )}
            {isCheckingReplies ? "Checking..." : "Check Replies"}
          </button>
          {isLoading && <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Syncing...</span>}
        </div>
      </div>
      
      <div className="p-5">
        <div className="relative border-l border-border/60 ml-4 space-y-8 pb-2">
          {events.map((event) => (
            <div key={event.id} className="relative pl-6 group">
              <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border/60 shadow-sm transition-transform group-hover:scale-110">
                {event.type === 'follow_up_scheduled' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                )}
                {event.type === 'follow_up_completed' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5"/></svg>
                )}
                {event.type === 'follow_up_cancelled' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                )}
                {event.type === 'lead_created' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                )}
                {event.type === 'email_sent' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                )}
                {event.type === 'email_opened' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
                {event.type === 'email_replied' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                )}
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {format(event.timestamp, "MMM d · h:mm a")}
                </div>
                <div className={`text-sm font-semibold ${event.type === 'follow_up_cancelled' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {event.title}
                </div>
                <div className="text-sm text-muted-foreground bg-surface/30 p-3 rounded-md border border-border/40 mt-1 inline-block">
                  {event.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
