// Data import
import { FileAttachment } from "../../../_observablehq/stdlib.31fc9623.js";

export const countries = [
    "CHE",
    "SWE",
    "USA",
    "SGP",
    "GBR",
    "KOR",
    "FIN",
    "NLD",
    "DEU",
    "DNK",
    "ISR",
];

const df_iso3_country = await FileAttachment({"name":"../../../data/iso3_country_csv.csv","mimeType":"text/csv","path":"../../../_file/data/iso3_country_csv.c215df9d.csv","lastModified":1758553457374,"size":1848}, import.meta.url).csv({ typed: true });

export const country_list = df_iso3_country.map((d) => d.iso3);
export const country_iso3 = new Map(df_iso3_country.map((d) => [d.country, d.iso3]));
export const iso3_country = new Map(df_iso3_country.map((d) => [d.iso3, d.country]));