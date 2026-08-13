import Link from "next/link";
import { Lead } from "../types";
import { LeadHeader } from "./LeadHeader";
import { LeadActivityTimeline } from "./LeadActivityTimeline";
import { LeadInfo } from "./LeadInfo";
import { LeadOutreachHistory } from "./LeadOutreachHistory";
import { LeadFollowUp } from "./LeadFollowUp";
import { LeadNotes } from "./LeadNotes";
import { LeadVerification } from "./LeadVerification";

export function LeadDetails({ lead }: { lead: Lead }) {
  return (
    <div className="flex flex-col h-full max-w-[1400px]">
      <div className="mb-6">
        <Link 
          href="/app/leads" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 transition-transform group-hover:-translate-x-0.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to leads
        </Link>
      </div>

      <LeadHeader lead={lead} />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 pb-12">
        {/* Left Column - Main Activity (2/3 width on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
          <LeadActivityTimeline activities={lead.activities} />
          <LeadOutreachHistory outreach={lead.outreach} />
          <LeadNotes note={lead.note} />
        </div>

        {/* Right Column - Info Sidebar (1/3 width on desktop) */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <LeadInfo lead={lead} />
          <LeadVerification lead={lead} />
          <LeadFollowUp nextFollowUp={lead.nextFollowUp} />
        </div>
      </div>
    </div>
  );
}
