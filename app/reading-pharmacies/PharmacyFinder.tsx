"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ChevronRight, Map as MapIcon, MapPin, Search, X } from "lucide-react";
import type { Pharmacy } from "./types";
import PharmacyDetails from "./components/PharmacyDetails";
import styles from "./pharmacies.module.css";

const PharmacyMap = dynamic(() => import("./components/PharmacyMap"), {
  ssr: false,
  loading: () => <div className={`${styles.mapLoading} absolute inset-0 grid place-items-center`} role="status">Loading the Reading map…</div>,
});

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
      <header className={`${styles.header} flex min-h-18 shrink-0 flex-wrap items-center gap-x-8 gap-y-2 border-b px-5 py-4 sm:px-7`}>
        <div className="flex items-center gap-3"><span className={styles.brandCross} aria-hidden="true">✚</span><span className={styles.brand}>Reading pharmacies</span></div>
        <span className={`${styles.location} flex items-center gap-2`}><MapPin size={17} />Reading, Berkshire</span>
      </header>
      <main className="grid flex-1 grid-cols-1 md:min-h-0 md:grid-cols-[23rem_minmax(0,1fr)] lg:grid-cols-[25rem_minmax(0,1fr)]">
        <aside className={`${styles.sidebar} flex min-h-0 flex-col border-r`}>
          <div className="px-6 pt-7 pb-4">
            <h1 className={styles.heading}>Find a pharmacy</h1>
            <p className={`${styles.subtitle} mt-2`}>Explore pharmacies in Reading and the surrounding area.</p>
            <div className={`${styles.search} mt-5 flex items-center gap-3 rounded-lg border px-3.5`}>
              <Search size={19} aria-hidden="true" />
              <input className="min-w-0 flex-1 py-3.5 outline-none" aria-label="Search pharmacies" placeholder="Search name or street" value={query} onChange={e => { setQuery(e.target.value); setSelectedId(null); }} />
              {query && <button onClick={() => { setQuery(""); setSelectedId(null); }} aria-label="Clear search" className="cursor-pointer p-1"><X size={16} /></button>}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3"><h2 className={styles.listHeading}>Pharmacies nearby</h2><span className={`${styles.resultCount} rounded-full px-2.5 py-1`} role="status">{results.length} of {pharmacies.length}</span></div>
          </div>
          <ul className="max-h-[24rem] flex-1 overflow-y-auto px-4 md:max-h-none" aria-label="Pharmacies">
            {results.map(p => <li key={p.id}>
              <button aria-pressed={selectedId === p.id} className={`${styles.pharmacyRow} transition-[background] duration-150 ease-[ease] flex w-full cursor-pointer items-center gap-3.5 border-t px-2 py-4 text-left`} onClick={() => setSelectedId(p.id)}>
                <span className={`${styles.medicalIcon} grid size-11 shrink-0 place-items-center rounded-full`} aria-hidden="true">+</span>
                <span className="min-w-0 flex-1"><span className={`${styles.pharmacyName} block`}>{p.name}</span><span className={`${styles.address} mt-1 block`}>{p.address || "Reading area · address not listed"}</span>{p.postcode && <span className={`${styles.address} block`}>{p.postcode}</span>}<span className={`${styles.distance} mt-1 block`}>{p.distance.toFixed(1)} km from town centre</span></span>
                <ChevronRight size={18} className="shrink-0" aria-hidden="true" />
              </button>
            </li>)}
            {!results.length && <li className="px-2 py-8"><p className={styles.pharmacyName}>No pharmacies found</p><p className={`${styles.address} mt-2`}>Try a different name, street or postcode.</p><button onClick={showAll} className={`${styles.sourceLink} underline underline-offset-[0.15em] mt-3 cursor-pointer`}>Clear search</button></li>}
          </ul>
          <footer className={`${styles.sidebarFooter} shrink-0 border-t px-6 py-4`}>
            <p>Mapped pharmacies within 6.5 km of Reading centre. Listings may be incomplete; check details before visiting.</p>
            <p className="mt-2">OSM snapshot: {updatedAt}</p>
            <a className={`${styles.sourceLink} underline underline-offset-[0.15em] mt-2 inline-block`} href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors · ODbL</a>
          </footer>
        </aside>
        <section className={`${styles.mapPanel} relative order-first h-[32rem] min-w-0 md:order-none md:h-full`} aria-label="Reading pharmacy map">
          <PharmacyMap pharmacies={results} selectedId={selectedId} onSelect={setSelectedId} resetKey={resetKey} />
          <button onClick={showAll} className={`${styles.showAll} absolute top-4 right-4 z-[1000] flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3`}><MapIcon size={18} />Show all</button>
          {selected && <PharmacyDetails pharmacy={selected} onClose={() => setSelectedId(null)} />}
          {!selected && <div className={`${styles.mapCaption} absolute bottom-7 left-4 z-[1000] flex items-center gap-2 rounded-full border px-4 py-2`}><MapPin size={15} />Reading & surrounding area</div>}
        </section>
      </main>
    </div>
  );
}
