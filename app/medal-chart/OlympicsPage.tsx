import MedalChart from "./components/MedalChart";
import styles from "./OlympicsPage.module.css";

export default function OlympicsPage() {
  return (
    <main className={`${styles.page} min-h-[100vh] grid place-items-center [padding:3rem_1.5rem] [@media(max-width:39.9375rem)]:items-start [@media(max-width:39.9375rem)]:[padding:1.25rem_0.625rem]`}>
      <section
        className={`${styles.chartCard} [width:min(100%,_65rem)] [padding:2.625rem_2.625rem_1.625rem] border-[0.0625rem] rounded-[1.125rem] [@media(max-width:39.9375rem)]:[padding:1.75rem_0.75rem_1rem] [@media(max-width:39.9375rem)]:rounded-[0.875rem]`}
        aria-labelledby="chart-title"
      >
        <div className={`${styles.heading} text-center [&_h1]:[margin:0.25rem_0_0.5rem] [&_>_p:last-child]:[margin:0_auto_1.375rem] [@media(max-width:39.9375rem)]:[&_>_p:last-child]:[padding:0_0.75rem]`}>
          <p className={`${styles.eyebrow} m-[0]`}>
            Rio de Janeiro · 2016
          </p>

          <h1 id="chart-title">
            Summer Olympics medal count
          </h1>

          <p>
            Gold, silver and bronze medals won by the
            five leading nations.
          </p>
        </div>

        <MedalChart />
      </section>
    </main>
  );
}