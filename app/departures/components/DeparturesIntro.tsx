import appearance from "../appearance.module.css";
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
      className={`${appearance.text06875rem} ${appearance.text827b8b} flex gap-[0.875rem] ${styles.breadcrumb}`}
    >
      London Heathrow <span>/</span> Flight information <span>/</span>{" "}
      Departures
    </div>
    <section
      className={`flex items-center justify-between [padding:2.6875rem_0_2.125rem] [@media(max-width:50rem)]:[padding:2rem_0] ${styles.hero} [&_h1]:[margin:0.75rem_0] [&_h1_span]:ml-[1.4375rem] [&_p]:mt-[0.8125rem] [@media(max-width:50rem)]:[&_p]:max-w-[18.75rem]`}
    >
      <div>
        <div
          className={
            `flex gap-[0.5625rem] items-center ${appearance.tracking01125rem} ${appearance.text0625rem} ${appearance.fontBold} ${appearance.text76558e}`
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
        className={`[border-left-width:0.0625rem] [border-left-style:solid] ${appearance.BorderLeftColorDcd5e4} [padding:0.5rem_0_0.5rem_1.75rem] flex flex-col gap-[0.5625rem] [@media(max-width:50rem)]:hidden ${styles.airportCard} [&_strong]:flex [&_strong]:items-center [&_strong]:gap-[4.375rem]`}
      >
        <span>LONDON HEATHROW</span>
        <strong>
          LHR <ArrowUpRight size={32} />
        </strong>
        <small>All times shown in London local time</small>
      </div>
    </section>
    <div
      className={`flex items-center gap-[1.625rem] [margin:0.5625rem_0_1.25rem] ${appearance.text075rem} ${appearance.text837a8c} [@media(max-width:50rem)]:gap-3 ${styles.overview} [&_>_span:first-child]:flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-[0.5625rem] [&_i]:w-[0.4375rem] [&_i]:h-[0.4375rem] [&_i]:rounded-[50%] [&_b]:[margin:0_0.5625rem] [@media(max-width:50rem)]:[&_>_span:nth-child(2)]:hidden`}
    >
      <span>
        <i /> Departure board
      </span>
      <span>
        {airlineCount} airlines <b>·</b> {destinationCount} destinations <b>·</b> {terminalCount} terminals
      </span>
      <span
        className={
          `ml-auto [border-width:0.0625rem] [border-style:solid] ${appearance.BorderColorDed5e7} ${appearance.bgF0eaf5} ${appearance.text77558d} [padding:0.3125rem_0.5625rem] rounded-[0.3125rem] ${appearance.text0625rem}`
        }
      >
        Sample schedule
      </span>
    </div>
    </>
  );
}
