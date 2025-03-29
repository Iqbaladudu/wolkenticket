"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  QuoteIcon,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

// Expanded testimonials with more details
const testimonials = [
  {
    name: "Alex Carter",
    role: "Visa Applicant",
    location: "United Kingdom",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "WolkenTicket helped me secure my visa with their fast and reliable flight reservation. The process was smooth and I received my ticket in minutes!",
    rating: 5,
    likes: 47,
    gradient: "from-blue-600 to-indigo-700",
    verified: true,
  },
  {
    name: "Sophie Lee",
    role: "Business Traveler",
    location: "Singapore",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "As someone who travels frequently, I appreciate how easy WolkenTicket makes the reservation process. Their customer support is exceptional!",
    rating: 5,
    likes: 32,
    gradient: "from-purple-600 to-pink-700",
    verified: true,
  },
  {
    name: "James Patel",
    role: "Digital Nomad",
    location: "Canada",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    quote:
      "I needed a quick reservation for my visa appointment, and WolkenTicket delivered perfectly. Their service saved me so much time and stress.",
    rating: 4,
    likes: 29,
    gradient: "from-teal-600 to-cyan-700",
    verified: true,
  },
  {
    name: "Maria Rodriguez",
    role: "Student",
    location: "Mexico",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    quote:
      "The study visa process was stressful, but getting my flight reservation from WolkenTicket was the easiest part. Highly recommend to all students!",
    rating: 5,
    likes: 38,
    gradient: "from-amber-600 to-orange-700",
    verified: true,
  },
  {
    name: "David Kim",
    role: "Tourist",
    location: "South Korea",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    quote:
      "I was skeptical at first, but WolkenTicket is the real deal. Simple process, great service, and helped me get my tourist visa without any issues.",
    rating: 5,
    likes: 41,
    gradient: "from-emerald-600 to-green-700",
    verified: true,
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHover, setCardHover] = useState(null);
  const [expanded, setExpanded] = useState(false);

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
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
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
    setActiveIndex((prev) => (prev === testimonials.length - 3 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  // Show more testimonials
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden relative"
      ref={containerRef}
    >
      {/* Decorative elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />

        <div className="absolute top-1/3 right-1/4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <QuoteIcon className="h-32 w-32 text-gray-200 opacity-40 rotate-12" />
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 bg-white px-3 py-1 rounded-full mb-4 shadow-sm"
          >
            <MessageSquare className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-gray-800">
              Customer Testimonials
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of satisfied customers who have simplified their
            travel preparations with our service
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {testimonials
                .slice(activeIndex, activeIndex + 3)
                .map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${activeIndex}-${index}`}
                    variants={itemVariants}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setCardHover(index)}
                    onMouseLeave={() => setCardHover(null)}
                    style={
                      cardHover === index ? { rotateX, rotateY, z: 10 } : {}
                    }
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="h-full perspective-1000"
                  >
                    <Card
                      className={`h-full bg-gradient-to-br ${testimonial.gradient} text-white shadow-lg border-none rounded-xl overflow-hidden will-change-transform`}
                    >
                      <CardContent className="p-8 flex flex-col gap-6 h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.5,
                          }}
                          className="text-white/80"
                        >
                          <QuoteIcon className="h-8 w-8" />
                        </motion.div>

                        <motion.p
                          className="text-lg text-white/90 leading-relaxed flex-grow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.4,
                            duration: 0.5,
                          }}
                        >
                          &quot;{testimonial.quote}&quot;
                        </motion.p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white/20">
                              <AvatarImage
                                src={testimonial.image}
                                alt={testimonial.name}
                              />
                              <AvatarFallback className="bg-white/10 text-white">
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-white">
                                  {testimonial.name}
                                </p>
                                {testimonial.verified && (
                                  <Badge className="h-5 bg-white/20 hover:bg-white/30 text-white text-[10px]">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-white/70">
                                <span>{testimonial.role}</span>
                                <span className="mx-1">•</span>
                                <span>{testimonial.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < testimonial.rating ? "text-yellow-300" : "text-white/30"}`}
                                  fill={
                                    i < testimonial.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                            <div className="flex items-center text-xs text-white/70">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{testimonial.likes}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.slice(0, testimonials.length - 2).map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-blue-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Expanded section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 overflow-hidden"
            >
              {testimonials.slice(3).map((testimonial, index) => (
                <motion.div
                  key={`expanded-${testimonial.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">
                                {testimonial.name}
                              </p>
                              {testimonial.verified && (
                                <Badge
                                  variant="outline"
                                  className="h-5 text-[10px]"
                                >
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                                  fill={
                                    i < testimonial.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mb-3">
                            {testimonial.role} • {testimonial.location}
                          </div>

                          <p className="text-gray-700">
                            &apos;{testimonial.quote}&apos;
                          </p>

                          <div className="flex items-center justify-end mt-3 text-sm text-gray-500">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>
                              {testimonial.likes} people found this helpful
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-10"
        >
          <Button
            variant="outline"
            onClick={toggleExpanded}
            className="rounded-full px-6 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            {expanded ? "Show Less" : "View More Testimonials"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
