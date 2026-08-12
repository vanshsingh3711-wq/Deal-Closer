import { MetricCard } from "./MetricCard";
import { OutreachActivity } from "./OutreachActivity";
import { PipelineSnapshot } from "./PipelineSnapshot";
import { AttentionList } from "./AttentionList";
import { RecentActivity } from "./RecentActivity";

export function DashboardOverview() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Overview</h1>
          <p className="text-sm text-muted-foreground font-medium">Your outreach at a glance.</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-not-allowed opacity-80" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add lead
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Leads" value="1,284" subtitle="+12% this month" />
        <MetricCard title="Active Outreach" value="186" subtitle="Currently in sequence" />
        <MetricCard title="Replies" value="24" subtitle="8 this week" />
        <MetricCard title="Follow-ups Due" value="17" subtitle="Need your attention" />
      </div>

      {/* Grid Layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (takes 2/3 space on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <OutreachActivity />
          <PipelineSnapshot />
          <div className="block lg:hidden">
            <RecentActivity />
          </div>
        </div>

        {/* Right Column (takes 1/3 space on large screens) */}
        <div className="flex flex-col gap-6">
          <AttentionList />
          <div className="hidden lg:block">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
