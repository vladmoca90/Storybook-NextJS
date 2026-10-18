"use client";

import type { CountryMedals, MedalType } from "../medal-types";
import MedalLegend from "./MedalLegend";
import MedalPlot from "./MedalPlot";
import styles from "../MedalChart.module.css";

const colors: Record<MedalType, string> = {
  Gold: "#fcc723",
  Silver: "#cfcfcf",
  Bronze: "#e38120",
};

const data: CountryMedals[] = [
  { country: "Germany", Gold: 17, Silver: 10, Bronze: 15 },
  { country: "Russian Federation", Gold: 19, Silver: 17, Bronze: 19 },
  { country: "PR China", Gold: 26, Silver: 18, Bronze: 26 },
  { country: "United Kingdom", Gold: 27, Silver: 23, Bronze: 17 },
  { country: "United States", Gold: 46, Silver: 37, Bronze: 38 },
];

export default function MedalChart() {
  return (
    <div className={styles.wrapper}>
      <MedalLegend colors={colors} />
      <MedalPlot data={data} colors={colors} />
    </div>
  );
}
