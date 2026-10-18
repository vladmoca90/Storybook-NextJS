import { ArrowUpRight, Plane } from "lucide-react";
import styles from "../departures.module.css";

interface DeparturesIntroProps {
  airlineCount: number;
  destinationCount: number;
  terminalCount: number;
}

export default function DeparturesIntro({
  airlineCount, destinationCount, terminalCount,
}: DeparturesIntroProps) {
  return (
    <>
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
        {airlineCount} airlines <b>·</b> {destinationCount} destinations <b>·</b> {terminalCount} terminals
      </span>
      <span
        className={
          "ml-auto [border:1px_solid_#ded5e7] bg-[#f0eaf5] text-[#77558d] [padding:5px_9px] rounded-[5px] text-[10px]"
        }
      >
        Sample schedule
      </span>
    </div>
    </>
  );
}
