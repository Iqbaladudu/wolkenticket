"use client";

import { Plane } from "lucide-react";
import { motion } from "framer-motion";

// Real airline partners with logo URLs (replace with your own assets)
const airlinePartners = [
  {
    name: "Lufthansa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lufthansa_Logo_2018.svg",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png",
  },
  {
    name: "Delta",
    logo: "https://upload.wikimedia.org/wikipedia/ar/1/15/Delta_Air_Lines_logo.png",
  },
  {
    name: "Qatar Airways",
    logo: "https://d21buns5ku92am.cloudfront.net/69647/images/433145-qatar-airways_logo-967f6f-original-1654772400.png",
  },
];

export default function AboutUs() {
  return (
    <section className="py-12 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="h-10 w-10 text-blue-300" />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About WolkenTicket
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          WolkenTicket makes travel planning simple with fast, secure dummy
          ticket bookings, trusted by travelers worldwide.
        </motion.p>

        {/* Airline Partners */}
        <motion.div
          className="flex justify-center gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {airlinePartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-10 w-auto object-contain transition-transform duration-300"
              />
              <span className="text-sm text-gray-600 mt-2">{partner.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
