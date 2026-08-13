"use client";

import { useState } from "react";
import { MappedRow } from "./types";

const EXPECTED_FIELDS = [
  { key: "name", label: "Full name", required: true },
  { key: "company", label: "Company", required: true },
  { key: "email", label: "Work email", required: true },
  { key: "website", label: "Website", required: false },
  { key: "linkedin_url", label: "LinkedIn profile", required: false },
  { key: "source", label: "Source", required: false },
  { key: "notes", label: "Notes", required: false },
];

export function CsvColumnMapper({
  csvHeaders,
  onMapComplete,
  onCancel,
}: {
  csvHeaders: string[];
  onMapComplete: (mapping: Record<string, keyof MappedRow | "IGNORE">) => void;
  onCancel: () => void;
}) {
  const [mapping, setMapping] = useState<Record<string, keyof MappedRow | "IGNORE">>(() => {
    const initial: Record<string, keyof MappedRow | "IGNORE"> = {};
    csvHeaders.forEach((header) => {
      const normalized = header.toLowerCase().replace(/[^a-z0-9]/g, "");
      const match = EXPECTED_FIELDS.find(
        (f) =>
          normalized === f.key.replace(/[^a-z0-9]/g, "") ||
          normalized === f.label.toLowerCase().replace(/[^a-z0-9]/g, "")
      );
      initial[header] = match ? (match.key as keyof MappedRow) : "IGNORE";
    });
    return initial;
  });

  const handleSelectChange = (header: string, value: string) => {
    setMapping((prev) => ({
      ...prev,
      [header]: value as keyof MappedRow | "IGNORE",
    }));
  };

  const handleContinue = () => {
    onMapComplete(mapping);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-surface border border-border/60 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/40">
        <h2 className="text-lg font-semibold text-foreground">Map Columns</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Match your CSV columns to the corresponding fields in Deal Closer.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4 text-sm font-medium text-muted-foreground px-2">
          <div>CSV Column</div>
          <div className="w-8"></div>
          <div>Deal Closer Field</div>
        </div>
        
        <div className="flex flex-col gap-3">
          {csvHeaders.map((header) => (
            <div key={header} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-surface/50 border border-border/40 rounded-lg p-3">
              <div className="text-sm font-medium text-foreground truncate" title={header}>
                {header || "(Empty Header)"}
              </div>
              <div className="text-muted-foreground">→</div>
              <div>
                <select
                  value={mapping[header]}
                  onChange={(e) => handleSelectChange(header, e.target.value)}
                  className="w-full h-9 rounded-md border border-border/60 bg-surface px-3 py-1.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="IGNORE">Ignore column</option>
                  <optgroup label="Fields">
                    {EXPECTED_FIELDS.map((field) => (
                      <option key={field.key} value={field.key}>
                        {field.label} {field.required ? "*" : ""}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-surface-hover border-t border-border/40 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
