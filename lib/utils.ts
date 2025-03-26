// @typescript-eslint/no-explicit-any
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSelectOptionsWithCountry(airports: any[]) {
  return airports.map((airport) => ({
    value: airport.iata_code,
    label: `${airport.name} - ${airport.city}, ${airport.country}`,
  }));
}
