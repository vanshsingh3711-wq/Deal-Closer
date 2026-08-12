export default function AutomationShowcase() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-background border-t border-border/40">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[500px] bg-accent/5 rounded-full blur-[120px] opacity-40 translate-x-[-10%] translate-y-[20%]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <span className="w-8 h-px bg-border mr-4"></span>
            Automation
            <span className="w-8 h-px bg-border ml-4"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Set it up once. Let the system hunt.
          </h2>
          <p className="text-lg text-muted-foreground">
            Deal Closer keeps prospects moving through your outreach sequence while you focus on the replies that matter.
          </p>
        </div>

        {/* Main Product Visual */}
        <div className="w-full max-w-5xl mx-auto relative animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          
          {/* Outer glow for product window */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-border/50 to-transparent opacity-20 blur-md"></div>
          
          <div className="relative rounded-2xl border border-border/80 bg-[#0c0c0e] shadow-2xl overflow-hidden ring-1 ring-white/5 flex flex-col lg:flex-row">
            
            {/* Left Column: Status Panel */}
            <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border/40 bg-surface/20 p-6 flex flex-col gap-8">
              
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-bold tracking-widest text-foreground uppercase">Automation Active</span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Campaign</div>
                  <div className="text-sm font-medium text-foreground bg-surface border border-border/50 rounded-md px-3 py-2 inline-flex">Outbound #018</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Leads</span>
                    <span className="text-2xl font-light text-foreground">128</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">In sequence</span>
                    <span className="text-2xl font-light text-foreground">74</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Replies</span>
                    <span className="text-2xl font-light text-accent">8</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Follow-ups</span>
                    <span className="text-2xl font-light text-foreground">31</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto hidden lg:block pt-6 border-t border-border/40">
                <div className="text-xs text-muted-foreground/60 leading-relaxed">
                  System operating optimally. Email warming enabled. Sending window active until 17:00.
                </div>
              </div>
            </div>

            {/* Right Column: Timeline Interface */}
            <div className="flex-1 p-6 lg:p-10 relative">
              
              {/* Timeline Connector Line */}
              <div className="absolute left-[39px] lg:left-[55px] top-[40px] lg:top-[56px] bottom-12 w-px bg-gradient-to-b from-border via-border/50 to-transparent"></div>

              <div className="space-y-8 relative">
                
                {/* Event 1 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <div className="w-12 pt-1 flex flex-col items-end text-xs text-muted-foreground font-mono shrink-0">09:12</div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-border/50 border border-background ring-4 ring-[#0c0c0e] mt-1.5 shrink-0"></div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm font-medium text-foreground">Lead imported</div>
                    <div className="text-xs text-muted-foreground mt-1">Acme Commerce · Sarah Mitchell</div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                  <div className="w-12 pt-1 flex flex-col items-end text-xs text-muted-foreground font-mono shrink-0">09:13</div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-border/50 border border-background ring-4 ring-[#0c0c0e] mt-1.5 shrink-0"></div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm font-medium text-foreground">Email verified</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      sarah@acme-commerce.example <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                  <div className="w-12 pt-1 flex flex-col items-end text-xs text-muted-foreground font-mono shrink-0">09:14</div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-border/50 border border-background ring-4 ring-[#0c0c0e] mt-1.5 shrink-0"></div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm font-medium text-foreground">Personalized opening generated</div>
                    <div className="text-xs text-muted-foreground mt-2 italic bg-surface/40 p-2 rounded border border-border/30 inline-block">
                      "Noticed Acme's recent expansion into..."
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '750ms' }}>
                  <div className="w-12 pt-1 flex flex-col items-end text-xs text-muted-foreground font-mono shrink-0">09:15</div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-border/50 border border-background ring-4 ring-[#0c0c0e] mt-1.5 shrink-0"></div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm font-medium text-foreground">Email queued</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Campaign #018
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
                  <div className="w-12 pt-1 flex flex-col items-end text-xs text-accent font-mono shrink-0">10:47</div>
                  <div className="relative z-10 w-3 h-3 rounded-full bg-accent border border-background ring-4 ring-[#0c0c0e] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.8)]"></div>
                  <div className="flex-1 pb-1">
                    <div className="text-sm font-medium text-foreground">Email opened</div>
                    <div className="text-xs text-muted-foreground mt-1">Sarah Mitchell · Acme Commerce</div>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="flex gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '1050ms' }}>
                  <div className="w-12 pt-2 flex flex-col items-end text-[10px] text-muted-foreground/60 font-mono shrink-0 uppercase tracking-widest">+2 days</div>
                  <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-surface border border-border/80 ring-4 ring-[#0c0c0e] shrink-0 -ml-[6px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="flex-1 pb-1 bg-surface/30 border border-border/40 rounded-lg p-3 -mt-1 hover:bg-surface/50 transition-colors">
                    <div className="text-sm font-medium text-foreground">Follow-up scheduled</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      Tomorrow · 10:30
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
          
          {/* Subtle Supporting Line */}
          <p className="mt-6 text-center text-sm text-muted-foreground/80">
            Your pipeline keeps moving. You only step in when a conversation starts.
          </p>
        </div>

      </div>
    </section>
  );
}
