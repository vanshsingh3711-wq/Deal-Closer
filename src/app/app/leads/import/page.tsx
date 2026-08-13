"use client";

import { useState } from "react";
import Link from "next/link";
import { CsvRow, MappedRow, PreviewRow, ValidationError, ImportState, ImportResult } from "@/components/app/leads/import/types";
import { parseCSV } from "@/components/app/leads/import/utils/csvParser";
import { CsvUploader } from "@/components/app/leads/import/CsvUploader";
import { CsvColumnMapper } from "@/components/app/leads/import/CsvColumnMapper";
import { CsvPreview } from "@/components/app/leads/import/CsvPreview";

export default function ImportLeadsPage() {
  const [importState, setImportState] = useState<ImportState>(ImportState.UPLOAD);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<CsvRow[]>([]);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileLoaded = (text: string) => {
    const { headers, rows } = parseCSV(text);
    setCsvHeaders(headers);
    setRawRows(rows);
    setImportState(ImportState.MAPPING);
  };

  const validateRow = (row: MappedRow): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (!row.name || row.name.trim() === "") {
      errors.push({ column: "name", message: "Name is required" });
    }
    
    if (!row.company || row.company.trim() === "") {
      errors.push({ column: "company", message: "Company is required" });
    }
    
    if (!row.email || row.email.trim() === "") {
      errors.push({ column: "email", message: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      errors.push({ column: "email", message: "Invalid email format" });
    }

    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (row.website && row.website.trim() !== "" && !urlRegex.test(row.website)) {
      errors.push({ column: "website", message: "Invalid URL format" });
    }
    if (row.linkedin_url && row.linkedin_url.trim() !== "" && !urlRegex.test(row.linkedin_url)) {
      errors.push({ column: "linkedin_url", message: "Invalid URL format" });
    }

    return errors;
  };

  const handleMapComplete = (mapping: Record<string, keyof MappedRow | "IGNORE">) => {
    const processed: PreviewRow[] = [];
    const seenEmails = new Set<string>();

    rawRows.forEach((raw, index) => {
      // Build mapped data
      const data: Partial<MappedRow> = {
        name: "",
        company: "",
        email: "",
        website: "",
        linkedin_url: "",
        source: "linkedin_csv", // default or mapped
        notes: "",
      };

      for (const [csvCol, crmField] of Object.entries(mapping)) {
        if (crmField !== "IGNORE") {
          data[crmField] = raw[csvCol] || "";
        }
      }

      const mappedRow = data as MappedRow;
      const errors = validateRow(mappedRow);
      let status: PreviewRow["status"] = errors.length > 0 ? "Invalid" : "Ready";

      // Duplicate check (case insensitive)
      const normalizedEmail = mappedRow.email.trim().toLowerCase();
      if (normalizedEmail) {
        if (seenEmails.has(normalizedEmail)) {
          status = "Duplicate in CSV";
          errors.push({ column: "email", message: "Duplicate email found within CSV" });
        } else {
          seenEmails.add(normalizedEmail);
        }
      }

      processed.push({
        index,
        data: mappedRow,
        errors,
        status,
      });
    });

    setPreviewRows(processed);
    setImportState(ImportState.PREVIEW);
  };

  const reset = () => {
    setImportState(ImportState.UPLOAD);
    setCsvHeaders([]);
    setRawRows([]);
    setPreviewRows([]);
    setImportResult(null);
    setErrorMsg(null);
  };

  const handleFinalImport = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const payload = {
        leads: previewRows.map((r) => r.data)
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/leads/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to import leads");
      }

      const result = await response.json();
      setImportResult(result);
      setImportState(ImportState.RESULT);
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[1400px]">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/app/leads" 
          className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-surface-hover"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mb-1">Import leads</h1>
          <p className="text-sm text-muted-foreground font-medium">Upload a CSV of prospects and review the data before importing.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-red-950/40 border border-red-900/50 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}

      {importState === ImportState.RESULT && importResult ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface border border-border/60 rounded-xl shadow-sm">
          <div className="rounded-full bg-emerald-950/30 p-4 border border-emerald-900/50 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Import complete</h2>
          
          <div className="flex flex-col gap-3 my-6 w-full max-w-sm">
            <div className="flex justify-between items-center p-3 rounded-md bg-surface-hover border border-border/40">
              <span className="flex items-center text-sm font-medium text-foreground">
                <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Leads added
              </span>
              <span className="text-sm font-bold text-foreground">{importResult.imported}</span>
            </div>
            
            {(importResult.duplicates > 0 || importResult.invalid > 0) && (
              <div className="flex justify-between items-center p-3 rounded-md bg-surface-hover border border-border/40">
                <span className="flex items-center text-sm font-medium text-muted-foreground">
                  <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                  Duplicates skipped
                </span>
                <span className="text-sm font-bold text-muted-foreground">{importResult.duplicates}</span>
              </div>
            )}

            {importResult.invalid > 0 && (
              <div className="flex justify-between items-center p-3 rounded-md bg-surface-hover border border-border/40">
                <span className="flex items-center text-sm font-medium text-muted-foreground">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Rows need attention
                </span>
                <span className="text-sm font-bold text-muted-foreground">{importResult.invalid}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              href="/app/leads"
              className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover"
            >
              View leads
            </Link>
            <button
              onClick={reset}
              className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover"
            >
              Import another CSV
            </button>
          </div>
        </div>
      ) : (
        <>
          {importState === ImportState.UPLOAD && (
            <CsvUploader onFileLoaded={handleFileLoaded} />
          )}

          {importState === ImportState.MAPPING && (
            <CsvColumnMapper 
              csvHeaders={csvHeaders} 
              onMapComplete={handleMapComplete} 
              onCancel={reset} 
            />
          )}

          {importState === ImportState.PREVIEW && (
            <CsvPreview 
              previewRows={previewRows} 
              onReset={reset} 
              onImport={handleFinalImport} 
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </div>
  );
}
