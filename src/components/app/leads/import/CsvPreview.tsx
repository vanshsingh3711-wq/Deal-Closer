"use client";

import { useMemo } from "react";
import { PreviewRow } from "./types";

export function CsvPreview({
  previewRows,
  onReset,
  onImport,
  isLoading = false,
}: {
  previewRows: PreviewRow[];
  onReset: () => void;
  onImport: () => void;
  isLoading?: boolean;
}) {
  const readyCount = previewRows.filter((r) => r.status === "Ready").length;
  const needAttentionCount = previewRows.length - readyCount;

  return (
    <div className="w-full mt-8 bg-surface border border-border/60 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[800px]">
      <div className="p-6 border-b border-border/40 shrink-0">
        <h2 className="text-lg font-semibold text-foreground">Review Data</h2>
        <div className="flex gap-4 mt-2">
          <p className="text-sm text-foreground font-medium bg-surface-hover px-3 py-1 rounded-full border border-border/40">
            {previewRows.length} rows found
          </p>
          <p className="text-sm text-emerald-500 font-medium bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-900/50">
            {readyCount} ready to import
          </p>
          {needAttentionCount > 0 && (
            <p className="text-sm text-amber-500 font-medium bg-amber-950/30 px-3 py-1 rounded-full border border-amber-900/50">
              {needAttentionCount} need attention
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover sticky top-0 z-10 shadow-[0_1px_0_rgba(255,255,255,0.05)] text-muted-foreground">
            <tr>
              <th className="py-3 px-4 font-medium w-12">#</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Website</th>
              <th className="py-3 px-4 font-medium">LinkedIn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {previewRows.map((row) => (
              <tr key={row.index} className="hover:bg-surface-hover/50 transition-colors">
                <td className="py-3 px-4 text-muted-foreground">{row.index + 1}</td>
                <td className="py-3 px-4">
                  {row.status === "Ready" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-950/30 text-emerald-500 border border-emerald-900/30">
                      Ready
                    </span>
                  ) : row.status === "Duplicate in CSV" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-950/30 text-amber-500 border border-amber-900/30">
                      Duplicate
                    </span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-950/30 text-red-400 border border-red-900/30 w-fit">
                        Invalid
                      </span>
                      {row.errors.map((e, i) => (
                        <span key={i} className="text-[10px] text-red-400/80 leading-tight">
                          {e.message}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className={`py-3 px-4 ${row.errors.some(e => e.column === 'name') ? 'text-red-400 font-medium' : 'text-foreground'}`}>
                  {row.data.name || <span className="text-muted-foreground/50 italic">Empty</span>}
                </td>
                <td className={`py-3 px-4 ${row.errors.some(e => e.column === 'company') ? 'text-red-400 font-medium' : 'text-foreground'}`}>
                  {row.data.company || <span className="text-muted-foreground/50 italic">Empty</span>}
                </td>
                <td className={`py-3 px-4 ${row.errors.some(e => e.column === 'email') ? 'text-red-400 font-medium' : 'text-foreground'}`}>
                  {row.data.email || <span className="text-muted-foreground/50 italic">Empty</span>}
                </td>
                <td className={`py-3 px-4 ${row.errors.some(e => e.column === 'website') ? 'text-red-400 font-medium' : 'text-muted-foreground'}`}>
                  {row.data.website || "-"}
                </td>
                <td className={`py-3 px-4 ${row.errors.some(e => e.column === 'linkedin_url') ? 'text-red-400 font-medium' : 'text-muted-foreground'}`}>
                  {row.data.linkedin_url || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-surface-hover border-t border-border/40 flex justify-between shrink-0">
        <button
          onClick={onReset}
          className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Choose another file
        </button>
        <button
          onClick={onImport}
          disabled={isLoading}
          className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isLoading
              ? "bg-accent/70 text-accent-foreground/70 cursor-not-allowed"
              : "bg-accent text-accent-foreground hover:bg-accent-hover"
          }`}
        >
          {isLoading ? (
            <>
              <div className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground/30 border-r-accent-foreground"></div>
              Importing...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
