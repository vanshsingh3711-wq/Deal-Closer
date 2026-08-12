"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { proxyFetch } from "@/proxy";

export function ArchiveLeadDialog({ 
  leadId, 
  isOpen, 
  onClose 
}: { 
  leadId: string; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [isArchiving, setIsArchiving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!isOpen) return null;

  const handleArchive = async () => {
    setIsArchiving(true);
    setError(null);
    try {
      const res = await proxyFetch(`/api/leads/${leadId}/archive`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived: true }),
      });

      if (!res.ok) {
        throw new Error("Failed to archive lead");
      }

      // Briefly wait to show success or just navigate immediately
      onClose();
      router.push("/app/leads");
      router.refresh();
    } catch (err) {
      setError("Unable to archive this lead. Please try again.");
      setIsArchiving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border/60 bg-surface p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-semibold text-foreground mb-2">Archive lead?</h2>
        <p className="text-muted-foreground mb-6">
          This lead will be removed from your active pipeline. You can restore it later.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-950/40 border border-red-900/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isArchiving}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleArchive}
            disabled={isArchiving}
            className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isArchiving ? "Archiving..." : "Archive lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
