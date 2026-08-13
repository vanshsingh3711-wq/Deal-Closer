export interface CsvRow {
  [key: string]: string;
}

export interface MappedRow {
  name: string;
  company: string;
  email: string;
  website: string;
  linkedin_url: string;
  source: string;
  notes: string;
}

export interface ValidationError {
  column: keyof MappedRow;
  message: string;
}

export interface PreviewRow {
  index: number;
  data: MappedRow;
  errors: ValidationError[];
  status: "Ready" | "Invalid" | "Duplicate in CSV";
}

export enum ImportState {
  UPLOAD = "UPLOAD",
  MAPPING = "MAPPING",
  PREVIEW = "PREVIEW",
  RESULT = "RESULT",
}

export interface ImportResult {
  total: number;
  imported: number;
  duplicates: number;
  invalid: number;
  errors: { row: number; reason: string }[];
}
