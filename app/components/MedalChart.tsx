"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import styles from "./MedalChart.module.css";

const medalTypes = ["Gold", "Silver", "Bronze"] as const;
type MedalType = (typeof medalTypes)[number];

type CountryMedals = { country: string } & Record<MedalType, number>;
type Tooltip = {
  country: string;
  medal: MedalType;
  value: number;
  x: number;
  y: number;
};

const colors: Record<MedalType, string> = {
  Gold: "#fcc723",
  Silver: "#cfcfcf",
  Bronze: "#e38120",
};

const data: CountryMedals[] = [
  { country: "Germany", Gold: 17, Silver: 10, Bronze: 15 },
  { country: "Russian Federation", Gold: 19, Silver: 17, Bronze: 19 },
  { country: "PR China", Gold: 26, Silver: 18, Bronze: 26 },
  { country: "United Kingdom", Gold: 27, Silver: 23, Bronze: 17 },
  { country: "United States", Gold: 46, Silver: 37, Bronze: 38 },
];

export default function MedalChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgElement = svgRef.current;
    if (!container || !svgElement) return;

    const draw = () => {
      const width = container.clientWidth;
      const compact = width < 640;
      const margin = { top: 18, right: compact ? 18 : 36, bottom: 48, left: compact ? 116 : 172 };
      const height = compact ? 430 : 480;
      const innerWidth = Math.max(100, width - margin.left - margin.right);
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(svgElement)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", width)
        .attr("height", height);
      svg.selectAll("*").remove();
      const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const yCountry = d3.scaleBand<string>()
        .domain(data.map((item) => item.country))
        .range([0, innerHeight])
        .paddingInner(0.28);
      const yMedal = d3.scaleBand<MedalType>()
        .domain(medalTypes)
        .range([0, yCountry.bandwidth()])
        .padding(0.14);
      const x = d3.scaleLinear().domain([0, 50]).range([0, innerWidth]);
      const ticks = compact ? 5 : 10;

      chart.append("g")
        .attr("class", styles.grid)
        .call(d3.axisBottom(x).ticks(ticks).tickSize(innerHeight).tickFormat(() => ""));
      chart.append("g")
        .attr("class", styles.xAxis)
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(ticks).tickSize(5).tickPadding(10))
        .call((axis) => axis.select(".domain").remove());
      chart.append("g")
        .attr("class", styles.yAxis)
        .call(d3.axisLeft(yCountry).tickSize(0).tickPadding(compact ? 10 : 18))
        .call((axis) => axis.select(".domain").remove());

      const rows = chart.selectAll<SVGGElement, CountryMedals>(`.${styles.row}`)
        .data(data)
        .join("g")
        .attr("class", styles.row)
        .attr("transform", (item) => `translate(0,${yCountry(item.country) ?? 0})`);

      rows.selectAll<SVGRectElement, { medal: MedalType; value: number; country: string }>("rect")
        .data((item) => medalTypes.map((medal) => ({ medal, value: item[medal], country: item.country })))
        .join("rect")
        .attr("x", 0)
        .attr("y", (item) => yMedal(item.medal) ?? 0)
        .attr("width", (item) => x(item.value))
        .attr("height", yMedal.bandwidth())
        .attr("rx", 2)
        .attr("fill", (item) => colors[item.medal])
        .attr("tabindex", 0)
        .attr("role", "img")
        .attr("aria-label", (item) => `${item.country}, ${item.value} ${item.medal.toLowerCase()} medals`)
        .on("pointerenter pointermove", (event, item) => {
          const bounds = container.getBoundingClientRect();
          setTooltip({ ...item, x: event.clientX - bounds.left, y: event.clientY - bounds.top });
        })
        .on("pointerleave", () => setTooltip(null))
        .on("focus", (event, item) => {
          const rect = (event.currentTarget as SVGRectElement).getBoundingClientRect();
          const bounds = container.getBoundingClientRect();
          setTooltip({ ...item, x: rect.right - bounds.left, y: rect.top + rect.height / 2 - bounds.top });
        })
        .on("blur", () => setTooltip(null));
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.legend} aria-label="Medal types">
        {medalTypes.map((medal) => (
          <div key={medal} className={styles.legendItem}>
            <span style={{ backgroundColor: colors[medal] }} />
            {medal}
          </div>
        ))}
      </div>
      <div ref={containerRef} className={styles.chart}>
        <svg ref={svgRef} aria-labelledby="chart-title chart-description">
          <desc id="chart-description">
            Grouped horizontal bar chart comparing gold, silver and bronze medal counts for Germany,
            the Russian Federation, China, the United Kingdom and the United States.
          </desc>
        </svg>
        {tooltip && (
          <div className={styles.tooltip} role="status" style={{ left: tooltip.x, top: tooltip.y }}>
            <span>{tooltip.country}</span>
            <strong>{tooltip.value}</strong> {tooltip.medal.toLowerCase()} medals
          </div>
        )}
      </div>
    </div>
  );
}
