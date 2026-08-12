export function LeadEmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-border/60 bg-surface/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
          {hasFilters ? (
            <>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </>
          ) : (
            <>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </>
          )}
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-foreground">No leads found</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">
        {hasFilters 
          ? "Try adjusting your search or filters to find what you're looking for." 
          : "You haven't added any leads yet. Get started by adding a new lead."}
      </p>
    </div>
  );
}
