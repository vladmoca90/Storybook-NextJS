"use client";

import { colors, data } from "@/app/data/medals";
import MedalLegend from "./MedalLegend";
import MedalPlot from "./MedalPlot";

export default function MedalChart() {
  return (
    <div className={`w-[100%]`}>
      <MedalLegend colors={colors} />
      <MedalPlot data={data} colors={colors} />
    </div>
  );
}
