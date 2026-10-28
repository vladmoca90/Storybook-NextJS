import appearance from "../appearance.module.css";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import type { Airline } from "@/app/data/types/airlines";
import styles from "../departures.module.css";

interface DeparturesTableProps {
  flights: readonly Airline[];
  expanded: string | null;
  reverse: boolean;
  onToggleSort: () => void;
  onToggleFlight: (flightNumber: string) => void;
}

export default function DeparturesTable({
  flights,
  expanded,
  reverse,
  onToggleSort,
  onToggleFlight,
}: DeparturesTableProps) {
  return (
    <div className={`overflow-x-auto max-w-full`}>
      <table>
        <thead>
          <tr>
            <th aria-sort={reverse ? "descending" : "ascending"}>
              <button onClick={onToggleSort}>
                Departure {reverse ? "↑" : "↓"}
              </button>
            </th>
            <th>Destination</th>
            <th>Airline</th>
            <th>Country of origin</th>
            <th>Terminal</th>
            <th>Status</th>
            <th>
              <span className={styles.srOnly}>Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <Fragment key={f.flight}>
              <tr>
                <td>
                  <strong className={styles.time}>{f.time}</strong>
                  {f.status === "Delayed" && (
                    <small className={styles.delayedTime}>
                      Est. 10:00
                    </small>
                  )}
                </td>
                <td>
                  <strong>{f.destination}</strong>
                  <small>{f.airport}</small>
                </td>
                <td>
                  <div className={`flex items-center gap-[0.6875rem]`}>
                    <span
                      className={
                        `w-[2.0625rem] h-[2.0625rem] grid place-items-center ${appearance.italic} ${appearance.fontExtrabold} ${appearance.text075rem} rounded-full`
                      }
                      style={{
                        color: f.color,
                        background: `${f.color}0d`,
                      }}
                    >
                      {f.code}
                    </span>
                    <div>
                      <strong>{f.airline}</strong>
                      <small>{f.flight}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={
                      `flex items-center gap-[0.5625rem] ${appearance.text06875rem} ${appearance.text74687f}`
                    }
                  >
                    <span
                      role="img"
                      aria-label={`${f.country} flag`}
                      className={
                        `${appearance.FontFamilySegoeUIEmojiAppleColorEmojiSansSerif} ${appearance.text13125rem}`
                      }
                    >
                      {f.flag}
                    </span>
                    {f.country}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      `inline-block [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorE8e2ef} ${appearance.bgFaf8fc} rounded-[0.3125rem] [padding:0.3125rem_0.5rem] ${appearance.text06875rem} ${appearance.text736280}`
                    }
                  >
                    T{f.terminal}
                  </span>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-[0.375rem] rounded-[0.25rem] px-[0.5625rem] py-[0.375rem] ${appearance.text0625rem} ${appearance.fontSemibold} ${styles.status} [&_i]:w-[0.3125rem] [&_i]:h-[0.3125rem] [&_i]:rounded-[50%] ${f.status === `Boarding` ? `${appearance.bgEee5f9} ${appearance.text71439c}` : f.status === `Delayed` ? `${appearance.bgFff4df} ${appearance.textAd771e}` : f.status === `Gate open` ? `${appearance.bgEaf1fc} ${appearance.text4974ac}` : `${appearance.bgEdf6f1} ${appearance.text4c8a69}`}`}
                  >
                    <i />
                    {f.status}
                  </span>
                </td>
                <td>
                  <button
                    className={`flex ${appearance.bgTransparent} border-0 ${appearance.text9a8aa7} cursor-pointer p-[0.4375rem] rounded-[0.3125rem] ${styles.expand}`}
                    aria-label={`Details for ${f.flight}`}
                    aria-expanded={expanded === f.flight}
                    onClick={() =>
                      onToggleFlight(f.flight)
                    }
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        transform:
                          expanded === f.flight
                            ? "rotate(180deg)"
                            : undefined,
                      }}
                    />
                  </button>
                </td>
              </tr>
              {expanded === f.flight && (
                <tr className={`${styles.detail} [&_td]:p-[1.375rem]! [&_p]:[margin:0.625rem_0_0]`}>
                  <td colSpan={7}>
                    <strong>
                      {f.flight} · London Heathrow → {f.destination} (
                      {f.airport})
                    </strong>
                    <p>
                      Terminal {f.terminal} ·{" "}
                      {f.gate === "—"
                        ? "Gate to be announced"
                        : `Gate ${f.gate}`}{" "}
                      ·{" "}
                      {f.status === "Delayed"
                        ? "Estimated departure 10:00"
                        : `Scheduled departure ${f.time}`}{" "}
                      · Illustrative flight details
                    </p>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
