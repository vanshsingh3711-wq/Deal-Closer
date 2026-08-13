"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Person = {
  id: string;
  name: string;
  title: string | null;
  profile_url: string | null;
  source_url: string;
};

type DiscoveryResult = {
  company: {
    id?: string;
    name: string | null;
    domain: string;
    website: string;
    description: string | null;
    ecommerce_platform: string;
  };
  discovered: {
    emails: string[];
    phones: string[];
    social_links: string[];
    useful_pages: Record<string, string>;
  };
};

export default function DiscoverPage() {
  const { getToken } = useAuth();
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [peopleError, setPeopleError] = useState<string | null>(null);

  const handleDiscover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const token = await getToken();
      const res = await fetch("http://localhost:8000/api/discovery/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ website }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to discover company");
      }

      const data: DiscoveryResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscoverPeople = async () => {
    if (!result?.company?.id) return;
    
    setLoadingPeople(true);
    setPeopleError(null);
    setPeople(null);

    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/company/${result.company.id}/people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to discover people");
      }

      const data = await res.json();
      setPeople(data.people);
    } catch (err: any) {
      setPeopleError(err.message || "An unexpected error occurred");
    } finally {
      setLoadingPeople(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Discover a company</h1>
        <p className="text-muted-foreground mt-1">
          Turn a company website into structured lead intelligence.
        </p>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleDiscover} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="Company website URL (e.g. https://example.com)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !website}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {loading ? "Discovering..." : "Discover company"}
            </button>
          </form>
          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40">
            <h2 className="text-xl font-semibold text-foreground">
              {result.company.name || result.company.domain}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              {result.company.domain && (
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <a href={result.company.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                    {result.company.domain}
                  </a>
                </div>
              )}
              {result.company.ecommerce_platform && result.company.ecommerce_platform !== "none" && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Platform:</span> {result.company.ecommerce_platform}
                </div>
              )}
            </div>
            {result.company.description && (
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                {result.company.description}
              </p>
            )}
            
            <div className="mt-6 pt-6 border-t border-border/40">
              <button
                onClick={handleDiscoverPeople}
                disabled={loadingPeople || !result.company.id}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2"
              >
                {loadingPeople ? "Discovering people..." : "Discover people"}
              </button>
              {peopleError && <p className="text-sm text-destructive mt-3">{peopleError}</p>}
            </div>
          </div>
          
          <div className="p-6 grid gap-6 sm:grid-cols-2">
            {result.discovered.emails.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  Public Emails
                </h3>
                <ul className="space-y-1">
                  {result.discovered.emails.map((email, i) => (
                    <li key={i} className="text-sm text-muted-foreground break-all">
                      <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.discovered.phones.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Phone Numbers
                </h3>
                <ul className="space-y-1">
                  {result.discovered.phones.map((phone, i) => (
                    <li key={i} className="text-sm text-muted-foreground break-all">
                      <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.discovered.social_links.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  Social Profiles
                </h3>
                <ul className="space-y-1">
                  {result.discovered.social_links.map((link, i) => (
                    <li key={i} className="text-sm text-muted-foreground truncate">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {new URL(link).hostname.replace('www.', '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(result.discovered.useful_pages).length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Useful Pages
                </h3>
                <ul className="space-y-1">
                  {Object.entries(result.discovered.useful_pages).map(([type, url], i) => (
                    <li key={i} className="text-sm text-muted-foreground truncate">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors capitalize">
                        {type.replace('_url', '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {people && (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/40">
            <h2 className="text-xl font-semibold text-foreground">People found</h2>
            <p className="text-sm text-muted-foreground mt-1">Discovered {people.length} people publicly associated with the company.</p>
          </div>
          <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <div key={person.id} className="p-4 rounded-lg border bg-background flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{person.name}</h3>
                  {person.title && (
                    <p className="text-sm text-muted-foreground mt-1">{person.title}</p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t flex flex-col gap-2 text-xs">
                  {person.profile_url && (
                    <a href={person.profile_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Public profile
                    </a>
                  )}
                  <a href={person.source_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Source page
                  </a>
                </div>
              </div>
            ))}
            {people.length === 0 && (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No people could be found on the public pages.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
