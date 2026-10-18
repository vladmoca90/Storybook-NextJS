"use client";

import { colors, data } from "@/app/data/medals";
import MedalLegend from "./MedalLegend";
import MedalPlot from "./MedalPlot";
import styles from "../MedalChart.module.css";

export default function MedalChart() {
  return (
    <div className={styles.wrapper}>
      <MedalLegend colors={colors} />
      <MedalPlot data={data} colors={colors} />
    </div>
  );
}
