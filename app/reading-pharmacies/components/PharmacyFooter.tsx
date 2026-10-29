import styles from "../pharmacies.module.css";

type PharmacyFooterProps = {
  updatedAt: string;
};

export default function PharmacyFooter({ updatedAt }: PharmacyFooterProps) {
  return (
     <footer className={`${styles.sidebarFooter} shrink-0 border-t px-6 py-4`}>
       <p>Mapped pharmacies within 6.5 km of Reading centre. Listings may be incomplete; check details before visiting.</p>
       <p className="mt-2">OSM snapshot: {updatedAt}</p>
       <a className={`${styles.sourceLink} underline underline-offset-[0.15em] mt-2 inline-block`} href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors · ODbL</a>
     </footer>
  );
}
