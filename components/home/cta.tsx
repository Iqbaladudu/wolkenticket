"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane,
  Clock,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// TypeScript interfaces
interface AirlinePartner {
  name: string;
  logo: string;
  tagline: string;
  routes: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Airline partners data
const airlinePartners: AirlinePartner[] = [
  {
    name: "Lufthansa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lufthansa_Logo_2018.svg",
    tagline: "More than just flying",
    routes: "500+ destinations",
  },
  {
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png",
    tagline: "Fly better",
    routes: "150+ destinations",
  },
  {
    name: "Delta",
    logo: "https://upload.wikimedia.org/wikipedia/ar/1/15/Delta_Air_Lines_logo.png",
    tagline: "Keep climbing",
    routes: "300+ destinations",
  },
  {
    name: "Qatar Airways",
    logo: "https://d21buns5ku92am.cloudfront.net/69647/images/433145-qatar-airways_logo-967f6f-original-1654772400.png",
    tagline: "Going places together",
    routes: "160+ destinations",
  },
  {
    name: "Singapore Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png",
    tagline: "A great way to fly",
    routes: "130+ destinations",
  },
];

// Benefits data
const benefits: Benefit[] = [
  {
    icon: <Shield className="h-5 w-5 text-blue-600" />,
    title: "Verified Reservations",
    description: "All bookings verified with airlines",
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: "Fast Delivery",
    description: "Receive your tickets in minutes",
  },
  {
    icon: <Globe className="h-5 w-5 text-blue-600" />,
    title: "Global Coverage",
    description: "Flights to 190+ countries",
  },
];

const CallToActionWithPartners: React.FC = () => {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
      },
    },
  };

  const planePathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 0.5, 0.8, 0.5, 0],
      transition: {
        pathLength: { duration: 4, ease: "easeInOut" },
        opacity: { duration: 4, times: [0, 0.2, 0.5, 0.8, 1] },
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 text-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Flight Path */}
        <svg
          className="absolute w-full h-full top-0 left-0 z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M10,30 C20,5 50,5 80,30 S95,75 90,90"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="1,2"
            variants={planePathVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </svg>

        <motion.div
          className="absolute"
          initial={{
            left: "10%",
            top: "30%",
            opacity: 0,
            scale: 0.5,
            rotate: 35,
          }}
          animate={
            isInView
              ? {
                  left: ["10%", "95%"],
                  top: ["30%", "90%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                  rotate: [35, 15, 5, 15],
                }
              : {}
          }
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <Plane className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-500" />
        </motion.div>

        {/* Gradient orbs */}
        <div className="absolute -bottom-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-50" />
        <div className="absolute top-40 -left-20 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-gradient-to-r from-amber-100/30 to-blue-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-40" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-16 sm:mb-20 md:mb-24"
        >
          <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-0">
              {/* Top Wave Decoration */}
              <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 md:h-12 overflow-hidden">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="absolute top-0 w-full h-full text-white opacity-10"
                  fill="currentColor"
                >
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.41,74.03,321.39,56.44Z"></path>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="md:col-span-3 relative z-10">
                  <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none">
                    Limited Time Offer
                  </Badge>

                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Get Your Travel Document Now — Only $8
                    <span className="relative">
                      <motion.span
                        className="absolute bottom-1 left-0 right-0 h-2 md:h-3 bg-white/20 -z-0 rounded-sm"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </span>
                    ?
                  </motion.h2>

                  <motion.p
                    className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Book your verified flight reservation in minutes and soar to
                    your next adventure! Our seamless process ensures you get
                    what you need for your visa application.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button className="group bg-white text-blue-700 hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-auto">
                      <Link href="/checkout"> Book Now</Link>
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>

                <div className="md:col-span-2 flex items-center justify-center">
                  <motion.div
                    className="relative w-full h-56 sm:h-60 md:h-full"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                    }
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 70,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                      <div className="absolute -right-8 -top-8 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-white/30 rounded-full blur-2xl"></div>

                      <div className="p-4 sm:p-6 h-full flex flex-col">
                        <div className="flex items-center mb-4">
                          <div className="bg-white/10 p-2 rounded-full mr-3">
                            <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              Boarding Pass
                            </h4>
                            <p className="text-white/60 text-xs">
                              Premium Service
                            </p>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3 sm:p-4 mb-auto">
                          <div className="flex justify-between mb-2">
                            <div>
                              <p className="text-xs text-white/60">From</p>
                              <p className="font-bold text-xl sm:text-2xl">
                                JED
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="h-px w-5 sm:w-16 bg-white/40 mx-2"></div>
                              <Plane className="h-3 w-3 sm:h-4 sm:w-4 text-white/60 transform rotate-90" />
                              <div className="h-px w-5 sm:w-16 bg-white/40 mx-2"></div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/60">To</p>
                              <p className="font-bold text-xl sm:text-2xl">
                                CGK
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 mt-4 pt-4 flex items-center justify-between">
                          <div className="text-xs text-white/60">
                            <p>Booking Ref</p>
                            <p className="font-medium text-white">WK12345</p>
                          </div>
                          <div className="text-right text-xs text-white/60">
                            <p>Status</p>
                            <p className="font-medium text-white">
                              Ready to issue
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16 sm:mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="bg-blue-50 p-2 sm:p-3 rounded-lg w-fit mb-3 sm:mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Airline Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <Badge className="mb-2 sm:mb-3">Official Partners</Badge>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Our Trusted Airline Partners
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
            We work with the world&apos;s leading airlines to provide you with
            verified flight reservations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {airlinePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => setHoveredPartner(partner.name)}
                onHoverEnd={() => setHoveredPartner(null)}
                className="relative"
              >
                <Card className="h-full border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-100 group">
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center">
                    <div className="h-10 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 relative">
                      <Image
                        height={48}
                        width={120}
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-8 sm:h-10 w-auto object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                      />
                    </div>

                    <h4 className="font-medium text-sm sm:text-base text-gray-800">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-500 italic mt-1">
                      {partner.tagline}
                    </p>

                    <Separator className="my-2 sm:my-3" />

                    <p className="text-xs text-blue-600 font-medium">
                      {partner.routes}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-3 sm:gap-y-4 text-xs sm:text-sm text-gray-500 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-100"
        >
          <div className="flex items-center">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
            <span>SSL Secured Booking</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
            <span>5-Minute Process</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
            <span>Visa Application Ready</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
            <span>190+ Countries Covered</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionWithPartners;
