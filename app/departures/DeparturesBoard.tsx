"use client";

import { Fragment, useState } from "react";
import { ArrowUpRight, ChevronDown, Clock3, Globe2, Plane, Search, SlidersHorizontal } from "lucide-react";
import styles from "./departures.module.css";

const flights = [
  { airline: "British Airways", country: "United Kingdom", flag: "🇬🇧", code: "BA", flight: "BA 117", time: "08:20", destination: "New York", airport: "JFK", terminal: "5", gate: "B34", status: "Boarding", color: "#233569" },
  { airline: "Lufthansa", country: "Germany", flag: "🇩🇪", code: "LH", flight: "LH 901", time: "08:30", destination: "Frankfurt", airport: "FRA", terminal: "2", gate: "A16", status: "Gate open", color: "#182755" },
  { airline: "Air France", country: "France", flag: "🇫🇷", code: "AF", flight: "AF 1681", time: "08:45", destination: "Paris", airport: "CDG", terminal: "4", gate: "12", status: "Boarding", color: "#263b7d" },
  { airline: "Emirates", country: "United Arab Emirates", flag: "🇦🇪", code: "EK", flight: "EK 008", time: "09:10", destination: "Dubai", airport: "DXB", terminal: "3", gate: "23", status: "On time", color: "#bb253b" },
  { airline: "Qatar Airways", country: "Qatar", flag: "🇶🇦", code: "QR", flight: "QR 006", time: "09:25", destination: "Doha", airport: "DOH", terminal: "4", gate: "—", status: "Delayed", color: "#70234b" },
  { airline: "KLM", country: "Netherlands", flag: "🇳🇱", code: "KL", flight: "KL 1002", time: "09:40", destination: "Amsterdam", airport: "AMS", terminal: "4", gate: "17", status: "On time", color: "#087cb4" },
  { airline: "Singapore Airlines", country: "Singapore", flag: "🇸🇬", code: "SQ", flight: "SQ 305", time: "10:05", destination: "Singapore", airport: "SIN", terminal: "2", gate: "—", status: "On time", color: "#b48228" },
  { airline: "American Airlines", country: "United States", flag: "🇺🇸", code: "AA", flight: "AA 051", time: "10:20", destination: "Dallas", airport: "DFW", terminal: "3", gate: "—", status: "On time", color: "#28618a" },
  { airline: "Turkish Airlines", country: "Türkiye", flag: "🇹🇷", code: "TK", flight: "TK 1980", time: "10:45", destination: "Istanbul", airport: "IST", terminal: "2", gate: "—", status: "On time", color: "#c92e3a" },
  { airline: "Air Canada", country: "Canada", flag: "🇨🇦", code: "AC", flight: "AC 855", time: "11:10", destination: "Vancouver", airport: "YVR", terminal: "2", gate: "—", status: "On time", color: "#d3353d" },
];

export default function DeparturesBoard() {
  const [query, setQuery] = useState("");
  const [terminal, setTerminal] = useState("All terminals");
  const [status, setStatus] = useState("All statuses");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reverse, setReverse] = useState(false);
  const filtered = flights.filter(f => `${f.airline} ${f.country} ${f.destination} ${f.airport} ${f.flight}`.toLowerCase().includes(query.trim().toLowerCase()) && (terminal === "All terminals" || f.terminal === terminal) && (status === "All statuses" || f.status === status));
  const visible = reverse ? [...filtered].reverse() : filtered;
  function reset() { setQuery(""); setTerminal("All terminals"); setStatus("All statuses"); }
  return <div className={styles.page}>
    <header className={styles.header}><a href="/departures" className={styles.brand}><span className={styles.brandIcon}><Plane size={22}/></span>london<span>air</span><small>LHR</small></a><div className={styles.headerRight}><Globe2 size={16}/> London Heathrow <span className={styles.separator}>|</span><span>Flight information</span></div></header>
    <main className={styles.main}>
      <div className={styles.breadcrumb}>London Heathrow <span>/</span> Flight information <span>/</span> Departures</div>
      <section className={styles.hero}><div><div className={styles.eyebrow}><Plane size={17}/> YOUR NEXT CHAPTER STARTS HERE</div><h1>Departures<span>↗</span></h1><p>From London to the world. Find your flight and get ready to go.</p></div><div className={styles.airportCard}><span>LONDON HEATHROW</span><strong>LHR <ArrowUpRight size={32}/></strong><small>All times shown in London local time</small></div></section>
      <div className={styles.overview}><span><i/> Departure board</span><span>10 airlines <b>·</b> 10 destinations <b>·</b> 4 terminals</span><span className={styles.demo}>Sample schedule</span></div>
      <section className={styles.board} aria-label="Flight departures">
        <div className={styles.filters}><label className={styles.search}><Search size={20}/><input aria-label="Search flights" placeholder="Search airline, destination or flight number" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="Clear search" onClick={() => setQuery("")}>×</button>}</label><label className={styles.select}><SlidersHorizontal size={16}/><select aria-label="Filter terminal" value={terminal} onChange={e => setTerminal(e.target.value)}>{["All terminals", "2", "3", "4", "5"].map(t => <option key={t} value={t}>{t === "All terminals" ? t : `Terminal ${t}`}</option>)}</select></label><label className={styles.select}><select aria-label="Filter status" value={status} onChange={e => setStatus(e.target.value)}>{["All statuses", "Boarding", "Gate open", "On time", "Delayed"].map(s => <option key={s}>{s}</option>)}</select></label></div>
        <div className={styles.tableTop}><div><strong>Sunday, 18 October 2026</strong><span>Morning departures</span></div><span aria-live="polite">Showing {visible.length} of 10 flights</span></div>
        <div className={styles.tableScroll}><table><thead><tr><th aria-sort={reverse ? "descending" : "ascending"}><button onClick={() => setReverse(!reverse)}>Departure {reverse ? "↑" : "↓"}</button></th><th>Destination</th><th>Airline</th><th>Country of origin</th><th>Terminal</th><th>Status</th><th><span className={styles.srOnly}>Details</span></th></tr></thead><tbody>{visible.map(f => <Fragment key={f.flight}><tr><td><strong className={styles.time}>{f.time}</strong>{f.status === "Delayed" && <small className={styles.delayedTime}>Est. 10:00</small>}</td><td><strong>{f.destination}</strong><small>{f.airport}</small></td><td><div className={styles.airline}><span className={styles.airlineIcon} style={{color:f.color, background:`${f.color}0d`}}>{f.code}</span><div><strong>{f.airline}</strong><small>{f.flight}</small></div></div></td><td><span className={styles.country}><span role="img" aria-label={`${f.country} flag`} className={styles.flag}>{f.flag}</span>{f.country}</span></td><td><span className={styles.terminal}>T{f.terminal}</span></td><td><span className={`${styles.status} ${f.status === "Boarding" ? styles.boarding : f.status === "Delayed" ? styles.delayed : f.status === "Gate open" ? styles.gate : styles.ontime}`}><i/>{f.status}</span></td><td><button className={styles.expand} aria-label={`Details for ${f.flight}`} aria-expanded={expanded === f.flight} onClick={() => setExpanded(expanded === f.flight ? null : f.flight)}><ChevronDown size={18} style={{transform: expanded === f.flight ? "rotate(180deg)" : undefined}}/></button></td></tr>{expanded === f.flight && <tr className={styles.detail}><td colSpan={7}><strong>{f.flight} · London Heathrow → {f.destination} ({f.airport})</strong><p>Terminal {f.terminal} · {f.gate === "—" ? "Gate to be announced" : `Gate ${f.gate}`} · {f.status === "Delayed" ? "Estimated departure 10:00" : `Scheduled departure ${f.time}`} · Illustrative flight details</p></td></tr>}</Fragment>)}</tbody></table></div>
        {!visible.length && <div className={styles.empty}><Search size={28}/><h2>No flights found</h2><p>Try a different airline, destination or filter.</p><button onClick={reset}>Clear filters</button></div>}
        <div className={styles.boardFooter}><Clock3 size={15}/><span>Times are local to London (BST, UTC+1).</span><span>18 OCT 2026</span></div>
      </section>
      <aside className={styles.note}><span>i</span><p><strong>A little heads-up</strong>This is a demonstration using sample flight times, terminals and statuses. For travel, check your airline or the <a href="https://www.heathrow.com/departures" target="_blank" rel="noreferrer">official Heathrow departures board ↗</a>.</p></aside>
      <footer className={styles.footer}><span>london<strong>air</strong> <span> / A departures board concept</span></span><span>10 airlines. A world of possibilities.</span></footer>
    </main>
  </div>;
}
