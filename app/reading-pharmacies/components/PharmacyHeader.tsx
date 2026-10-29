import { MapPin } from "lucide-react";
import styles from "../pharmacies.module.css";

type PharmacyHeaderProps = {
  title: string;
  location: string;
};

export default function PharmacyHeader({ title, location }: PharmacyHeaderProps) {
  return (
     <header className={`${styles.header} flex min-h-18 shrink-0 flex-wrap items-center gap-x-8 gap-y-2 border-b px-5 py-4 sm:px-7`}>
       <div className="flex items-center gap-3"><span className={styles.brandCross} aria-hidden="true">✚</span><span className={styles.brand}>{title}</span></div>
       <span className={`${styles.location} flex items-center gap-2`}><MapPin size={17} />{location}</span>
     </header>
  );
}
