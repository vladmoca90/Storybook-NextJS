import type { Pharmacy } from "../types";
import PharmacySearch from "./PharmacySearch";
import PharmacyList from "./PharmacyList";
import PharmacyFooter from "./PharmacyFooter";
import styles from "../pharmacies.module.css";

type PharmacySidebarProps = {
  pharmacies: Pharmacy[];
  totalCount: number;
  query: string;
  selectedId: string | null;
  updatedAt: string;
  onQueryChange: (query: string) => void;
  onSelect: (id: string) => void;
  onClearSearch: () => void;
};

export default function PharmacySidebar({ pharmacies, totalCount, query, selectedId, updatedAt, onQueryChange, onSelect, onClearSearch }: PharmacySidebarProps) {
  return (
     <aside className={`${styles.sidebar} flex min-h-0 flex-col border-r`}>
       <div className="px-6 pt-7 pb-4">
         <h1 className={styles.heading}>Find a pharmacy</h1>
         <p className={`${styles.subtitle} mt-2`}>Explore pharmacies in Reading and the surrounding area.</p>
         <PharmacySearch query={query} onQueryChange={onQueryChange} />
         <div className="mt-6 flex items-center justify-between gap-3"><h2 className={styles.listHeading}>Pharmacies nearby</h2><span className={`${styles.resultCount} rounded-full px-2.5 py-1`} role="status">{pharmacies.length} of {totalCount}</span></div>
       </div>
       <PharmacyList pharmacies={pharmacies} selectedId={selectedId} onSelect={onSelect} onClearSearch={onClearSearch} />
       <PharmacyFooter updatedAt={updatedAt} />
     </aside>
  );
}
