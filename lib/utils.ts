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

function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateBookingEmail(booking: any): string {
  const passengerNames = booking.passengers.map((p: any) => p.name).join(", ");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flight Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f7f7f7; margin: 0; padding: 0; }
    .container { background: #fff; max-width: 400px; margin: 40px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 24px; }
    .header { text-align: center; }
    .header h2 { color: #0070ba; }
    .info { margin: 24px 0; }
    .info table { width: 100%; border-collapse: collapse; }
    .info td { padding: 6px 0; }
    .footer { text-align: center; color: #888; font-size: 13px; margin-top: 24px; }
    .success { color: #28a745; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Flight Booking Confirmation</h2>
      <p class="success">Your booking is confirmed!</p>
    </div>
    <div class="info">
      <table>
        <tr>
          <td><strong>Booking ID:</strong></td>
          <td>${booking.id}</td>
        </tr>
        <tr>
          <td><strong>Status:</strong></td>
          <td>${booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}</td>
        </tr>
        <tr>
          <td><strong>Route:</strong></td>
          <td>${booking.departureCity.value} → ${booking.destinationCity.value}</td>
        </tr>
        <tr>
          <td><strong>Departure Date:</strong></td>
          <td>${formatDate(booking.departureDate)}</td>
        </tr>
        <tr>
          <td><strong>Passenger(s):</strong></td>
          <td>${passengerNames}</td>
        </tr>
        <tr>
          <td><strong>Total Price:</strong></td>
          <td>USD ${booking.totalPrice}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Thank you for your booking.<br>
      If you have any questions, please contact us.
    </div>
  </div>
</body>
</html>
  `;
}
