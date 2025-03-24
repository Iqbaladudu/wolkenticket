"use client";

import { StarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Easy and Secure Booking",
    description:
      "Reserve your dummy ticket effortlessly with our trusted platform.",
    gradient: "from-blue-100 to-indigo-200",
  },
  {
    title: "Best Price Guarantee",
    description: "Get the most affordable dummy tickets for your travel plans.",
    gradient: "from-purple-100 to-pink-200",
  },
  {
    title: "24/7 Customer Support",
    description: "We’re here to help you anytime, day or night.",
    gradient: "from-teal-100 to-cyan-200",
  },
];

export default function Featured() {
  return (
    <section className="py-16 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full filter blur-[100px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Dapatkan Tiket Dummy Dengan Mudah!
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card
                className={`bg-gradient-to-br ${benefit.gradient} border-none shadow-md transform transition-all duration-300 hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    >
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
