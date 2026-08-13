import { CsvRow } from "../types";

export function parseCSV(csvText: string): { headers: string[]; rows: CsvRow[] } {
  const normalizedText = csvText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines: string[] = [];
  let currentLine = "";
  let inQuotes = false;

  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    
    if (char === '"') {
      if (inQuotes && normalizedText[i + 1] === '"') {
        // Escaped quote
        currentLine += '"';
        i++; // skip the next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine);
      currentLine = "";
    } else {
      currentLine += char;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Parse a single line into values
  const parseLine = (line: string): string[] => {
    const values: string[] = [];
    let currentVal = "";
    let inQ = false;
    
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') {
          currentVal += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (c === ',' && !inQ) {
        values.push(currentVal.trim());
        currentVal = "";
      } else {
        currentVal += c;
      }
    }
    values.push(currentVal.trim());
    return values;
  };

  const rawHeaders = parseLine(lines[0]);
  const headers = rawHeaders.map(h => h.trim().toLowerCase());

  const rows: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = parseLine(lines[i]);
    const row: CsvRow = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] || "";
    }
    rows.push(row);
  }

  return { headers, rows };
}
