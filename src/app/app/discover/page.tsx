"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Person = {
  id: string;
  name: string;
  title: string | null;
  profile_url: string | null;
  source_url: string;
  decision_maker_score?: number | null;
  decision_maker_category?: string | null;
};

type Email = {
  id: string;
  email: string;
  email_type: string;
  status: string;
  person_id: string | null;
  source_url: string | null;
  verification_status?: string;
  mx_found?: boolean;
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
  const { getToken, userId } = useAuth();
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [peopleError, setPeopleError] = useState<string | null>(null);
  const [rankingPeople, setRankingPeople] = useState(false);
  const [rankError, setRankError] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[] | null>(null);
  const [extractingEmails, setExtractingEmails] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [verifyingEmailIds, setVerifyingEmailIds] = useState<Set<string>>(new Set());
  const [bulkVerifying, setBulkVerifying] = useState<{current: number, total: number} | null>(null);

  // Add to Leads modal state
  const [leadModalData, setLeadModalData] = useState<{email: Email, person?: Person} | null>(null);
  const [leadFormData, setLeadFormData] = useState({
    name: "", company: "", email: "", website: "", linkedin_url: "", notes: ""
  });
  const [creatingLead, setCreatingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  const openLeadModal = (email: Email, person?: Person) => {
    setLeadModalData({ email, person });
    setLeadFormData({
      name: person?.name || "",
      company: result?.company?.name || result?.company?.domain || "",
      email: email.email,
      website: result?.company?.website || "",
      linkedin_url: person?.profile_url && person.profile_url.includes("linkedin.com") ? person.profile_url : "",
      notes: ""
    });
    setLeadSuccess(null);
    setLeadError(null);
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadModalData) return;
    
    setCreatingLead(true);
    setLeadError(null);
    
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/email/${leadModalData.email.id}/create-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
        body: JSON.stringify(leadFormData),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("Lead already exists for this email address.");
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to create lead");
      }

      setLeadSuccess("Lead created successfully!");
      setTimeout(() => {
        setLeadModalData(null);
        setLeadSuccess(null);
      }, 2000);
    } catch (err: any) {
      setLeadError(err.message || "An unexpected error occurred");
    } finally {
      setCreatingLead(false);
    }
  };

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
          ...(userId ? { "X-User-Id": userId } : {}),
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
          ...(userId ? { "X-User-Id": userId } : {}),
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

  const handleRankPeople = async () => {
    if (!result?.company?.id) return;
    
    setRankingPeople(true);
    setRankError(null);

    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/company/${result.company.id}/rank-people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to rank people");
      }

      const data = await res.json();
      setPeople(data.people);
    } catch (err: any) {
      setRankError(err.message || "An unexpected error occurred");
    } finally {
      setRankingPeople(false);
    }
  };

  const handleExtractEmails = async () => {
    if (!result?.company?.id) return;
    
    setExtractingEmails(true);
    setEmailError(null);

    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/company/${result.company.id}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to extract emails");
      }

      const data = await res.json();
      setEmails(data.emails);
    } catch (err: any) {
      setEmailError(err.message || "An unexpected error occurred");
    } finally {
      setExtractingEmails(false);
    }
  };

  const handleVerifyEmail = async (emailId: string) => {
    setVerifyingEmailIds(prev => new Set(prev).add(emailId));
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/email/${emailId}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
      });
      if (res.ok) {
        const verifiedEmail = await res.json();
        setEmails(prev => prev ? prev.map(e => e.id === emailId ? { ...e, ...verifiedEmail } : e) : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerifyingEmailIds(prev => {
        const next = new Set(prev);
        next.delete(emailId);
        return next;
      });
    }
  };

  const handleBulkVerifyEmails = async () => {
    if (!result?.company?.id || !emails) return;
    
    const unverified = emails.filter(e => e.verification_status === "unverified" || !e.verification_status);
    if (unverified.length === 0) return;
    
    setBulkVerifying({ current: 0, total: Math.min(25, unverified.length) });
    
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8000/api/discovery/company/${result.company.id}/verify-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(userId ? { "X-User-Id": userId } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        const updatedDict = Object.fromEntries(data.emails.map((e: any) => [e.id, e]));
        setEmails(prev => prev ? prev.map(e => updatedDict[e.id] ? { ...e, ...updatedDict[e.id] } : e) : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBulkVerifying(null);
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
          
          {emails && emails.filter(e => !e.person_id).length > 0 && (
            <div className="p-6 border-t border-border/40 bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Company-level Emails <span className="text-xs font-normal text-muted-foreground ml-2">(Publicly discovered)</span>
              </h3>
              <ul className="space-y-2">
                {emails.filter(e => !e.person_id).map((e) => (
                  <li key={e.id} className="text-sm text-foreground flex items-center justify-between bg-background p-3 border rounded-md">
                    <div className="flex flex-col gap-1">
                      <div>
                        <a href={`mailto:${e.email}`} className="font-medium hover:text-primary transition-colors">{e.email}</a>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full capitalize">{e.email_type}</span>
                        {e.source_url && (
                          <a href={e.source_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-muted-foreground hover:underline">Source</a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          e.verification_status === 'valid_format' ? 'text-green-600' :
                          e.verification_status === 'no_mail_server' || e.verification_status === 'domain_not_found' ? 'text-destructive' :
                          e.verification_status === 'unverified' || !e.verification_status ? 'text-muted-foreground' : 'text-yellow-600'
                        }`}>
                          {e.verification_status === 'valid_format' ? 'Mail server found' :
                           e.verification_status === 'no_mail_server' ? 'No mail server' :
                           e.verification_status === 'domain_not_found' ? 'Domain not found' :
                           e.verification_status === 'unverified' || !e.verification_status ? 'Unverified' : 'Could not verify'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleVerifyEmail(e.id)}
                          disabled={verifyingEmailIds.has(e.id) || !!bulkVerifying}
                          className="text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded transition-colors disabled:opacity-50"
                        >
                          {verifyingEmailIds.has(e.id) ? "Verifying..." : "Verify"}
                        </button>
                        <button
                          onClick={() => openLeadModal(e)}
                          className="text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded transition-colors"
                        >
                          Add to Leads
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {people && (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-6">
          <div className="p-6 border-b border-border/40 flex justify-between items-start flex-col sm:flex-row gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">People found</h2>
              <p className="text-sm text-muted-foreground mt-1">Discovered {people.length} people publicly associated with the company.</p>
            </div>
            {people.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 justify-end">
                <div className="flex flex-col items-end">
                  <button
                    onClick={handleRankPeople}
                    disabled={rankingPeople}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    {rankingPeople ? "Analyzing roles..." : "Rank decision makers"}
                  </button>
                  {rankError && <p className="text-sm text-destructive mt-2">{rankError}</p>}
                </div>
                
                <div className="flex flex-col items-end">
                  <button
                    onClick={handleExtractEmails}
                    disabled={extractingEmails}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    {extractingEmails ? "Finding emails..." : "Find public emails"}
                  </button>
                  {emailError && <p className="text-sm text-destructive mt-2">{emailError}</p>}
                </div>
                
                {emails && emails.some(e => e.verification_status === "unverified" || !e.verification_status) && (
                  <div className="flex flex-col items-end">
                    <button
                      onClick={handleBulkVerifyEmails}
                      disabled={!!bulkVerifying}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
                    >
                      {bulkVerifying ? `Verifying...` : "Verify emails"}
                    </button>
                  </div>
                )}
              </div>
            )}
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
                
                {person.decision_maker_score !== undefined && person.decision_maker_score !== null && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-foreground">
                        {person.decision_maker_category === 'primary' && 'Primary decision-maker candidate'}
                        {person.decision_maker_category === 'strong' && 'Strong candidate'}
                        {person.decision_maker_category === 'possible' && 'Possible decision maker'}
                        {person.decision_maker_category === 'unlikely' && 'Unlikely decision maker'}
                        {!person.decision_maker_category && 'Analyzed'}
                      </span>
                      <span className="text-xs font-bold">{person.decision_maker_score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          person.decision_maker_category === 'primary' ? 'bg-green-500' : 
                          person.decision_maker_category === 'strong' ? 'bg-blue-500' :
                          person.decision_maker_category === 'possible' ? 'bg-yellow-500' : 'bg-muted-foreground'
                        }`} 
                        style={{ width: `${Math.max(0, Math.min(100, person.decision_maker_score))}%` }}
                      ></div>
                    </div>
                  </div>
                )}

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

                {emails && emails.filter(e => e.person_id === person.id).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 flex justify-between">
                      Discovered Emails <span className="font-normal">(Public)</span>
                    </p>
                    <ul className="space-y-3">
                      {emails.filter(e => e.person_id === person.id).map(e => (
                        <li key={e.id} className="text-sm flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <a href={`mailto:${e.email}`} className="text-foreground font-medium hover:text-primary transition-colors">
                              {e.email}
                            </a>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVerifyEmail(e.id)}
                                disabled={verifyingEmailIds.has(e.id) || !!bulkVerifying}
                                className="text-[10px] font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded transition-colors disabled:opacity-50"
                              >
                                {verifyingEmailIds.has(e.id) ? "Verifying" : "Verify"}
                              </button>
                              <button
                                onClick={() => openLeadModal(e, person)}
                                className="text-[10px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded transition-colors"
                              >
                                Add to Leads
                              </button>
                            </div>
                          </div>
                          <span className={`text-[11px] font-medium ${
                            e.verification_status === 'valid_format' ? 'text-green-600' :
                            e.verification_status === 'no_mail_server' || e.verification_status === 'domain_not_found' ? 'text-destructive' :
                            e.verification_status === 'unverified' || !e.verification_status ? 'text-muted-foreground' : 'text-yellow-600'
                          }`}>
                            {e.verification_status === 'valid_format' ? 'Mail server found' :
                             e.verification_status === 'no_mail_server' ? 'No mail server' :
                             e.verification_status === 'domain_not_found' ? 'Domain not found' :
                             e.verification_status === 'unverified' || !e.verification_status ? 'Unverified' : 'Could not verify'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

      {leadModalData && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-xl shadow-lg border">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Add to Leads</h2>
              <button 
                onClick={() => !creatingLead && setLeadModalData(null)}
                className="text-muted-foreground hover:text-foreground p-2 -mr-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              {leadSuccess && (
                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                  {leadSuccess}
                </div>
              )}
              {leadError && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                  {leadError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input 
                    type="text" 
                    value={leadFormData.name} 
                    onChange={e => setLeadFormData({...leadFormData, name: e.target.value})}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <input 
                    type="text" 
                    value={leadFormData.company} 
                    onChange={e => setLeadFormData({...leadFormData, company: e.target.value})}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  value={leadFormData.email} 
                  onChange={e => setLeadFormData({...leadFormData, email: e.target.value})}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website (Optional)</label>
                <input 
                  type="url" 
                  value={leadFormData.website} 
                  onChange={e => setLeadFormData({...leadFormData, website: e.target.value})}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL (Optional)</label>
                <input 
                  type="url" 
                  value={leadFormData.linkedin_url} 
                  onChange={e => setLeadFormData({...leadFormData, linkedin_url: e.target.value})}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <textarea 
                  value={leadFormData.notes} 
                  onChange={e => setLeadFormData({...leadFormData, notes: e.target.value})}
                  className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                  placeholder="Custom notes to append to this lead..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setLeadModalData(null)}
                  disabled={creatingLead}
                  className="h-9 px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={creatingLead}
                  className="h-9 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  {creatingLead ? "Adding..." : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
