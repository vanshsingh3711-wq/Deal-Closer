"use client";

import { useState } from "react";
import Link from "next/link";
import { Lead } from "../types";
import { LeadStatusBadge } from "../LeadStatusBadge";
import { ArchiveLeadButton } from "./ArchiveLeadButton";
import { EmailComposerModal } from "./EmailComposerModal";

export function LeadHeader({ lead }: { lead: Lead }) {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const hasEmail = Boolean(lead.email);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/40">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{lead.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-base text-muted-foreground font-medium">
            <span>{lead.role} at {lead.company}</span>
            <span className="hidden sm:inline text-border/80">•</span>
            {hasEmail ? (
              <a href={`mailto:${lead.email}`} className="hover:text-foreground transition-colors hover:underline underline-offset-4 decoration-border">
                {lead.email}
              </a>
            ) : (
              <span className="text-muted-foreground italic">No email address</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <LeadStatusBadge status={lead.status} />
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-hover text-muted-foreground border border-border/40">
              Source: {lead.source}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArchiveLeadButton leadId={lead.id} />
          <Link 
            href={`/app/leads/${lead.id}/edit`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Edit lead
          </Link>
          <button 
            onClick={() => setIsComposerOpen(true)}
            disabled={!hasEmail}
            title={hasEmail ? "Send email" : "This lead doesn't have an email address."}
            className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4 20-7z"></path></svg>
            Send email
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-surface/50 text-muted-foreground shadow-sm transition-all hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent opacity-80 cursor-not-allowed" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>

      <EmailComposerModal 
        lead={lead} 
        isOpen={isComposerOpen} 
        onClose={() => setIsComposerOpen(false)} 
      />
    </>
  );
}
