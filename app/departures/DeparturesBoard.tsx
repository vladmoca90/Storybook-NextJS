"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Globe2,
  Plane,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./departures.module.css";
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
        <div
          className={`text-[11px] text-[#827b8b] flex gap-[14px] ${styles.breadcrumb}`}
        >
          London Heathrow <span>/</span> Flight information <span>/</span>{" "}
          Departures
        </div>
        <section
          className={`flex items-center justify-between [padding:43px_0_34px] [@media(max-width:800px)]:[padding:32px_0] ${styles.hero}`}
        >
          <div>
            <div
              className={
                "flex gap-[9px] items-center tracking-[1.8px] text-[10px] font-bold text-[#76558e]"
              }
            >
              <Plane size={17} /> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1>
              Departures<span>↗</span>
            </h1>
            <p>
              From London to the world. Find your flight and get ready to go.
            </p>
          </div>
          <div
            className={`[border-left:1px_solid_#dcd5e4] [padding:8px_0_8px_28px] flex flex-col gap-[9px] [@media(max-width:800px)]:hidden ${styles.airportCard}`}
          >
            <span>LONDON HEATHROW</span>
            <strong>
              LHR <ArrowUpRight size={32} />
            </strong>
            <small>All times shown in London local time</small>
          </div>
        </section>
        <div
          className={`flex items-center gap-[26px] [margin:9px_0_20px] text-[12px] text-[#837a8c] [@media(max-width:800px)]:gap-3 ${styles.overview}`}
        >
          <span>
            <i /> Departure board
          </span>
          <span>
            10 airlines <b>·</b> 10 destinations <b>·</b> 4 terminals
          </span>
          <span
            className={
              "ml-auto [border:1px_solid_#ded5e7] bg-[#f0eaf5] text-[#77558d] [padding:5px_9px] rounded-[5px] text-[10px]"
            }
          >
            Sample schedule
          </span>
        </div>
        <section
          className={`bg-white [border:1px_solid_#e6e1eb] rounded-3 overflow-hidden [box-shadow:0_5px_20px_#30203d04] min-w-0 ${styles.board}`}
          aria-label="Flight departures"
        >
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
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button aria-label="Clear search" onClick={() => setQuery("")}>
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
                onChange={(e) => setTerminal(e.target.value)}
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
                onChange={(e) => setStatus(e.target.value)}
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
