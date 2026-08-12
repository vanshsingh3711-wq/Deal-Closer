import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Hero() {
  const { userId } = await auth();
  return (
    <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-50 translate-y-[-20%]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center rounded-full border border-border/50 bg-surface/50 px-3 py-1 text-xs font-medium tracking-widest text-muted-foreground uppercase shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            The outreach system for developers
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Turn cold leads into <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">closed deals.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Find the right prospects, send personalized outreach, track engagement, and automate follow-ups — all from one focused workspace.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {!userId ? (
              <SignUpButton fallbackRedirectUrl="/app">
                <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  Start closing deals
                </button>
              </SignUpButton>
            ) : (
              <Link
                href="/app"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start closing deals
              </Link>
            )}
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md border border-border bg-transparent px-8 text-base font-medium text-foreground transition-all hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See how it works
            </Link>
          </div>

          {/* Supporting signal */}
          <p className="mt-5 text-sm text-muted-foreground/80">
            Built for developers who'd rather build than babysit a CRM.
          </p>
        </div>

        {/* Product Preview */}
        <div className="mt-20 relative w-full mx-auto max-w-5xl animate-fade-in-up">
          {/* Subtle outer glow for the dashboard */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-border/50 to-transparent opacity-20 blur-md"></div>
          
          <div className="relative rounded-2xl border border-border/80 bg-[#0c0c0e] shadow-2xl overflow-hidden ring-1 ring-white/5">
            
            {/* Window Chrome */}
            <div className="flex items-center px-4 h-12 border-b border-border/40 bg-surface/50 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-border/80"></div>
                <div className="w-3 h-3 rounded-full bg-border/80"></div>
                <div className="w-3 h-3 rounded-full bg-border/80"></div>
              </div>
              <div className="mx-auto flex items-center justify-center bg-background/50 border border-border/40 rounded-md px-3 py-1 w-64">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span className="text-xs text-muted-foreground">Search deals, leads, or companies...</span>
              </div>
            </div>

            {/* Application Interface */}
            <div className="flex flex-col md:flex-row h-auto min-h-[400px]">
              {/* Sidebar */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border/40 bg-surface/20 p-4 hidden sm:block">
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-foreground bg-accent/10 text-accent rounded-md flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Overview
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Leads
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
                    <div className="flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      Follow-ups
                    </div>
                    <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">12</span>
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    Templates
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Pipeline</h2>
                  <div className="flex gap-4 text-sm">
                    <div className="flex flex-col"><span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Leads</span><span className="text-foreground font-semibold">128</span></div>
                    <div className="flex flex-col"><span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Contacted</span><span className="text-foreground font-semibold">42</span></div>
                    <div className="flex flex-col"><span className="text-accent text-xs uppercase tracking-wider font-medium">Replies</span><span className="text-foreground font-semibold">8</span></div>
                  </div>
                </div>

                {/* Data List */}
                <div className="rounded-xl border border-border/40 bg-background/50 overflow-hidden divide-y divide-border/40">
                  
                  {/* Row 1 */}
                  <div className="flex items-center justify-between p-4 hover:bg-surface/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground font-medium border border-border/50">AC</div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Acme Commerce</div>
                        <div className="text-xs text-muted-foreground">Sarah Mitchell • VP of Engineering</div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                        Contacted
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-1">Opened 12m ago</span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between p-4 hover:bg-surface/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground font-medium border border-border/50">NL</div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Northstar Labs</div>
                        <div className="text-xs text-muted-foreground">James Carter • Founder</div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                        Follow-up
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Tomorrow
                      </span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between p-4 hover:bg-surface/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-foreground font-medium border border-border/50">OG</div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Orbit Goods</div>
                        <div className="text-xs text-muted-foreground">Maya Chen • CTO</div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                        Replied
                      </span>
                      <span className="text-[11px] text-green-400 mt-1">8m ago</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* Subtle bottom gradient to fade out list if long */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0c0c0e] to-transparent pointer-events-none rounded-b-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
