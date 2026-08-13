"use client";

import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/app": return "Overview";
    case "/app/leads": return "Leads";
    case "/app/outreach": return "Outreach";
    case "/app/templates": return "Templates";
    case "/app/discover": return "Discover";
    case "/app/follow-ups": return "Follow-ups";
    case "/app/analytics": return "Analytics";
    case "/app/settings": return "Settings";
    default: return "";
  }
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopbar onMenuClick={() => setIsSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
