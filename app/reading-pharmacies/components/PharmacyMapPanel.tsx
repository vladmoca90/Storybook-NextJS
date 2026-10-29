import dynamic from "next/dynamic";
import { Map as MapIcon, MapPin } from "lucide-react";
import type { Pharmacy } from "../types";
import PharmacyDetails from "./PharmacyDetails";
import styles from "../pharmacies.module.css";

const PharmacyMap = dynamic(() => import("./PharmacyMap"), {
  ssr: false,
  loading: () => <div className={`${styles.mapLoading} absolute inset-0 grid place-items-center`} role="status">Loading the Reading map…</div>,
});

type PharmacyMapPanelProps = {
  pharmacies: Pharmacy[];
  selectedId: string | null;
  selected?: Pharmacy;
  resetKey: number;
  onSelect: (id: string) => void;
  onShowAll: () => void;
  onClose: () => void;
};

export default function PharmacyMapPanel({ pharmacies, selectedId, selected, resetKey, onSelect, onShowAll, onClose }: PharmacyMapPanelProps) {
  return (
     <section className={`${styles.mapPanel} relative order-first h-[32rem] min-w-0 md:order-none md:h-full`} aria-label="Reading pharmacy map">
       <PharmacyMap pharmacies={pharmacies} selectedId={selectedId} onSelect={onSelect} resetKey={resetKey} />
       <button onClick={onShowAll} className={`${styles.showAll} absolute top-4 right-4 z-[1000] flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3`}><MapIcon size={18} />Show all</button>
       {selected && <PharmacyDetails pharmacy={selected} onClose={onClose} />}
       {!selected && <div className={`${styles.mapCaption} absolute bottom-7 left-4 z-[1000] flex items-center gap-2 rounded-full border px-4 py-2`}><MapPin size={15} />Reading & surrounding area</div>}
     </section>
  );
}
