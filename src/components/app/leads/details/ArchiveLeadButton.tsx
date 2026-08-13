"use client";

import { useState } from "react";
import { ArchiveLeadDialog } from "./ArchiveLeadDialog";

export function ArchiveLeadButton({ leadId }: { leadId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="inline-flex h-9 items-center justify-center rounded-md border border-red-900/30 bg-surface/50 px-4 py-2 text-sm font-medium text-red-500 shadow-sm transition-all hover:bg-red-950/20 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        Archive lead
      </button>

      <ArchiveLeadDialog
        leadId={leadId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
