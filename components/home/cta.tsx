"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Plane } from "lucide-react";
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

export default function CallToActionWithPartners() {
  return (
    <section className="py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-20 opacity-20"
          animate={{ x: [0, 40, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="h-12 w-12 text-blue-400 transform rotate-45" />
        </motion.div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full filter blur-[100px] opacity-10" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Call to Action */}
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to Fly with WolkenTicket?
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Book your verified flight reservation in minutes and soar to your
            next adventure!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          >
            <Button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto">
              Book Now
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Airline Partners */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Our Trusted Airline Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {airlinePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm transform transition-all duration-300 hover:shadow-md hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-12 w-auto mx-auto object-contain"
                />
                <span className="text-sm text-gray-600 mt-2 block">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
