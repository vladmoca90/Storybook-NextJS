import { Search, SlidersHorizontal } from "lucide-react";
import styles from "../departures.module.css";

interface DepartureFiltersProps {
  query: string;
  terminal: string;
  status: string;
  onQueryChange: (value: string) => void;
  onTerminalChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function DepartureFilters({
  query, terminal, status, onQueryChange, onTerminalChange, onStatusChange,
}: DepartureFiltersProps) {
  return (
    <>
      <div
        className={
          "flex gap-3 p-6 [border-bottom:1px_solid_#eeeaf2] [@media(max-width:800px)]:flex-wrap [@media(max-width:800px)]:p-4 [@media(max-width:800px)]:gap-[10px]"
        }
      >
        <label
          className={`flex items-center gap-3 [border:1px_solid_#ddd7e4] rounded-[6px] [padding:0_13px] flex-1 text-[#8b7d98] min-w-[180px] [@media(max-width:800px)]:basis-full ${styles.search}`}
        >
          <Search size={20} />
          <input
            aria-label="Search flights"
            placeholder="Search airline, destination or flight number"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => onQueryChange("")}>
              ×
            </button>
          )}
        </label>
        <label
          className={`flex items-center gap-[6px] [border:1px_solid_#ddd7e4] rounded-[6px] [padding:0_12px] text-[#71627d] [@media(max-width:800px)]:flex-1 ${styles.select}`}
        >
          <SlidersHorizontal size={16} />
          <select
            aria-label="Filter terminal"
            value={terminal}
            onChange={(e) => onTerminalChange(e.target.value)}
          >
            {["All terminals", "2", "3", "4", "5"].map((t) => (
              <option key={t} value={t}>
                {t === "All terminals" ? t : `Terminal ${t}`}
              </option>
            ))}
          </select>
        </label>
        <label
          className={`flex items-center gap-[6px] [border:1px_solid_#ddd7e4] rounded-[6px] [padding:0_12px] text-[#71627d] [@media(max-width:800px)]:flex-1 ${styles.select}`}
        >
          <select
            aria-label="Filter status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {[
              "All statuses",
              "Boarding",
              "Gate open",
              "On time",
              "Delayed",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
