"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { LeadToolbar } from "./LeadToolbar";
import { LeadTable } from "./LeadTable";
import { LeadEmptyState } from "./LeadEmptyState";
import { MOCK_LEADS } from "./mockData";
import { SortOption, Lead } from "./types";

export function LeadList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("Recently added");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/leads`);
        if (response.ok) {
          const data = await response.json();
          // Map backend leads to frontend format
          const mappedLeads: Lead[] = data.map((backendLead: any) => {
            const addedAtMs = new Date(backendLead.date_added).getTime();
            const contactedAtMs = backendLead.last_contacted ? new Date(backendLead.last_contacted).getTime() : 0;
            
            // Map backend stage to frontend status
            const statusMap: Record<string, any> = {
              "new": "NEW",
              "verified": "NEW", // frontend doesn't have verified
              "contacted": "CONTACTED",
              "opened": "OPENED",
              "replied": "REPLIED",
              "followup1": "CONTACTED",
              "followup2": "CONTACTED",
              "closed": "CLOSED"
            };
            
            return {
              id: backendLead.id,
              name: backendLead.name,
              company: backendLead.company,
              role: "", // No job title in phase 1 backend
              email: backendLead.email,
              status: statusMap[backendLead.stage] || "NEW",
              source: backendLead.source === "linkedin_csv" ? "LinkedIn CSV" : (backendLead.source === "directory" ? "Directory" : "Manual"),
              lastActivity: "Added to CRM",
              nextFollowUp: "-",
              addedAt: addedAtMs,
              contactedAt: contactedAtMs,
              followUpAt: 0,
              activities: [],
              outreach: [],
              note: { id: "n1", content: backendLead.notes || "", updatedAt: backendLead.date_added }
            };
          });
          setLeads(mappedLeads);
        } else {
          console.error("Failed to fetch leads");
          setLeads(MOCK_LEADS);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setLeads(MOCK_LEADS);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLeads();
  }, []);

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.role.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "Recently added":
          return b.addedAt - a.addedAt;
        case "Recently contacted":
          return b.contactedAt - a.contactedAt;
        case "Follow-up due":
          if (a.followUpAt === 0 && b.followUpAt === 0) return 0;
          if (a.followUpAt === 0) return 1;
          if (b.followUpAt === 0) return -1;
          return a.followUpAt - b.followUpAt;
        case "Company":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, statusFilter, sortBy, leads]);

  const hasFilters = searchQuery !== "" || statusFilter !== "All";

  return (
    <div className="flex flex-col h-full max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Leads</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your prospects and keep every opportunity moving.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/leads/import" className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import CSV
          </Link>
          <Link href="/app/leads/new" className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add lead
          </Link>
        </div>
      </div>

      <LeadToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="pb-12">
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-r-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground font-medium">Loading leads...</p>
          </div>
        ) : filteredAndSortedLeads.length > 0 ? (
          <LeadTable leads={filteredAndSortedLeads} />
        ) : (
          <LeadEmptyState hasFilters={hasFilters} />
        )}
      </div>
    </div>
  );
}
