import { medalTypes } from "@/app/data/medals";
import type { MedalType } from "@/app/data/types/medals";
import styles from "../MedalChart.module.css";

interface MedalLegendProps {
  colors: Record<MedalType, string>;
}

export default function MedalLegend({ colors }: MedalLegendProps) {
  return (
    <div className={`${styles.legend} flex justify-center gap-[1.75rem] [margin:0.5rem_0_0.75rem] [@media(max-width:39.9375rem)]:gap-[1rem]`} aria-label="Medal types">
      {medalTypes.map((medal) => (
        <div key={medal} className={`${styles.legendItem} flex items-center gap-[0.5625rem] [&_span]:w-[0.8125rem] [&_span]:h-[0.8125rem] [&_span]:rounded-[0.1875rem]`}>
          <span style={{ backgroundColor: colors[medal] }} />
          {medal}
        </div>
      ))}
    </div>
  );
}
