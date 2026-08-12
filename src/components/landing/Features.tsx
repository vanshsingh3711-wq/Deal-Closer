export default function Features() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <span className="w-8 h-px bg-border mr-4"></span>
            Features
            <span className="w-8 h-px bg-border ml-4"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Everything you need to close more deals.
          </h2>
          <p className="text-lg text-muted-foreground">
            From the first prospect to the final follow-up, Deal Closer keeps your outreach organized, personalized, and moving.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          
          {/* Feature 1: Lead Intelligence (Full Width / Span 6) */}
          <div className="col-span-1 md:col-span-6 group relative rounded-2xl border border-border/60 bg-surface/30 p-1 overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full flex flex-col lg:flex-row rounded-xl overflow-hidden bg-[#0c0c0e]/80">
              {/* UI Mockup */}
              <div className="flex-1 p-6 lg:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border/40">
                <div className="w-full max-w-2xl rounded-lg border border-border/50 bg-surface/50 shadow-2xl overflow-hidden ring-1 ring-white/5">
                  <div className="flex items-center px-4 py-3 border-b border-border/40 bg-background/50">
                    <div className="text-sm font-medium text-foreground">Lead Database</div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="px-2 py-1 rounded bg-surface border border-border/50 text-[10px] text-muted-foreground">Filter</div>
                      <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-[10px] text-accent font-medium">Add Lead</div>
                    </div>
                  </div>
                  <div className="divide-y divide-border/40 text-sm">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-surface/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <div className="col-span-4">Contact</div>
                      <div className="col-span-3">Company</div>
                      <div className="col-span-3">Status</div>
                      <div className="col-span-2 text-right">Action</div>
                    </div>
                    {/* Row 1 */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-surface/30 transition-colors">
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-bold border border-blue-500/20">SM</div>
                        <div className="truncate">
                          <div className="text-foreground font-medium truncate">Sarah Mitchell</div>
                          <div className="text-muted-foreground text-xs truncate">Head of Growth</div>
                        </div>
                      </div>
                      <div className="col-span-3 text-muted-foreground text-xs flex items-center">Acme Commerce</div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Verified
                        </span>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="p-1 rounded hover:bg-surface border border-transparent hover:border-border text-muted-foreground cursor-pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-surface/30 transition-colors">
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold border border-amber-500/20">JL</div>
                        <div className="truncate">
                          <div className="text-foreground font-medium truncate">James Lin</div>
                          <div className="text-muted-foreground text-xs truncate">CEO</div>
                        </div>
                      </div>
                      <div className="col-span-3 text-muted-foreground text-xs flex items-center">Northstar Labs</div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Verified
                        </span>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="p-1 rounded hover:bg-surface border border-transparent hover:border-border text-muted-foreground cursor-pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 lg:p-8 lg:w-[320px] flex flex-col justify-center">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Lead Intelligence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Find and organize the prospects worth pursuing. Verify emails automatically and keep all contact context in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Personalized Outreach (Span 4) */}
          <div className="col-span-1 md:col-span-4 group relative rounded-2xl border border-border/60 bg-surface/30 p-6 flex flex-col sm:flex-row gap-6 overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-1 flex flex-col relative z-10">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Personalized Outreach</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Create relevant outreach instead of sending the same message to everyone. Stand out in the inbox.
              </p>
            </div>
            {/* Visual */}
            <div className="w-full sm:w-64 h-32 rounded-lg border border-border/50 bg-background/80 shadow-inner flex flex-col p-3 relative z-10 text-xs overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2 text-muted-foreground">
                <span>To: Sarah Mitchell</span>
                <span className="text-[10px]">Draft</span>
              </div>
              <div className="font-medium text-foreground mb-1 truncate">Subject: Scaling Acme Commerce</div>
              <div className="text-muted-foreground line-clamp-2 leading-relaxed">
                Hey Sarah — noticed <span className="text-accent bg-accent/10 px-1 rounded">Acme recently</span> launched the new checkout flow. Loved your approach to...
              </div>
            </div>
          </div>

          {/* Feature 3: Engagement Tracking (Span 2) */}
          <div className="col-span-1 md:col-span-2 group relative rounded-2xl border border-border/60 bg-surface/30 p-6 flex flex-col overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Engagement Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Know exactly what happens after you hit send.
              </p>
            </div>
            {/* Visual */}
            <div className="flex-1 rounded-lg border border-border/50 bg-background/80 p-3 relative z-10 text-xs flex flex-col gap-2">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-border"></div><span className="text-muted-foreground">Email sent</span></div><span className="text-[10px] text-muted-foreground/60">09:00</span></div>
              <div className="ml-[3px] w-px h-2 bg-border"></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div><span className="text-foreground">Opened</span></div><span className="text-[10px] text-accent">12m ago</span></div>
              <div className="ml-[3px] w-px h-2 bg-border/40"></div>
              <div className="flex items-center justify-between opacity-50"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full border border-muted-foreground"></div><span className="text-muted-foreground">Clicked</span></div></div>
            </div>
          </div>

          {/* Feature 4: Automated Follow-ups (Span 2) */}
          <div className="col-span-1 md:col-span-2 group relative rounded-2xl border border-border/60 bg-surface/30 p-6 flex flex-col overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M12 14v6"></path><path d="M9 17h6"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Automated Follow-ups</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Never lose a good prospect because you forgot to follow up.
              </p>
            </div>
            {/* Visual */}
            <div className="flex-1 rounded-lg border border-border/50 bg-background/80 p-3 relative z-10 text-xs flex flex-col justify-center items-center gap-2">
              <div className="w-full flex items-center gap-2">
                <div className="h-6 flex-1 rounded bg-surface border border-border/50 flex items-center px-2 text-muted-foreground">Initial email</div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> +2 days</div>
              <div className="w-full flex items-center gap-2">
                <div className="h-6 flex-1 rounded bg-accent/10 border border-accent/20 flex items-center px-2 text-accent font-medium">Follow-up #1</div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground opacity-60"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> +4 days</div>
            </div>
          </div>

          {/* Feature 5: Reply Detection (Span 2) */}
          <div className="col-span-1 md:col-span-2 group relative rounded-2xl border border-border/60 bg-surface/30 p-6 flex flex-col overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Reply Detection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Surface conversations that actually need your attention.
              </p>
            </div>
            {/* Visual */}
            <div className="flex-1 rounded-lg border border-border/50 bg-background/80 p-3 relative z-10 text-xs flex flex-col gap-2 shadow-inner">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400">Reply received</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded bg-surface flex items-center justify-center text-[10px] text-muted-foreground border border-border/50 shrink-0 mt-0.5">SM</div>
                <div className="bg-surface/50 border border-border/40 rounded-lg rounded-tl-none p-2 text-foreground relative group-hover:bg-surface/80 transition-colors">
                  Interested — let's talk. Do you have time next Tuesday?
                </div>
              </div>
            </div>
          </div>

          {/* Feature 6: Outreach Controls (Span 2) */}
          <div className="col-span-1 md:col-span-2 group relative rounded-2xl border border-border/60 bg-surface/30 p-6 flex flex-col overflow-hidden transition-all hover:border-border hover:bg-surface/40 hover:shadow-lg hover:shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border/80 flex items-center justify-center mb-4 text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Outreach Controls</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Keep sending controlled and intentional.
              </p>
            </div>
            {/* Visual */}
            <div className="flex-1 rounded-lg border border-border/50 bg-background/80 p-3 relative z-10 text-xs flex flex-col gap-3 justify-center">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground">Daily limit</span>
                  <span className="text-foreground font-mono text-[10px]">35 / 50</span>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[70%]"></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/40">
                <span className="text-muted-foreground">Sending window</span>
                <span className="text-foreground">9am - 5pm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Follow-up delay</span>
                <span className="text-foreground">2 days</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
