"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Alex Carter",
    role: "Product Manager",
    quote:
      "This team transformed our vision into a masterpiece. Absolutely stellar work!",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    name: "Sophie Lee",
    role: "Designer",
    quote:
      "The attention to detail and creativity blew me away. Highly recommend!",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "James Patel",
    role: "Developer",
    quote: "Fast, reliable, and innovative—everything you want in a partner.",
    gradient: "from-teal-500 to-cyan-600",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                scale: 0.95,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <Card
                className={`bg-gradient-to-br ${testimonial.gradient} text-white shadow-lg border-none p-6 transform transition-all duration-500 hover:shadow-2xl`}
              >
                <CardContent className="flex flex-col gap-4">
                  <QuoteIcon className="h-8 w-8 text-white/80" />
                  <p className="text-lg italic text-white/90">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
