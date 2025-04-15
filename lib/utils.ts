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

export async function get_access_token() {
  const auth = `${
    process.env.NODE_ENV === "development"
      ? process.env.PAYPAL_API_KEY_DEV
      : process.env.PAYPAL_API_KEY
  }:${
    process.env.NODE_ENV === "development"
      ? process.env.PAYPAL_SECRET_DEV
      : process.env.PAYPAL_SECRET
  }`;
  const data = "grant_type=client_credentials";
  return await fetch(process.env.PAYPAL_ENDPOINT + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    });
}
