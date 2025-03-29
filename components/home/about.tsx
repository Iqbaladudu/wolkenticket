"use client";

import React from "react";
import { Plane, Globe, Shield, Clock, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Real airline partners with logo URLs
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
  {
    name: "Singapore Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png",
  },
];

export default function AboutUs() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 text-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.15]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Plane className="h-8 w-8 text-blue-400" />
          </motion.div>
        ))}

        {/* Background circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-3 bg-blue-50 px-3 py-1 rounded-full"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">
              Trusted by thousands
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            About <span className="text-blue-600">WolkenTicket</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            WolkenTicket makes travel planning simple with fast, secure dummy
            ticket bookings, trusted by travelers worldwide. Our service
            provides verified flight reservations that help you with visa
            applications and travel preparations.
          </motion.p>
        </div>

        {/* Airline Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-2 bg-white">
              Airline Partners
            </Badge>
            <h3 className="text-2xl font-semibold">
              Partnered with leading airlines
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 bg-white/60 backdrop-blur-sm py-8 px-4 rounded-2xl shadow-sm">
            {airlinePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                custom={index}
                variants={logoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="flex flex-col items-center"
              >
                <div className="relative h-16 w-40 mb-2 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 160px"
                  />
                </div>
                <span className="text-xs text-gray-500">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Ready to simplify your travel preparations?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of travelers who trust WolkenTicket for their flight
            reservation needs. Our fast, secure service is available 24/7 to
            support your journey.
          </p>

          <Button
            size="lg"
            className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
          >
            <span>Get started today</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
