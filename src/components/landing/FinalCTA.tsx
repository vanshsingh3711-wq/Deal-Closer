import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function FinalCTA() {
  const { userId } = await auth();
  return (
    <section className="relative overflow-hidden py-32 sm:py-48 border-t border-border/40 bg-[#0a0a0a]">
      {/* Subtle Background Treatment: Very soft radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.01] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="flex flex-col items-center text-center animate-fade-in-up">
          
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <span className="w-8 h-px bg-border mr-4"></span>
            Ready to close?
            <span className="w-8 h-px bg-border ml-4"></span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Stop chasing leads.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover"> Start closing deals.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Build your pipeline, automate the follow-ups, and spend your time where it matters — closing conversations.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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

          {/* Closing Detail */}
          <p className="mt-10 text-sm text-muted-foreground/60 font-medium">
            No spreadsheets. No forgotten follow-ups. Just a cleaner way to close.
          </p>

        </div>
      </div>
    </section>
  );
}
