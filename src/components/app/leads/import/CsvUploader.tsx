"use client";

import { useState, useRef } from "react";

export function CsvUploader({
  onFileLoaded,
}: {
  onFileLoaded: (text: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      setError("Invalid file type. Please upload a .csv file.");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        if (text.trim() === "") {
          setError("The CSV file is empty.");
        } else {
          onFileLoaded(text);
        }
      } else {
        setError("Failed to read the file as text.");
      }
    };
    reader.onerror = () => {
      setError("An error occurred while reading the file.");
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-950/40 border border-red-900/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent/10"
            : "border-border/60 bg-surface/30 hover:bg-surface/50 hover:border-border/80"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-surface p-4 shadow-sm border border-border/40">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">Drop your CSV here</p>
            <p className="text-sm text-muted-foreground mt-1">or choose a file from your computer</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Choose CSV file
          </button>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFile(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
