import * as Plot from "../../../_node/@observablehq/plot@0.6.16/index.bac1276b.js";
import * as aq from "../../../_node/arquero@7.2.0/index.fbd5f71c.js";
import { color_scale } from "../utils/colors.99726961.js"

export function arrow_eis(df_eis_pivoted, df_eis_filtered, df_eis_sorted) {
  return Plot.plot({
  marginLeft: 100,
  marginRight: 50,
  caption: "European Commission (2024)",
  color: color_scale,
  x: {
    label: `${df_eis_filtered[0].var_axis} 2017–2024`,
    grid: true,
    axis: "top",
    labelOffset: 30,
    tickPadding: 5,
    tickSize: 0,
  },
  y: {
    label: null,
    tickSize: 0,
    domain: df_eis_sorted,
  },
  marks: [
    Plot.arrow(df_eis_pivoted, {
      x1: "2017",
      y1: "country",
      x2: "2024",
      y2: "country",
      headLength: 5,
      stroke: "iso3"
      // strokeWidth: d => ["CHE","SWE","DNK", "FIN"].includes(d.iso3) ? 1.5 : 1,
      // strokeOpacity: (d) =>
      //   ["CHE", "SWE", "DNK", "FIN"].includes(d.iso3) ? 1 : 0.6,
    }),
    Plot.dot(df_eis_pivoted, {
      x: "2017",
      y: "country",
      fill: "iso3",
      r: 2,
      //strokeWidth: 0,
      // fillOpacity: (d) =>
      //   ["CHE", "SWE", "DNK", "FIN"].includes(d.iso3) ? 1 : 0.6,
    }),
    Plot.text(
      df_eis_pivoted.filter((d) => d.country === "Switzerland"),
      {
        x: "2017",
        y: "country",
        text: ["2017"],
        textAnchor: "end",
        dx: -5,
      }
    ),
    Plot.text(
      df_eis_pivoted.filter((d) => d.country === "Switzerland"),
      {
        x: "2024",
        y: "country",
        text: ["2024"],
        textAnchor: "start",
        dx: 5,
      }
    ),
  ],
})}

export function arrow_unicorns(data, color_range) {

    const df = data

    const sectorCounts = aq
    .from(df)
    .groupby("sector")
    .count() // This creates a count column automatically
    .orderby(aq.desc("count")); // Sort by count descending
  // return Array.from(
  //   d3.group(df_u, (d) => d.sector),
  //   ([sector, rows]) => rows[0]
  // );
  // Extract just the ordered sectors as an array
    const orderedSectors = sectorCounts.select("sector").array("sector");
    
  // Now get the companies ordered by sector count, then sector name, then year_u
  const sorted = aq
    .from(df)
    // Join with the sector counts to get the count for each row
    .join_left(sectorCounts, "sector")
    // Sort by the sector count, then sector name, then year_u
    .orderby(aq.desc("count"), "sector", aq.desc("year_unicorn"), aq.desc("year_founding"));

  const firstCompanies = sorted
    .groupby("sector")
    .slice(0, 1) // Takes the first row from each group
    .ungroup()
    .select("company")
    .join_left(aq.from(df));

  const sortedCompanies = sorted.select("company").array("company");

    return Plot.plot({
    marginRight: 170,
    x: {
      axis: "top",
      grid: true,
      domain: [new Date("1980"), new Date("2027")],
      ticks: 10
    },
    y: { domain: sortedCompanies, tickSize: 0, axis: "right", label: "" },
    color: {
      //legend: true,
      //columns: 1,
        domain: orderedSectors,
        range: color_range
    },
    marks: [
      Plot.arrow(df, {
        x1: "year_founding",
        y1: "company",
        x2: "year_unicorn",
        y2: "company",
        stroke: "sector"
      }),
      Plot.dot(df, {
        x: "year_founding",
        y: "company",
        fill: "sector"
      }),
      Plot.text(
        [
          {
            year_founding: new Date("2009"),
            company: "Scandit",
            text: "Founded"
          }
        ],
        {
          x: "year_founding",
          y: "company",
          text: "text",
          textAnchor: "end",
          dx: -7
        }
      ),
      Plot.text(
        [
          {
            year_founding: new Date("2022"),
            company: "Scandit",
            text: "1B USD\nvaluation"
          }
        ],
        {
          x: "year_founding",
          y: "company",
          text: "text",
          textAnchor: "start",
          dx: 5
        }
      ),
      Plot.text(firstCompanies, {
        x: new Date("1980"),
        y: "company",
        text: "sector",
        textAnchor: "start",
        dx: 5,
          fill: "sector"
      })
    ]
  });
}