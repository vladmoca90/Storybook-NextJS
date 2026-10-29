import type { Pharmacy } from "../types";
import PharmacyListItem from "./PharmacyListItem";
import styles from "../pharmacies.module.css";

type PharmacyListProps = {
  pharmacies: Pharmacy[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClearSearch: () => void;
};

export default function PharmacyList({ pharmacies, selectedId, onSelect, onClearSearch }: PharmacyListProps) {
  return (
     <ul className="max-h-[24rem] flex-1 overflow-y-auto px-4 md:max-h-none" aria-label="Pharmacies">
       {pharmacies.map(pharmacy => (
         <li key={pharmacy.id}>
           <PharmacyListItem pharmacy={pharmacy} selected={selectedId === pharmacy.id} onSelect={onSelect} />
         </li>
       ))}
       {!pharmacies.length && <li className="px-2 py-8"><p className={styles.pharmacyName}>No pharmacies found</p><p className={`${styles.address} mt-2`}>Try a different name, street or postcode.</p><button onClick={onClearSearch} className={`${styles.sourceLink} underline underline-offset-[0.15em] mt-3 cursor-pointer`}>Clear search</button></li>}
     </ul>
  );
}
