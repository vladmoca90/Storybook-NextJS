import { ArrowUpRight, Clock3, MapPin, Phone, X } from "lucide-react";
import type { Pharmacy } from "../types";
import styles from "../pharmacies.module.css";

type PharmacyDetailsProps = { pharmacy: Pharmacy; onClose: () => void };

export default function PharmacyDetails({ pharmacy, onClose }: PharmacyDetailsProps) {
  return (
    <section className={`${styles.details} absolute right-4 bottom-14 left-4 z-[1000] rounded-2xl border p-5 sm:right-auto sm:left-6 sm:w-[22rem]`} aria-label="Selected pharmacy" aria-live="polite">
      <button className={`${styles.close} absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-full`} onClick={onClose} aria-label="Close pharmacy details"><X size={18} /></button>
      <div className="mb-4 flex items-start gap-3 pr-5">
        <span className={`${styles.medicalIcon} grid size-10 shrink-0 place-items-center rounded-full`} aria-hidden="true">+</span>
        <div><h2 className={styles.detailTitle}>{pharmacy.name}</h2><p className={`${styles.muted} mt-1`}>{pharmacy.address || "Street address not listed"}{pharmacy.postcode ? `, ${pharmacy.postcode}` : ""}</p></div>
      </div>
      <div className={`${styles.detailMeta} mb-4 grid gap-2`}>
        <p className="flex items-center gap-2"><MapPin size={15} />{pharmacy.distance.toFixed(1)} km from Reading town centre</p>
        {pharmacy.phone && <a className="flex items-center gap-2" href={`tel:${pharmacy.phone.replace(/[^+\d]/g, "")}`}><Phone size={15} />{pharmacy.phone}</a>}
        {pharmacy.openingHours && <p className="flex items-start gap-2"><Clock3 size={15} className="mt-0.5 shrink-0" /><span>Listed hours: {pharmacy.openingHours}</span></p>}
      </div>
      <a className={`${styles.directions} flex items-center justify-center gap-2 rounded-lg px-4 py-3`} href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a>
      <a href={pharmacy.sourceUrl} target="_blank" rel="noreferrer" className={`${styles.sourceLink} underline underline-offset-[0.15em] mt-3 block text-center`}>View OpenStreetMap listing ↗</a>
    </section>
  );
}
