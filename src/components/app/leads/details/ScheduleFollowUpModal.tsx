import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";

type ScheduleFollowUpModalProps = {
  leadId: string;
  isOpen: boolean;
  onClose: () => void;
  onScheduled: () => void;
};

export function ScheduleFollowUpModal({ leadId, isOpen, onClose, onScheduled }: ScheduleFollowUpModalProps) {
  const { getToken, userId } = useAuth();
  
  // Default to tomorrow at 10:00 AM
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const [date, setDate] = useState<string>(format(tomorrow, "yyyy-MM-dd"));
  const [time, setTime] = useState<string>("10:00");
  const [note, setNote] = useState<string>("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Combine date and time into an ISO string
      const dateTime = new Date(`${date}T${time}`);
      const token = await getToken();
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/leads/${leadId}/follow-ups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
        body: JSON.stringify({
          scheduled_at: dateTime.toISOString(),
          note: note.trim() || undefined
        })
      });

      if (!res.ok) {
        throw new Error("Failed to schedule follow-up");
      }

      onScheduled();
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-border/40 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Schedule Follow-up</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border/40 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Time</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border/40 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Note (Optional)</label>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What should you follow up about?"
                className="w-full h-24 p-3 bg-background border border-border/40 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none custom-scrollbar"
                maxLength={1000}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground bg-surface-hover rounded-md hover:bg-surface-hover/80 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-accent-foreground bg-accent rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Scheduling..." : "Schedule follow-up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
