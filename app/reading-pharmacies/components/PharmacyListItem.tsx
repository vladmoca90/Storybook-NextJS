import { ChevronRight } from "lucide-react";
import type { Pharmacy } from "../types";
import styles from "../pharmacies.module.css";

type PharmacyListItemProps = {
  pharmacy: Pharmacy;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function PharmacyListItem({ pharmacy, selected, onSelect }: PharmacyListItemProps) {
  return (
     <button aria-pressed={selected} className={`${styles.pharmacyRow} transition-[background] duration-150 ease-[ease] flex w-full cursor-pointer items-center gap-3.5 border-t px-2 py-4 text-left`} onClick={() => onSelect(pharmacy.id)}>
       <span className={`${styles.medicalIcon} grid size-11 shrink-0 place-items-center rounded-full`} aria-hidden="true">+</span>
       <span className="min-w-0 flex-1"><span className={`${styles.pharmacyName} block`}>{pharmacy.name}</span><span className={`${styles.address} mt-1 block`}>{pharmacy.address || "Reading area · address not listed"}</span>{pharmacy.postcode && <span className={`${styles.address} block`}>{pharmacy.postcode}</span>}<span className={`${styles.distance} mt-1 block`}>{pharmacy.distance.toFixed(1)} km from town centre</span></span>
       <ChevronRight size={18} className="shrink-0" aria-hidden="true" />
     </button>
  );
}
