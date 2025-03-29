"use client";

import React from "react";
import {
  StarIcon,
  Shield,
  Clock,
  CreditCard,
  CheckCircle,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    title: "Easy and Secure Booking",
    description:
      "Reserve your dummy ticket effortlessly with our trusted platform. Encrypted transactions and verified airline partnerships.",
    gradient: "from-blue-50 to-indigo-100",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    highlight: "Verified Secure",
    stat: "256-bit encryption",
  },
  {
    title: "Best Price Guarantee",
    description:
      "Get the most affordable dummy tickets for your travel plans. If you find a lower price, we'll match it instantly.",
    gradient: "from-purple-50 to-pink-100",
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    highlight: "Money Back",
    stat: "Saved 500k+ fees",
  },
  {
    title: "24/7 Customer Support",
    description:
      "We're here to help you anytime, day or night. Get personalized assistance with our dedicated support team.",
    gradient: "from-teal-50 to-cyan-100",
    icon: <Clock className="h-6 w-6 text-teal-600" />,
    highlight: "Always Online",
    stat: "2min avg. response",
  },
];

// Additional features for the expanded grid
const additionalFeatures = [
  {
    title: "Instant Delivery",
    description:
      "Receive your tickets in your email inbox within minutes of booking",
    gradient: "from-amber-50 to-orange-100",
    icon: <Zap className="h-6 w-6 text-amber-600" />,
  },
  {
    title: "Visa Application Ready",
    description:
      "Our tickets meet all requirements for visa application processes",
    gradient: "from-emerald-50 to-green-100",
    icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
  },
];

export default function Featured() {
  const featuredRef = useRef(null);
  const isInView = useInView(featuredRef, { once: true, margin: "-100px" });

  // Parallax effect for background elements
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-300, 300], [-10, 10]);

  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      ref={featuredRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ rotate }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full filter blur-[100px] opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full filter blur-[100px] opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">
              Simplified Process
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Dapatkan Tiket Dummy Dengan Mudah!
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Proses cepat, aman, dan terpercaya untuk kebutuhan perjalanan anda
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Card
                className={`h-full bg-gradient-to-br ${benefit.gradient} border-none shadow-md transition-all duration-300 overflow-hidden`}
              >
                <CardHeader className="pb-2 relative">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  <Badge className="w-fit mb-3 bg-white/80 text-gray-700 hover:bg-white">
                    {benefit.highlight}
                  </Badge>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                    <motion.div
                      className="p-2 bg-white rounded-lg shadow-sm"
                      whileHover={{ rotate: 10 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    {benefit.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700">{benefit.description}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t border-gray-100/30 pt-4">
                  <div className="text-sm text-gray-600 font-medium">
                    {benefit.stat}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-gray-700 hover:text-blue-600 hover:bg-white/60 p-0 h-8 w-8"
                  >
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StarIcon className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional features in a 2-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delayChildren: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <Card
                className={`bg-gradient-to-br ${feature.gradient} border-none shadow-sm flex items-center h-full`}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 text-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            <span className="text-base">Book Your Ticket Now</span>
          </Button>

          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center">
            <Shield className="h-4 w-4 mr-1 text-green-500" />
            <span>Secure, Verified, and Instant Processing</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full text-gray-50"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.41,74.03,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
