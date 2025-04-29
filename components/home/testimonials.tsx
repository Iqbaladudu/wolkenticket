"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image"; // Import next/image

// Sample testimonials data (replace with your actual data)
const testimonials = [
  {
    name: "Alex Johnson",
    location: "Berlin, Germany",
    avatar: "/images/avatars/alex.jpg", // Replace with actual path
    rating: 5,
    title: "Incredibly Fast and Reliable!",
    text: "Needed a flight reservation for my Schengen visa urgently. Wolkenticket delivered a verified ticket in less than 15 minutes. The process was smooth, and the price was unbeatable. Highly recommended!",
  },
  {
    name: "Maria Garcia",
    location: "Bogotá, Colombia",
    avatar: "/images/avatars/maria.jpg", // Replace with actual path
    rating: 5,
    title: "Saved My Visa Application",
    text: "My embassy required proof of onward travel. Wolkenticket provided exactly what I needed, and it was accepted without any issues. Their 24/7 support was also very helpful.",
  },
  {
    name: "Ken Tanaka",
    location: "Tokyo, Japan",
    avatar: "/images/avatars/ken.jpg", // Replace with actual path
    rating: 4,
    title: "Great Service, Affordable Price",
    text: "Used Wolkenticket for my trip planning. The dummy ticket helped me secure accommodation and plan my itinerary before committing to expensive flights. Good value for money.",
  },
  {
    name: "Aisha Khan",
    location: "Dubai, UAE",
    avatar: "/images/avatars/aisha.jpg", // Replace with actual path
    rating: 5,
    title: "Excellent Customer Support",
    text: "Had a question about the booking details, and their support team responded via WhatsApp almost instantly. Very impressed with the service level.",
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHover, setCardHover] = useState(null);
  const [expanded, setExpanded] = useState<number | null>(null); // Track expanded testimonial index

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6],
  );

  // Smooth mouse tracking for cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 300], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 300], [-5, 5]),
    springConfig,
  );

  // Handle mouse movement for 3D effect
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  // Reset mouse position on leave
  function handleMouseLeave() {
    mouseX.set(150); // Center X
    mouseY.set(150); // Center Y
  }

  // Variants for staggered animations
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
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  // Handle navigation
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setExpanded(null); // Collapse on navigation
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
     setExpanded(null); // Collapse on navigation
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 7000); // Change testimonial every 7 seconds
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section // Use section tag
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      ref={containerRef}
      aria-labelledby="testimonials-heading" // Add aria-label
    >
      {/* Background elements */}
      {/* ... (add decorative elements if desired) ... */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-[120px] opacity-30"></div>

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity }} // Apply parallax opacity
      >
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white shadow-sm">What Our Customers Say</Badge>
          <motion.h2 // Use h2 for section heading
            id="testimonials-heading" // ID for aria-labelledby
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            style={{ y }} // Apply parallax y-offset
          >
            Trusted by Travelers Worldwide
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ y }} // Apply parallax y-offset
          >
            Hear directly from users who simplified their visa process and travel planning with Wolkenticket.
          </motion.p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-sm shadow-md hover:bg-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-sm shadow-md hover:bg-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonial Card */}
          <div className="w-full max-w-2xl perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <motion.div
                  style={{ rotateX, rotateY }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <Card className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 transform-style-3d">
                    <CardContent className="p-8">
                      {/* Use figure and blockquote for semantic structure */}
                      <figure>
                        <Quote className="h-8 w-8 text-blue-200 mb-4" aria-hidden="true" />
                        <blockquote className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{testimonials[activeIndex].title}</h3>
                          <p className={`text-gray-600 ${expanded !== activeIndex ? 'line-clamp-3' : ''}`}>
                            {testimonials[activeIndex].text}
                          </p>
                           {testimonials[activeIndex].text.length > 150 && ( // Example length check
                             <button
                               onClick={() => setExpanded(expanded === activeIndex ? null : activeIndex)}
                               className="text-blue-600 hover:underline text-sm mt-2"
                             >
                               {expanded === activeIndex ? 'Read Less' : 'Read More'}
                             </button>
                           )}
                        </blockquote>
                        <figcaption className="flex items-center space-x-4 border-t border-gray-100 pt-6">
                          <Avatar className="h-12 w-12 border-2 border-blue-100">
                            <AvatarImage
                              src={testimonials[activeIndex].avatar}
                              // Add descriptive alt text
                              alt={`Avatar of ${testimonials[activeIndex].name}`}
                            />
                            <AvatarFallback>
                              {testimonials[activeIndex].name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonials[activeIndex].name}</div>
                            <div className="text-sm text-gray-500">{testimonials[activeIndex].location}</div>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {setActiveIndex(index); setExpanded(null);}}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                activeIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
