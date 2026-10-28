import appearance from "../appearance.module.css";
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
          `flex gap-3 p-6 [border-bottom-width:0.0625rem] [border-bottom-style:solid] ${appearance.BorderBottomColorEeeaf2} [@media(max-width:50rem)]:flex-wrap [@media(max-width:50rem)]:p-4 [@media(max-width:50rem)]:gap-[0.625rem]`
        }
      >
        <label
          className={`flex items-center gap-3 [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorDdd7e4} rounded-[0.375rem] [padding:0_0.8125rem] flex-1 ${appearance.text8b7d98} min-w-[11.25rem] [@media(max-width:50rem)]:basis-full ${styles.search} [&_input]:w-[100%] [&_input]:[padding:0.8125rem_0] [&_input]:outline-none [&_input]:border-0 [&_button]:border-0 [&_button]:cursor-pointer`}
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
          className={`flex items-center gap-[0.375rem] [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorDdd7e4} rounded-[0.375rem] [padding:0_0.75rem] ${appearance.text71627d} [@media(max-width:50rem)]:flex-1 ${styles.select} [&_select]:[padding:0.75rem_0.25rem] [&_select]:border-0 [&_select]:max-w-[10rem] [@media(max-width:50rem)]:[&_select]:max-w-[none] [@media(max-width:50rem)]:[&_select]:w-[100%]`}
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
          className={`flex items-center gap-[0.375rem] [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorDdd7e4} rounded-[0.375rem] [padding:0_0.75rem] ${appearance.text71627d} [@media(max-width:50rem)]:flex-1 ${styles.select} [&_select]:[padding:0.75rem_0.25rem] [&_select]:border-0 [&_select]:max-w-[10rem] [@media(max-width:50rem)]:[&_select]:max-w-[none] [@media(max-width:50rem)]:[&_select]:w-[100%]`}
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
