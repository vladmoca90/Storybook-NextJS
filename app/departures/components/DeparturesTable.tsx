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
    <div className={"overflow-x-auto max-w-full"}>
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
                  <div className={"flex items-center gap-[11px]"}>
                    <span
                      className={
                        "w-[33px] h-[33px] grid place-items-center italic font-extrabold text-[12px] rounded-full"
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
                      "flex items-center gap-[9px] text-[11px] text-[#74687f]"
                    }
                  >
                    <span
                      role="img"
                      aria-label={`${f.country} flag`}
                      className={
                        '[font-family:"Segoe_UI_Emoji",_"Apple_Color_Emoji",_sans-serif] text-[21px]'
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
                      "inline-block [border:1px_solid_#e8e2ef] bg-[#faf8fc] rounded-[5px] [padding:5px_8px] text-[11px] text-[#736280]"
                    }
                  >
                    T{f.terminal}
                  </span>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-[6px] rounded-[4px] px-[9px] py-[6px] text-[10px] font-semibold ${styles.status} ${f.status === "Boarding" ? "bg-[#eee5f9] text-[#71439c]" : f.status === "Delayed" ? "bg-[#fff4df] text-[#ad771e]" : f.status === "Gate open" ? "bg-[#eaf1fc] text-[#4974ac]" : "bg-[#edf6f1] text-[#4c8a69]"}`}
                  >
                    <i />
                    {f.status}
                  </span>
                </td>
                <td>
                  <button
                    className={`flex bg-transparent border-0 text-[#9a8aa7] cursor-pointer p-[7px] rounded-[5px] ${styles.expand}`}
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
                <tr className={styles.detail}>
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
