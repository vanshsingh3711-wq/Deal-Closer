import { UserButton } from "@clerk/nextjs";

export function AppTopbar({ onMenuClick, title }: { onMenuClick: () => void, title?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground md:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-foreground md:hidden">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative hidden sm:block">
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-border/60 bg-surface/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <UserButton />
      </div>
    </header>
  );
}
