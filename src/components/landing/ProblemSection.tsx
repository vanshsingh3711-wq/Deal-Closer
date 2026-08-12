export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <span className="w-8 h-px bg-border mr-4"></span>
            The Problem
            <span className="w-8 h-px bg-border ml-4"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Your leads shouldn't live in a spreadsheet.
          </h2>
          <p className="text-lg text-muted-foreground">
            Finding prospects is only the beginning. The real time sink is everything that happens after.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          
          {/* Problem 01 */}
          <div className="flex flex-col group">
            {/* Visual Story */}
            <div className="h-48 mb-8 rounded-xl border border-border/60 bg-surface/30 p-6 flex flex-col justify-center items-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-0"></div>
              
              <div className="w-full max-w-[200px] space-y-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                {/* Abstract rows simulating spreadsheet/data entry */}
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-sm border border-border/80 bg-surface"></div>
                  <div className="h-2 rounded-full bg-border/80 w-16"></div>
                  <div className="h-2 rounded-full bg-border/50 w-24"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-sm border border-border/80 bg-surface"></div>
                  <div className="h-2 rounded-full bg-border/80 w-20"></div>
                  <div className="h-2 rounded-full bg-border/50 w-16"></div>
                </div>
                <div className="flex gap-2 items-center opacity-60">
                  <div className="w-4 h-4 rounded-sm border border-accent/40 bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-accent rounded-full"></div>
                  </div>
                  <div className="h-2 rounded-full bg-accent/40 w-12"></div>
                  <div className="h-2 rounded-full bg-accent/20 w-20"></div>
                </div>
                <div className="flex gap-2 items-center opacity-30">
                  <div className="w-4 h-4 rounded-sm border border-border/80 bg-surface"></div>
                  <div className="h-2 rounded-full bg-border/80 w-14"></div>
                  <div className="h-2 rounded-full bg-border/50 w-24"></div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="flex gap-4">
              <div className="text-muted-foreground/40 font-mono text-sm mt-1 font-medium">01</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Still copying leads by hand?</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Names, companies, websites, emails. The work adds up before you've even sent the first message.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 02 */}
          <div className="flex flex-col group">
            {/* Visual Story */}
            <div className="h-48 mb-8 rounded-xl border border-border/60 bg-surface/30 p-6 flex flex-col justify-center items-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0"></div>
              
              <div className="w-full max-w-[180px] z-10 flex flex-col opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div className="text-xs font-medium text-foreground">Email sent</div>
                </div>
                
                <div className="ml-1 w-px h-6 bg-border my-1"></div>
                
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-border"></div>
                  <div className="text-[10px] text-muted-foreground font-mono">3 days later...</div>
                </div>
                
                <div className="ml-1 w-px h-6 bg-border my-1"></div>
                
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-2 h-2 rounded-full border border-muted-foreground"></div>
                  <div className="text-xs text-muted-foreground">Follow-up?</div>
                </div>
                
                <div className="ml-1 w-px h-6 bg-border border-dashed my-1"></div>
                
                <div className="flex items-center gap-3 opacity-30">
                  <div className="w-2 h-2 rounded-full bg-border"></div>
                  <div className="text-xs text-muted-foreground line-through">Forgotten</div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="flex gap-4">
              <div className="text-muted-foreground/40 font-mono text-sm mt-1 font-medium">02</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Good leads go cold.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  You meant to follow up. Then another project landed, another email arrived, and the opportunity disappeared into the noise.
                </p>
              </div>
            </div>
          </div>

          {/* Problem 03 */}
          <div className="flex flex-col group">
            {/* Visual Story */}
            <div className="h-48 mb-8 rounded-xl border border-border/60 bg-surface/30 p-6 flex flex-col justify-center items-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/20 z-0"></div>
              
              <div className="w-full max-w-[200px] bg-background/50 border border-border/50 rounded-lg p-3 z-10 shadow-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Sent</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Opened</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Replied</span>
                    <span className="text-border font-bold">—</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-border/40 mt-1">
                    <span className="text-foreground font-medium">Next Action</span>
                    <span className="text-muted-foreground/60 font-mono">?</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="flex gap-4">
              <div className="text-muted-foreground/40 font-mono text-sm mt-1 font-medium">03</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">You send. Then guess.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Without knowing who opened, replied, or needs another touch, every follow-up becomes a guess.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
