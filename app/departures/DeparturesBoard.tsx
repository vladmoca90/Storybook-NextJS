"use client";
import { useState } from "react";
import {
  Clock3,
  Globe2,
  Plane,
  Search,
} from "lucide-react";
import styles from "./departures.module.css";
import DepartureFilters from "./components/DepartureFilters";
import DeparturesIntro from "./components/DeparturesIntro";
import DeparturesTable from "./components/DeparturesTable";
import { airlines as flights } from "../data/airlines";

export default function DeparturesBoard() {
  const [query, setQuery] = useState("");
  const [terminal, setTerminal] = useState("All terminals");
  const [status, setStatus] = useState("All statuses");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reverse, setReverse] = useState(false);

  const filtered = flights.filter(
    (f) =>
      `${f.airline} ${f.country} ${f.destination} ${f.airport} ${f.flight}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (terminal === "All terminals" || f.terminal === terminal) &&
      (status === "All statuses" || f.status === status),
  );

  const visible = reverse ? [...filtered].reverse() : filtered;
  function reset() {
    setQuery("");
    setTerminal("All terminals");
    setStatus("All statuses");
  }

  return (
    <div
      className={`min-h-screen bg-[#f7f7fa] text-[#282434] [font-family:Arial,_Helvetica,_sans-serif] text-[14px] w-full min-w-0 ${styles.page}`}
    >
      <header
        className={
          "h-[84px] bg-white [border-bottom:1px_solid_#e8e5ed] flex items-center justify-between [padding:0_max(5%,_calc((100vw_-_1320px)_/_2))] [@media(max-width:800px)]:h-[70px] [@media(max-width:800px)]:[padding:0_20px]"
        }
      >
        <a
          href="/departures"
          className={`flex items-center text-[28px] font-extrabold tracking-[-1px] text-[#44216c] no-underline ${styles.brand}`}
        >
          <span
            className={`bg-[#5b3284] text-white p-[9px] rounded-[11px] mr-[10px] flex ${styles.brandIcon}`}
          >
            <Plane size={22} />
          </span>
          london<span>air</span>
          <small>LHR</small>
        </a>
        <div
          className={`flex items-center gap-[10px] text-[12px] text-[#736d7d] [@media(max-width:800px)]:text-[10px] ${styles.headerRight}`}
        >
          <Globe2 size={16} /> London Heathrow{" "}
          <span className={"[margin:0_13px] text-[#ddd]"}>|</span>
          <span>Flight information</span>
        </div>
      </header>
      <main
        className={
          "max-w-[1320px] m-auto [padding:28px_28px_0] w-full min-w-0 min-[1500px]:pt-[35px] [@media(max-width:800px)]:[padding:23px_18px_0]"
        }
      >
        <DeparturesIntro
          airlineCount={new Set(flights.map((flight) => flight.airline)).size}
          destinationCount={new Set(flights.map((flight) => flight.destination)).size}
          terminalCount={new Set(flights.map((flight) => flight.terminal)).size}
        />
        <section
          className={`bg-white [border:1px_solid_#e6e1eb] rounded-3 overflow-hidden [box-shadow:0_5px_20px_#30203d04] min-w-0 ${styles.board}`}
          aria-label="Flight departures"
        >
          <DepartureFilters
            query={query}
            terminal={terminal}
            status={status}
            onQueryChange={setQuery}
            onTerminalChange={setTerminal}
            onStatusChange={setStatus}
          />
          <div
            className={`flex justify-between items-center [padding:23px_25px] text-[#918699] text-[10px] [@media(max-width:800px)]:[padding:20px_16px] ${styles.tableTop}`}
          >
            <div>
              <strong>Sunday, 18 October 2026</strong>
              <span>Morning departures</span>
            </div>
            <span aria-live="polite">
              Showing {visible.length} of 10 flights
            </span>
          </div>
          <DeparturesTable
            flights={visible}
            expanded={expanded}
            reverse={reverse}
            onToggleSort={() => setReverse((previous) => !previous)}
            onToggleFlight={(flightNumber) =>
              setExpanded((previous) =>
                previous === flightNumber ? null : flightNumber,
              )
            }
          />
          {!visible.length && (
            <div
              className={`p-[55px] text-center text-[#8b789b] ${styles.empty}`}
            >
              <Search size={28} />
              <h2>No flights found</h2>
              <p>Try a different airline, destination or filter.</p>
              <button onClick={reset}>Clear filters</button>
            </div>
          )}
          <div
            className={`flex items-center gap-2 [padding:17px_25px] text-[10px] text-[#968b9f] [@media(max-width:800px)]:[padding:17px_16px] ${styles.boardFooter}`}
          >
            <Clock3 size={15} />
            <span>Times are local to London (BST, UTC+1).</span>
            <span>18 OCT 2026</span>
          </div>
        </section>
        <aside
          className={`flex gap-3 [margin:24px_0_36px] text-[#8c8197] text-[11px] [line-height:1.8] ${styles.note}`}
        >
          <span>i</span>
          <p>
            <strong>A little heads-up</strong>This is a demonstration using
            sample flight times, terminals and statuses. For travel, check your
            airline or the{" "}
            <a
              href="https://www.heathrow.com/departures"
              target="_blank"
              rel="noreferrer"
            >
              official Heathrow departures board ↗
            </a>
            .
          </p>
        </aside>
        <footer
          className={`flex justify-between [border-top:1px_solid_#e6e0ed] [padding:22px_0_28px] text-[#92859c] text-[10px] [@media(max-width:800px)]:gap-5 ${styles.footer}`}
        >
          <span>
            london<strong>air</strong>{" "}
            <span> / A departures board concept</span>
          </span>
          <span>10 airlines. A world of possibilities.</span>
        </footer>
      </main>
    </div>
  );
}
