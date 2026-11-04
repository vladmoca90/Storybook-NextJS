"use client";

export function PrintButton() {
  return <button className="cv-print" onClick={() => window.print()}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7z" /></svg>Print CV</button>;
}
