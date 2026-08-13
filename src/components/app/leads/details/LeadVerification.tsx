"use client";

import { useState } from "react";
import { Lead } from "../types";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export function LeadVerification({ lead }: { lead: Lead }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleVerify = async () => {
    try {
      setIsVerifying(true);
      setError(null);
      
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${apiUrl}/api/leads/${lead.id}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });
      
      if (!res.ok) {
        throw new Error("Failed to verify email");
      }
      
      const data = await res.json();
      
      // Check if verification provider isn't set up yet
      if (data.verification.status === "unverified" && data.verification.reason.includes("not configured")) {
        setError(data.verification.reason);
      }
      
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unable to verify this email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const status = lead.verification_status || 'unverified';

  return (
    <div className="rounded-xl border border-border/40 bg-surface/20 shadow-sm flex flex-col">
      <div className="p-5 border-b border-border/40 flex justify-between items-center">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Verification</h2>
        {status === 'verified' && <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
        {status === 'bad' && <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
        {status === 'unverified' && <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>}
      </div>
      
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-[11px] font-medium text-muted-foreground">Current Status</div>
            <div className="text-sm font-medium text-foreground flex items-center">
              {status === 'verified' && <span className="text-green-500 font-semibold">Verified</span>}
              {status === 'bad' && <span className="text-red-500 font-semibold">Bad</span>}
              {status === 'unverified' && <span className="text-amber-500 font-semibold">Unverified</span>}
            </div>
            
            {status === 'unverified' && (
              <p className="text-xs text-muted-foreground mt-1">
                Emails should be verified before outreach to protect sender reputation.
              </p>
            )}
            
            {status === 'bad' && (
              <p className="text-xs text-red-400 mt-1">
                This email address is invalid or undeliverable. Do not contact.
              </p>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent font-medium text-sm py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
          
          {error && (
            <div className="text-xs text-red-400 bg-red-400/10 p-2 rounded-md mt-1">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
