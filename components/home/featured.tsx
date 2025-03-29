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
import Link from "next/link";

const benefits = [
  {
    title: "Easy and Secure Booking",
    description:
      "Book your verifiable dummy ticket in minutes through our secure platform with authentic airline partnerships.",
    gradient: "from-blue-50 to-indigo-100",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    highlight: "100% Secure",
    stat: "Stress-free privacy",
  },
  {
    title: "Unbeatable Price Promise",
    description:
      "Access the most competitive rates for your dummy tickets. Found a better price elsewhere? We'll not just match it — we'll beat it by 5%.",
    gradient: "from-purple-50 to-pink-100",
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    highlight: "Money Back Guaranteed",
    stat: "Save more for your next trip",
  },
  {
    title: "24/7 Priority Support",
    description:
      "Never wait for help with our round-the-clock customer care. Get expert assistance from our dedicated team whenever you need it, wherever you are.",
    gradient: "from-teal-50 to-cyan-100",
    icon: <Clock className="h-6 w-6 text-teal-600" />,
    highlight: "Always at Your Service",
    stat: "<15min response time",
  },
];

// Additional features for the expanded grid
const additionalFeatures = [
  {
    title: "Lightning-Fast Delivery",
    description:
      "Your verified tickets delivered to your inbox in 10-30 minutes — guaranteed. If we're late, your next booking is completely free",
    gradient: "from-amber-50 to-orange-100",
    icon: <Zap className="h-6 w-6 text-amber-600" />,
  },
  {
    title: "Visa-Compliance Guaranteed",
    description:
      "Our dummy tickets are designed to meet and exceed all embassy and consulate requirements worldwide",
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
            Instant Verified Dummy Flight Tickets: Stress-Free & Simple
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Seamless Processing for Worry-Free Travel
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
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 text-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Link href="/checkout">
              Secure Your Verified Ticket Now — Only $8 | Limited Time Offer
            </Link>
          </Button>
          a
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
