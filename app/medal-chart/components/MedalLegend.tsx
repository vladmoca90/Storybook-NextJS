import { medalTypes, type MedalType } from "../medal-types";
import styles from "../MedalChart.module.css";

interface MedalLegendProps {
  colors: Record<MedalType, string>;
}

export default function MedalLegend({ colors }: MedalLegendProps) {
  return (
    <div className={styles.legend} aria-label="Medal types">
      {medalTypes.map((medal) => (
        <div key={medal} className={styles.legendItem}>
          <span style={{ backgroundColor: colors[medal] }} />
          {medal}
        </div>
      ))}
    </div>
  );
}
