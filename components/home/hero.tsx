"use client";

import React, { useEffect } from "react";
import { Cloud, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Use section for semantic structure */}
      <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-900 relative overflow-hidden flex items-center">
        {/* Decorative elements with animations */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud size={40} className="text-blue-300" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 opacity-20"
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud size={60} className="text-purple-300" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 opacity-20"
            animate={{ y: [0, -25, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud size={50} className="text-blue-200" />
          </motion.div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Plane
              className="text-blue-600 transform transition-transform duration-300 hover:rotate-12"
              size={32}
            />
            <span className="text-xl font-semibold text-gray-900">
              WolkenTicket
            </span>
          </motion.div>

          {/* Ensure this is the only H1 on the page */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Get Verified Flight Reservations In Minutes
            <br />— Just $8
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Fast, Easy, Reliable & Surprisingly Affordable Verified Flight Reservations Starting At Just $8. Perfect for Visa Applications.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              asChild
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/checkout">Book Now</Link>
            </Button>
          </motion.div>

          {/* Stats with animations */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {[
              { number: "500+", label: "Ticket Issued" },
              { number: "1000+", label: "Happy Travelers" },
              { number: "24/7", label: "Support" },
              { number: "4.9★", label: "Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.2,
                  type: "spring",
                }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced background gradient effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
    </>
  );
}
