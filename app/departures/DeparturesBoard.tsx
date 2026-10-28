"use client";
import appearance from "./appearance.module.css";
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
      className={`min-h-screen ${appearance.bgF7f7fa} ${appearance.text282434} ${appearance.FontFamilyArialHelveticaSansSerif} ${appearance.text0875rem} w-full min-w-0 ${styles.page}`}
    >
      <header
        className={
          `h-[5.25rem] ${appearance.bgWhite} [border-bottom-width:0.0625rem] [border-bottom-style:solid] ${appearance.BorderBottomColorE8e5ed} flex items-center justify-between [padding:0_max(5%,_calc((100vw_-_82.5rem)_/_2))] [@media(max-width:50rem)]:h-[4.375rem] [@media(max-width:50rem)]:[padding:0_1.25rem]`
        }
      >
        <a
          href="/departures"
          className={`flex items-center ${appearance.text175rem} ${appearance.fontExtrabold} ${appearance.tracking00625rem} ${appearance.text44216c} ${appearance.noUnderline} ${styles.brand} [&_small]:[margin:0.375rem_0_0_0.75rem] [&_small]:border-l-[0.0625rem] [&_small]:pl-[0.75rem]`}
        >
          <span
            className={`${appearance.bg5b3284} ${appearance.textWhite} p-[0.5625rem] rounded-[0.6875rem] mr-[0.625rem] flex ${styles.brandIcon}`}
          >
            <Plane size={22} />
          </span>
          london<span>air</span>
          <small>LHR</small>
        </a>
        <div
          className={`flex items-center gap-[0.625rem] ${appearance.text075rem} ${appearance.text736d7d} ${appearance.MediaMaxWidth50remText0625rem} [@media(max-width:50rem)]:[&_>_span]:hidden`}
        >
          <Globe2 size={16} /> London Heathrow{" "}
          <span className={`[margin:0_0.8125rem] ${appearance.textDdd}`}>|</span>
          <span>Flight information</span>
        </div>
      </header>
      <main
        className={
          `max-w-[82.5rem] m-auto [padding:1.75rem_1.75rem_0] w-full min-w-0 min-[93.75rem]:pt-[2.1875rem] [@media(max-width:50rem)]:[padding:1.4375rem_1.125rem_0]`
        }
      >
        <DeparturesIntro
          airlineCount={new Set(flights.map((flight) => flight.airline)).size}
          destinationCount={new Set(flights.map((flight) => flight.destination)).size}
          terminalCount={new Set(flights.map((flight) => flight.terminal)).size}
        />
        <section
          className={`${appearance.bgWhite} [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorE6e1eb} rounded-3 overflow-hidden ${appearance.BoxShadow003125rem125rem30203d04} min-w-0 ${styles.board} [&_table]:w-[100%] [&_table]:border-collapse [&_table]:text-left [&_table]:whitespace-nowrap [&_th]:[padding:0.8125rem_1rem] [&_th]:border-t-[0.0625rem] [&_th]:border-b-[0.0625rem] [&_th:first-child]:pl-[1.5625rem] [&_td:first-child]:pl-[1.5625rem] [&_th_button]:border-0 [&_th_button]:p-[0] [&_th_button]:cursor-pointer [&_td]:[padding:1.1875rem_1rem] [&_td]:border-b-[0.0625rem] [&_td_small]:block [&_td_small]:mt-[0.375rem] [&_th]:relative [@media(max-width:50rem)]:[&_table]:min-w-[62.5rem]`}
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
            className={`flex justify-between items-center [padding:1.4375rem_1.5625rem] ${appearance.text918699} ${appearance.text0625rem} [@media(max-width:50rem)]:[padding:1.25rem_1rem] ${styles.tableTop} [&_>_div]:flex [&_>_div]:gap-[0.875rem] [&_>_div]:items-center [@media(max-width:50rem)]:[&_>_div]:block [@media(max-width:50rem)]:[&_>_div_>_span]:block [@media(max-width:50rem)]:[&_>_div_>_span]:mt-[0.375rem]`}
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
              className={`p-[3.4375rem] text-center ${appearance.text8b789b} ${styles.empty} [&_svg]:m-[auto] [&_h2]:m-[0.75rem] [&_button]:mt-[1.125rem] [&_button]:[padding:0.625rem_1.125rem] [&_button]:rounded-[0.375rem] [&_button]:cursor-pointer`}
            >
              <Search size={28} />
              <h2>No flights found</h2>
              <p>Try a different airline, destination or filter.</p>
              <button onClick={reset}>Clear filters</button>
            </div>
          )}
          <div
            className={`flex items-center gap-2 [padding:1.0625rem_1.5625rem] ${appearance.text0625rem} ${appearance.text968b9f} [@media(max-width:50rem)]:[padding:1.0625rem_1rem] ${styles.boardFooter} [&_span:last-child]:ml-[auto] [@media(max-width:50rem)]:[&_span:last-child]:hidden`}
          >
            <Clock3 size={15} />
            <span>Times are local to London (BST, UTC+1).</span>
            <span>18 OCT 2026</span>
          </div>
        </section>
        <aside
          className={`flex gap-3 [margin:1.5rem_0_2.25rem] ${appearance.text8c8197} ${appearance.text06875rem} ${appearance.LineHeight18} ${styles.note} [&_>_span]:border-[0.0625rem] [&_>_span]:rounded-[50%] [&_>_span]:w-[1.0625rem] [&_>_span]:h-[1.0625rem] [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:shrink-[0] [&_>_span]:mt-[0.1875rem] [&_p]:m-[0] [&_strong]:block`}
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
          className={`flex justify-between [border-top-width:0.0625rem] [border-top-style:solid] ${appearance.BorderTopColorE6e0ed} [padding:1.375rem_0_1.75rem] ${appearance.text92859c} ${appearance.text0625rem} [@media(max-width:50rem)]:gap-5 ${styles.footer} [&_>_span:first-child_span]:ml-[0.625rem] [@media(max-width:50rem)]:[&_>_span:last-child]:hidden`}
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
