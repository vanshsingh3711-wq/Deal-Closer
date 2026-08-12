"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CreateLeadInput = {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
  source: string;
  status: string;
  notes: string;
};

export function AddLeadForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<CreateLeadInput>({
    name: "",
    email: "",
    jobTitle: "",
    company: "",
    website: "",
    linkedin: "",
    source: "Manual",
    status: "NEW",
    notes: ""
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CreateLeadInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof CreateLeadInput, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.website && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }
    
    if (formData.linkedin && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate rapid frontend validation success
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 400);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col h-full max-w-[800px] mx-auto py-12 md:py-24">
        <div className="flex flex-col items-center justify-center p-8 md:p-16 text-center rounded-2xl border border-border/40 bg-surface/20 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-6 border border-emerald-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">Lead added</h2>
          <p className="text-muted-foreground mb-10 max-w-sm leading-relaxed">
            <span className="font-medium text-foreground">{formData.name}</span> has been added to your pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                setFormData({
                  name: "", email: "", jobTitle: "", company: "", website: "", linkedin: "", source: "Manual", status: "NEW", notes: ""
                });
                setIsSuccess(false);
              }}
              className="inline-flex h-10 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-6 font-medium text-foreground transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Add another lead
            </button>
            <Link 
              href="/app/leads"
              className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View leads
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-[800px] mx-auto">
      <div className="mb-6">
        <Link 
          href="/app/leads" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 transition-transform group-hover:-translate-x-0.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to leads
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Add lead</h1>
        <p className="text-sm text-muted-foreground font-medium">Add a prospect to your outreach pipeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-12">
        {/* Contact Information */}
        <section>
          <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border/40">Contact information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full name <span className="text-accent">*</span>
              </label>
              <input 
                id="name"
                type="text" 
                placeholder="Sarah Mitchell"
                value={formData.name}
                onChange={(e) => { setFormData({...formData, name: e.target.value}); if (errors.name) setErrors({...errors, name: undefined}); }}
                className={`h-10 rounded-md border ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/60 focus:border-accent focus:ring-accent'} bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.name && <span className="text-xs text-red-400 font-medium">{errors.name}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Work email <span className="text-accent">*</span>
              </label>
              <input 
                id="email"
                type="text" 
                placeholder="sarah@company.example"
                value={formData.email}
                onChange={(e) => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: undefined}); }}
                className={`h-10 rounded-md border ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/60 focus:border-accent focus:ring-accent'} bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.email && <span className="text-xs text-red-400 font-medium">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2 md:w-[calc(50%-0.75rem)]">
              <label htmlFor="jobTitle" className="text-sm font-medium text-foreground flex items-center justify-between">
                Job title <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Optional</span>
              </label>
              <input 
                id="jobTitle"
                type="text" 
                placeholder="Head of Growth"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                className="h-10 rounded-md border border-border/60 bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section>
          <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border/40">Company information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2 md:w-[calc(50%-0.75rem)]">
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                Company <span className="text-accent">*</span>
              </label>
              <input 
                id="company"
                type="text" 
                placeholder="Acme Commerce"
                value={formData.company}
                onChange={(e) => { setFormData({...formData, company: e.target.value}); if (errors.company) setErrors({...errors, company: undefined}); }}
                className={`h-10 rounded-md border ${errors.company ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/60 focus:border-accent focus:ring-accent'} bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.company && <span className="text-xs text-red-400 font-medium">{errors.company}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="website" className="text-sm font-medium text-foreground flex items-center justify-between">
                Website <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Optional</span>
              </label>
              <input 
                id="website"
                type="text" 
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => { setFormData({...formData, website: e.target.value}); if (errors.website) setErrors({...errors, website: undefined}); }}
                className={`h-10 rounded-md border ${errors.website ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/60 focus:border-accent focus:ring-accent'} bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.website && <span className="text-xs text-red-400 font-medium">{errors.website}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="linkedin" className="text-sm font-medium text-foreground flex items-center justify-between">
                LinkedIn profile <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Optional</span>
              </label>
              <input 
                id="linkedin"
                type="text" 
                placeholder="https://linkedin.com/in/example"
                value={formData.linkedin}
                onChange={(e) => { setFormData({...formData, linkedin: e.target.value}); if (errors.linkedin) setErrors({...errors, linkedin: undefined}); }}
                className={`h-10 rounded-md border ${errors.linkedin ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/60 focus:border-accent focus:ring-accent'} bg-surface/50 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.linkedin && <span className="text-xs text-red-400 font-medium">{errors.linkedin}</span>}
            </div>
          </div>
        </section>

        {/* Outreach */}
        <section>
          <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border/40">Outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="source" className="text-sm font-medium text-foreground">
                Lead source
              </label>
              <div className="relative">
                <select 
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="h-10 w-full rounded-md border border-border/60 bg-surface/50 pl-3 pr-8 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer transition-colors"
                >
                  <option value="Manual">Manual</option>
                  <option value="CSV Import">CSV Import</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-medium text-foreground">
                Status
              </label>
              <div className="relative">
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="h-10 w-full rounded-md border border-border/60 bg-surface/50 pl-3 pr-8 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer transition-colors"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="OPENED">Opened</option>
                  <option value="REPLIED">Replied</option>
                  <option value="INTERESTED">Interested</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="notes" className="text-sm font-medium text-foreground flex items-center justify-between">
                Notes <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Optional</span>
              </label>
              <textarea 
                id="notes"
                placeholder="Add context about this prospect..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={4}
                className="rounded-md border border-border/60 bg-surface/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4 mt-4 border-t border-border/20">
          <Link 
            href="/app/leads"
            className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md px-6 font-medium text-foreground transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-80 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add lead"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
