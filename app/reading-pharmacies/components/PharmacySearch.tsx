import { Search, X } from "lucide-react";
import styles from "../pharmacies.module.css";

type PharmacySearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export default function PharmacySearch({ query, onQueryChange }: PharmacySearchProps) {
  return (
     <div className={`${styles.search} mt-5 flex items-center gap-3 rounded-lg border px-3.5`}>
       <Search size={19} aria-hidden="true" />
       <input className="min-w-0 flex-1 py-3.5 outline-none" aria-label="Search pharmacies" placeholder="Search name or street" value={query} onChange={e => onQueryChange(e.target.value)} />
       {query && <button onClick={() => onQueryChange("")} aria-label="Clear search" className="cursor-pointer p-1"><X size={16} /></button>}
     </div>
  );
}
