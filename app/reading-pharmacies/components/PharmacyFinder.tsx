"use client";
import { useMemo, useState } from "react";
import type { Pharmacy } from "../types";
import styles from "../pharmacies.module.css";
import PharmacyHeader from "./PharmacyHeader";
import PharmacySidebar from "./PharmacySidebar";
import PharmacyMapPanel from "./PharmacyMapPanel";

type PharmacyFinderProps = { pharmacies: Pharmacy[]; updatedAt: string };

export default function PharmacyFinder({ pharmacies, updatedAt }: PharmacyFinderProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return pharmacies.filter(p => `${p.name} ${p.address} ${p.postcode}`.toLowerCase().includes(term));
  }, [pharmacies, query]);
  const selected = pharmacies.find(p => p.id === selectedId);
  function showAll() { setQuery(""); setSelectedId(null); setResetKey(key => key + 1); }

  return (
    <div className={`${styles.page} flex min-h-dvh flex-col md:h-dvh md:overflow-hidden [&_button:focus-visible]:outline-[0.1875rem] [&_button:focus-visible]:outline-solid [&_button:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[0.1875rem] [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-offset-2`}>
      <PharmacyHeader title="Reading pharmacies" location="Reading, Berkshire" />
      <main className="grid flex-1 grid-cols-1 md:min-h-0 md:grid-cols-[23rem_minmax(0,1fr)] lg:grid-cols-[25rem_minmax(0,1fr)]">
        <PharmacySidebar pharmacies={results} totalCount={pharmacies.length} query={query} selectedId={selectedId} updatedAt={updatedAt} onQueryChange={value => { setQuery(value); setSelectedId(null); }} onSelect={setSelectedId} onClearSearch={showAll} />
        <PharmacyMapPanel pharmacies={results} selectedId={selectedId} selected={selected} resetKey={resetKey} onSelect={setSelectedId} onShowAll={showAll} onClose={() => setSelectedId(null)} />
      </main>
    </div>
  );
}
