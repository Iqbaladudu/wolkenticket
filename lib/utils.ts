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

export function generateBookingEmail(booking: any): string {
  const passengerNames = booking.passengers.map((p: any) => p.name).join(", ");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flight Booking Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css?family=Inter:400,600&display=swap" rel="stylesheet">
  <style>
    body {
      background: #f4f8fb;
      margin: 0;
      padding: 0;
      font-family: 'Inter', Arial, sans-serif;
      color: #222;
    }
    .container {
      background: #fff;
      max-width: 420px;
      margin: 40px auto;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,112,186,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
      padding: 32px 24px 24px 24px;
      position: relative;
      overflow: hidden;
    }
    .header {
      text-align: center;
      margin-bottom: 18px;
    }
    .header-logo {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
      border-radius: 12px;
      background: #0070ba;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }
    .header-logo svg {
      width: 28px;
      height: 28px;
      color: #fff;
    }
    .header h2 {
      color: #0070ba;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 6px 0;
      letter-spacing: -0.5px;
    }
    .success {
      color: #28a745;
      font-weight: 600;
      font-size: 1.08rem;
      margin-bottom: 6px;
    }
    .notice {
      background: #fff7e6;
      color: #e67e22;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 1rem;
      margin: 0 auto 18px auto;
      max-width: 340px;
      text-align: center;
      border: 1px solid #ffe0b3;
    }
    .info {
      margin: 18px 0 0 0;
      background: #f7fafc;
      border-radius: 10px;
      padding: 18px 14px 10px 14px;
      box-shadow: 0 1px 4px rgba(0,112,186,0.04);
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1rem;
    }
    .info-table tr {
      border-bottom: 1px solid #e9ecef;
    }
    .info-table td {
      padding: 8px 0;
      vertical-align: top;
    }
    .info-table td:first-child {
      color: #888;
      font-weight: 500;
      width: 38%;
      letter-spacing: 0.1px;
    }
    .info-table td:last-child {
      color: #222;
      font-weight: 600;
      word-break: break-word;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 0.97rem;
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }
    .button {
      display: inline-block;
      margin: 22px auto 0 auto;
      background: linear-gradient(90deg, #0070ba 60%, #1546a0 100%);
      color: #fff;
      font-weight: 600;
      font-size: 1.08rem;
      padding: 12px 32px;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0,112,186,0.10);
      transition: background 0.2s;
    }
    .button:hover {
      background: linear-gradient(90deg, #005fa3 60%, #123b85 100%);
    }
    @media (max-width: 540px) {
      .container {
        max-width: 98vw;
        padding: 18px 4vw 18px 4vw;
      }
      .info {
        padding: 12px 4vw 8px 4vw;
      }
      .notice {
        font-size: 0.98rem;
        padding: 8px 6px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">
        <!-- Airplane SVG icon -->
        <svg fill="none" viewBox="0 0 32 32">
          <path d="M28.5 3.5L3.5 15.5C2.7 15.9 2.7 17.1 3.5 17.5L10.5 21L14.5 28.5C14.9 29.3 16.1 29.3 16.5 28.5L28.5 3.5Z" fill="currentColor"/>
          <circle cx="24" cy="8" r="2" fill="#fff"/>
        </svg>
      </div>
      <h2>Flight Booking Confirmed</h2>
      <div class="success">Your booking is confirmed!</div>
      <div class="notice">
        Please wait <b>10 to 30 minutes</b> for your dummy ticket to be processed and sent to your email.
      </div>
    </div>
    <div class="info">
      <table class="info-table">
        <tr>
          <td>Booking ID</td>
          <td>${booking.id}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>${booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}</td>
        </tr>
        <tr>
          <td>Route</td>
          <td>${booking.departureCity.value} → ${booking.destinationCity.value}</td>
        </tr>
        <tr>
          <td>Departure Date</td>
          <td>${formatDate(booking.departureDate)}</td>
        </tr>
        <tr>
          <td>Passenger(s)</td>
          <td>${passengerNames}</td>
        </tr>
        <tr>
          <td>Total Price</td>
          <td>USD ${booking.totalPrice}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Thank you for your booking.<br>
      If you have any questions, please contact us.<br>
      <span style="color:#0070ba;font-weight:600;">Wolkenticket Team</span>
    </div>
  </div>
</body>
</html>
  `;
}

// Helper function (letakkan di file yang sama)
function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
