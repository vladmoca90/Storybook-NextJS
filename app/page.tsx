import type { Metadata } from "next";
import MedalChart from "./components/MedalChart";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "2016 Summer Olympics Medal Count",
  description: "A D3.js visualization of the top five medal-winning countries.",
};

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.chartCard} aria-labelledby="chart-title">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Rio de Janeiro · 2016</p>
          <h1 id="chart-title">Summer Olympics medal count</h1>
          <p>Gold, silver and bronze medals won by the five leading nations.</p>
        </div>
        <MedalChart />
      </section>
    </main>
  );
}
