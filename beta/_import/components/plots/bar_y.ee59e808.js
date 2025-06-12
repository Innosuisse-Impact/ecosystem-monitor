import * as Plot from "../../../_npm/@observablehq/plot@0.6.16/e828d8c8.js";
import { color_scale, countries } from "../utils/colors.99726961.js"
import {html} from "../../../_npm/htl@0.3.1/063eb405.js";

export function bar_vc_ch(data) {
    // Create Plot
    return Plot.plot({
      width: 320,
        height: 320,
      marginTop: 45,
      caption: html`Source: <a href="https://www.startupticker.ch/en/swiss-venture-capital-report">Startupticker: Venture Capital Report</a>`,
      x: { label: "", tickSize: 0, tickFormat: "" },
      y: {
          label: `${data[0].measure} in ${data[0].unit}`,
        ticks: 6,
        grid: true,
        nice: true,
        tickFormat: (d) => d.toLocaleString("fr-CH")
      },
      color: color_scale, // take country colors from first plot
      marks: [
        Plot.barY(data, {
          x: "year",
          y: "obs_value",
          fill: "iso3"
        }),
        Plot.text(data, {
          x: "year",
          y: "obs_value",
          text: (d) => d.obs_value.toLocaleString("fr-CH"),
          dy: -10 // Vertical adjustment
        }),
        Plot.ruleY([0])
      ]
    });
  }