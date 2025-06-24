import * as Plot from "../../../_node/@observablehq/plot@0.6.17/index.b6341d14.js";
import { html } from "../../../_npm/htl@0.3.1/72f4716c.js";
import { color_range } from "../utils/colors.c15b65cb.js"

export function bar_stacked_x(data) {  

  const domain_y = data.filter(d => d.type === "Experimental development").sort((a, b) => a.share - b.share).map(item => item.country);

  return Plot.plot({
    caption: html`Source: <a href="https://oe.cd/msti" target="_blank">OECD Main Science and Technology Indicators (MSTI)</a>`,
    marginTop: 0,
    marginLeft: 100,
    color: {
      legend: true,
      domain: [
        "Basic research",
        "Applied research",
        "Experimental development"
      ],
      range: color_range
    },
    style: { fontSize: "11px" },
    x: { label: "in %", percent: true},
    y: {
      label: "",
      domain: domain_y,
      tickSize: 0
    },
    marks: [
      Plot.barX(data, {
        x: "share",
        y: "country",
        fill: "type",
        offset: "normalize",
        opacity: 0.8,
        order: [
          "Basic research",
          "Applied research",
          "Experimental development"
        ],
        sort: "x"
      }),
      Plot.text(
        data,
        Plot.stackX(
          {
            x: "share",
            y: "country", 
            z: "type",
            text: d => `${d.share.toFixed(0)} %`,
            offset: "normalize",
            order: [
              "Basic research",
              "Applied research", 
              "Experimental development"
            ],
            sort: "x"
        })
      )
    ]
});
}
