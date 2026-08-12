export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-background border-t border-border/40">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] opacity-50 translate-x-[20%] translate-y-[10%]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Copy */}
          <div className="flex flex-col max-w-xl lg:sticky lg:top-32 animate-fade-in-up">
            <div className="mb-4 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <span className="w-8 h-px bg-border mr-4"></span>
              How it works
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              From first prospect to follow-up — without the busywork.
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Deal Closer keeps every prospect moving through the outreach process, while you focus on the conversations that matter.
            </p>

            <div className="hidden lg:flex flex-col p-6 rounded-xl border border-border/40 bg-surface/20">
              <h3 className="text-sm font-semibold text-foreground mb-4">One system. Every touchpoint.</h3>
              <div className="flex flex-col gap-2 relative">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border"></div>
                {['Lead imported', 'Verified', 'Personalized', 'Sent', 'Opened', 'Follow-up scheduled'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className={`w-2 h-2 rounded-full z-10 ${i === 4 ? 'bg-accent shadow-[0_0_8px_rgba(79,70,229,0.8)]' : 'bg-surface border border-border'}`}></div>
                    <span className={i === 4 ? 'text-foreground font-medium' : ''}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Workflow Visual */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            
            {/* Connecting Line */}
            <div className="absolute left-[27px] sm:left-[35px] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-border/10 via-border to-border/10"></div>
            
            <div className="flex flex-col gap-6">
              
              {/* Stage 1: Lead */}
              <div className="flex gap-4 sm:gap-6 group">
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground shadow-sm group-hover:border-border transition-colors z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className="flex-1 rounded-xl border border-border/40 bg-surface/30 p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">01 / Lead</h3>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">09:12</span>
                  </div>
                  <div className="text-foreground font-medium text-sm">Acme Commerce</div>
                  <div className="text-xs text-muted-foreground mt-1">Imported via CSV</div>
                </div>
              </div>

              {/* Stage 2: Verify */}
              <div className="flex gap-4 sm:gap-6 group">
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground shadow-sm group-hover:border-border transition-colors z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div className="flex-1 rounded-xl border border-border/40 bg-surface/30 p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">02 / Verify</h3>
                  </div>
                  <div className="text-foreground font-medium text-sm flex items-center gap-2">
                    Email verified
                  </div>
                  <div className="text-xs text-emerald-400/80 mt-1 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    deliverable
                  </div>
                </div>
              </div>

              {/* Stage 3: Personalize */}
              <div className="flex gap-4 sm:gap-6 group">
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground shadow-sm group-hover:border-border transition-colors z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                </div>
                <div className="flex-1 rounded-xl border border-border/40 bg-surface/30 p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">03 / Personalize</h3>
                  </div>
                  <div className="text-foreground font-medium text-sm">Opening generated</div>
                  <div className="text-xs text-muted-foreground mt-2 italic bg-background/50 p-2 rounded border border-border/30">
                    "Loved your approach to..."
                  </div>
                </div>
              </div>

              {/* Stage 4: Send */}
              <div className="flex gap-4 sm:gap-6 group">
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground shadow-sm group-hover:border-border transition-colors z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </div>
                <div className="flex-1 rounded-xl border border-border/40 bg-surface/30 p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">04 / Send</h3>
                  </div>
                  <div className="text-foreground font-medium text-sm">Campaign #018</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    Queued
                  </div>
                </div>
              </div>

              {/* Stage 5: Track (ACTIVE) */}
              <div className="flex gap-4 sm:gap-6 group relative">
                {/* Active glow */}
                <div className="absolute inset-0 bg-accent/5 rounded-xl blur-xl transition-opacity opacity-100 z-0 pointer-events-none"></div>
                
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border-2 border-accent bg-surface text-accent shadow-[0_0_15px_rgba(79,70,229,0.3)] z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div className="flex-1 rounded-xl border border-accent/40 bg-surface/60 p-4 ring-1 ring-accent/10 relative z-10 shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-accent uppercase">05 / Track</h3>
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent ring-1 ring-inset ring-accent/20">Active</span>
                  </div>
                  <div className="text-foreground font-medium text-sm">Opened</div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">12m ago</div>
                </div>
              </div>

              {/* Stage 6: Follow up */}
              <div className="flex gap-4 sm:gap-6 group">
                <div className="relative mt-2 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground shadow-sm group-hover:border-border transition-colors z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                </div>
                <div className="flex-1 rounded-xl border border-border/40 bg-surface/30 p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">06 / Follow up</h3>
                  </div>
                  <div className="text-foreground font-medium text-sm">Next touch</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Tomorrow · 10:30
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
