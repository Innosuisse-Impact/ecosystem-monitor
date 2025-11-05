import * as Plot from "../../../_npm/@observablehq/plot@0.6.17/d761ef9b.js";
import { color_scale, countries } from "../utils/colors.8262fe81.js"
import {html} from "../../../_npm/htl@0.3.1/72f4716c.js";
import { style } from "../../../_node/d3@7.9.0/index.e21134d2.js";

export function bar_x(data, type = "investor", source = undefined, source_link = undefined) {
    const df_epo_type = data.filter(d => d.type === type && countries.includes(d.iso3))
    return Plot.plot({
        caption: html`Source: <a href="${source_link}" target="_blank">${source}</a>`,
        marginTop: 40,
        marginLeft: 190,
        y: { label: "", tickSize: 0 },
        x: {
            domain: [0, 100],
            label: "Percentage of companies with at least one patent in the investment portfolio",
            percent: true,
            ticks: 10,
            axis: "top",
        },
        color: color_scale,
        style: { fontSize: "11px" },
        marks: [
            Plot.barX(
                df_epo_type,
                {
                    x: "averageTIS",
                    y: type,
                    fill: "iso3",
                    fillOpacity: (d) => d.averageTIS > 0.3 ? 1 : 0.5,
                    sort: { y: "x", reverse: true }
                }
            ),
            Plot.textX(
                df_epo_type,
                {
                    x: "averageTIS",
                    y: type,
                    text: (d) => `${Math.round(d.averageTIS * 100)} %`,
                    textAnchor: "start",
                    dx: 5,
                    sort: { y: "x", reverse: true }
                }
            ),
            
            Plot.ruleX([0])
        ]
    })
}

export function bar_x_unicorn(data, color_scale) {
    return Plot.plot({
    //title: "Number of unicorns per 133 billion GDP",
        caption: html`Source: <a href="https://www.cbinsights.com/research-unicorn-companies" target="_blank">CB Insights (2025)</a>, OECD (2025)`,
    marginTop: 40,
    marginLeft: 85,
    marginRight: 85,
    y: { label: null, tickSize: 0 },
    x: { label: "Number of unicorns per 133 billion GDP", axis: "top" },
        color: color_scale,
    style: { fontSize: "11px" },
        marks: [
            Plot.barX(data, {
                x: "gdp_unicorn",
                y: "country",
                fill: "iso3",
                opacity: (d) => (d.iso3 === "CHE" ? 1 : 0.6),
                sort: { y: "x", reverse: true }
            }),
            Plot.gridX({ stroke: "white", opacity: 1 }),
            Plot.textX(data, {
                x: "gdp_unicorn",
                y: "country",
                text: (d) => Math.round(d.gdp_unicorn * 10) / 10,
                textAnchor: "start",
                dx: 5,
                sort: { y: "x", reverse: true }
            })
        ]
    })
}