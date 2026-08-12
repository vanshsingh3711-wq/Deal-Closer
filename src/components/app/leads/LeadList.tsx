"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LeadToolbar } from "./LeadToolbar";
import { LeadTable } from "./LeadTable";
import { LeadEmptyState } from "./LeadEmptyState";
import { MOCK_LEADS } from "./mockData";
import { SortOption } from "./types";

export function LeadList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("Recently added");

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...MOCK_LEADS];

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
  }, [searchQuery, statusFilter, sortBy]);

  const hasFilters = searchQuery !== "" || statusFilter !== "All";

  return (
    <div className="flex flex-col h-full max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Leads</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your prospects and keep every opportunity moving.</p>
        </div>
        <Link href="/app/leads/new" className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add lead
        </Link>
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
        {filteredAndSortedLeads.length > 0 ? (
          <LeadTable leads={filteredAndSortedLeads} />
        ) : (
          <LeadEmptyState hasFilters={hasFilters} />
        )}
      </div>
    </div>
  );
}
