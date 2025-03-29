"use client";

import { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

// Define types
interface FaqQuestion {
  question: string;
  answer: string;
  popular?: boolean;
  idx?: number; // For tracking position in original array
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  questions: FaqQuestion[];
}

interface SearchResult extends FaqQuestion {
  category: string;
  categoryLabel: string;
}

// Expanded FAQs organized by categories
const faqCategories: FaqCategory[] = [
  {
    id: "booking",
    label: "Booking",
    icon: <CheckCircle className="h-4 w-4" />,
    questions: [
      {
        question: "How do I book a flight with WolkenTicket?",
        answer:
          "Simply search for your flight, choose your dates, and confirm your booking—all in minutes! Our intuitive platform guides you every step of the way. You'll receive a confirmation email immediately after booking.",
        popular: true,
      },
      {
        question: "Is my reservation verified instantly?",
        answer:
          "Yes! Once you complete the booking process, your reservation is verified instantly with the airline, and you'll receive a confirmation email with all the details. Our verification process ensures your booking is recognized by immigration authorities for visa applications.",
        popular: true,
      },
      {
        question: "How far in advance should I book my ticket?",
        answer:
          "For optimal availability and pricing, we recommend booking at least 3-4 weeks before your intended travel date. However, our system can accommodate last-minute bookings as well, often processing them within minutes.",
      },
      {
        question: "Can I book for someone else?",
        answer:
          "Absolutely! You can book tickets for friends, family members, or colleagues. Just ensure you enter the correct passenger details during the booking process. You'll need their full name as it appears on their passport, date of birth, and contact information.",
      },
    ],
  },
  {
    id: "changes",
    label: "Changes & Cancellations",
    icon: <MessageCircle className="h-4 w-4" />,
    questions: [
      {
        question: "Can I cancel or modify my booking?",
        answer:
          "Absolutely. You can manage your booking through our portal. Cancellation and modification policies depend on the airline, but we'll assist you throughout the process. Any changes should be made at least 24 hours before the scheduled departure.",
        popular: true,
      },
      {
        question: "What is your refund policy?",
        answer:
          "Our refund policy varies depending on the type of ticket purchased. Full refunds are available for cancellations made within 24 hours of booking. After that period, refund amounts may be subject to airline policies and booking terms. Processing typically takes 5-7 business days.",
      },
      {
        question: "How do I change my travel dates?",
        answer:
          "To change your travel dates, log in to your account, select the booking you wish to modify, and click on the 'Change Dates' option. Follow the prompts to select new travel dates. Change fees may apply based on the airline's policy and fare rules.",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment & Security",
    icon: <ShieldCheck className="h-4 w-4" />,
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards (Visa, Mastercard, American Express), bank transfers, and select digital wallets including PayPal, Apple Pay, and Google Pay for a seamless payment experience. All transactions are processed securely with industry-standard encryption.",
        popular: true,
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We employ industry-leading SSL encryption and comply with PCI DSS standards to ensure your payment information is always protected. We never store your complete credit card details on our servers.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! We believe in transparent pricing. The price you see during checkout includes all necessary taxes and fees. Any optional add-ons are clearly marked with their respective costs before you complete your purchase.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: <MessageSquare className="h-4 w-4" />,
    questions: [
      {
        question: "How can I contact customer support?",
        answer:
          "Our customer support team is available 24/7 via live chat on our website, email at support@wolkenticket.com, or by phone at +1-800-123-4567. We typically respond to all inquiries within 2 hours during business hours and within 12 hours outside of business hours.",
      },
      {
        question: "What information do I need for visa applications?",
        answer:
          "Our flight reservations include all the information required for visa applications: complete itinerary with dates and flight numbers, PNR/booking reference, and airline confirmation. If your embassy requires any specific format or additional information, please contact our support team.",
      },
    ],
  },
];

// Process all questions for search functionality
const processQuestions = (): {
  allQuestions: SearchResult[];
  popularQuestions: SearchResult[];
} => {
  // Add index to questions for reference
  faqCategories.forEach((category) => {
    category.questions.forEach((q, idx) => {
      q.idx = idx;
    });
  });

  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({
      ...q,
      category: category.id,
      categoryLabel: category.label,
    })),
  );

  const popularQuestions = allQuestions.filter((q) => q.popular);

  return { allQuestions, popularQuestions };
};

const { allQuestions, popularQuestions } = processQuestions();

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("booking");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Handle search
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = allQuestions.filter(
      (q) =>
        q.question.toLowerCase().includes(query.toLowerCase()) ||
        q.answer.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
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

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white text-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300" />
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <div className="absolute -bottom-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-30" />
        <div className="absolute top-40 -left-20 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-gradient-to-r from-amber-100/30 to-blue-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-30" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 bg-blue-50 px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 shadow-sm"
          >
            <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600 mr-1" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">
              Help Center
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about our services, booking
            process, and policies. Can&apos;t find what you&apos;re looking for?
            Contact our support team.
          </motion.p>

          {/* Search Box */}
          <motion.div
            className="max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 py-5 sm:py-6 rounded-full border-gray-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      {searchResults.length} result
                      {searchResults.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                  <div className="max-h-60 sm:max-h-80 overflow-y-auto">
                    {searchResults.map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-3 sm:p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Badge
                            variant="outline"
                            className="mt-1 whitespace-nowrap text-xs"
                          >
                            {result.categoryLabel}
                          </Badge>
                          <div>
                            <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1">
                              {result.question}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {result.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FAQ Categories and Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Tabs
            defaultValue="booking"
            value={searchQuery ? "search" : activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-gray-100/70 p-1 rounded-lg">
              {faqCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow rounded-md py-2 text-xs sm:text-sm"
                  onClick={() => setSearchQuery("")}
                >
                  <span className="flex items-center">
                    <span className="mr-1 sm:mr-2 text-blue-600">
                      {category.icon}
                    </span>
                    <span className="hidden xs:inline">{category.label}</span>
                    <span className="xs:hidden">
                      {category.label.split(" ")[0]}
                    </span>
                  </span>
                </TabsTrigger>
              ))}

              {/* Additional tab for search results */}
              <TabsTrigger
                value="search"
                className="hidden" // Hide this trigger as it's only for programmatic use
              />
            </TabsList>

            {/* Search Results Content */}
            <TabsContent value="search">
              {searchResults.length > 0 ? (
                <motion.div variants={containerVariants}>
                  <Accordion
                    type="multiple"
                    className="space-y-3 sm:space-y-4"
                    value={Object.keys(expandedItems).filter(
                      (key) => expandedItems[key],
                    )}
                    onValueChange={(value) => {
                      const newExpandedItems: Record<string, boolean> = {};
                      value.forEach((v) => (newExpandedItems[v] = true));
                      setExpandedItems(newExpandedItems);
                    }}
                  >
                    {searchResults.map((faq, index) => (
                      <motion.div
                        key={`search-${index}`}
                        variants={itemVariants}
                        custom={index}
                      >
                        <AccordionItem
                          value={`search-${index}`}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                        >
                          <AccordionTrigger className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-left text-gray-800 hover:bg-blue-50 group">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Badge
                                variant="outline"
                                className="whitespace-nowrap text-xs hidden sm:inline-flex"
                              >
                                {faq.categoryLabel}
                              </Badge>
                              <span className="font-medium text-sm sm:text-base">
                                {faq.question}
                              </span>
                              {faq.popular && (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 ml-auto text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                          </AccordionTrigger>
                          <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 bg-gray-50 border-t border-gray-100 text-sm">
                            <p>{faq.answer}</p>
                            <div className="flex justify-end mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-8"
                              >
                                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="text-xs">
                                  Was this helpful?
                                </span>
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8 sm:py-12 px-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <HelpCircle className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                    No results found
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                    Try a different search term or browse by category
                  </p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 text-sm h-9 sm:h-10"
                  >
                    Clear search
                  </Button>
                </motion.div>
              )}
            </TabsContent>

            {/* Regular Category Contents */}
            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div variants={containerVariants}>
                  <Accordion
                    type="multiple"
                    className="space-y-3 sm:space-y-4"
                    value={Object.keys(expandedItems).filter(
                      (key) => expandedItems[key],
                    )}
                    onValueChange={(value) => {
                      const newExpandedItems: Record<string, boolean> = {};
                      value.forEach((v) => (newExpandedItems[v] = true));
                      setExpandedItems(newExpandedItems);
                    }}
                  >
                    {category.questions.map((faq, index) => (
                      <motion.div
                        key={`${category.id}-${index}`}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{
                          scale: 1.01,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <AccordionItem
                          value={`${category.id}-${index}`}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                          <AccordionTrigger className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-left text-gray-800 hover:bg-blue-50 group">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <motion.div
                                variants={pulseVariants}
                                animate="pulse"
                                className="bg-blue-100 p-1.5 sm:p-2 rounded-full"
                              >
                                <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                              </motion.div>
                              <span className="font-medium text-sm sm:text-base">
                                {faq.question}
                              </span>
                              {faq.popular && (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 ml-auto text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                          </AccordionTrigger>
                          <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 bg-gray-50 border-t border-gray-100 text-xs sm:text-sm">
                            <p>{faq.answer}</p>
                            <div className="flex justify-end mt-2 sm:mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-7 sm:h-8"
                              >
                                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="text-xs">
                                  Was this helpful?
                                </span>
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Popular Questions Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 sm:mt-12 md:mt-16"
        >
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">
              Popular Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {popularQuestions.slice(0, 4).map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start py-3 sm:py-6 px-3 sm:px-4 border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-left flex items-start group h-auto"
                  onClick={() => {
                    setActiveCategory(q.category);
                    setExpandedItems({ [`${q.category}-${q.idx}`]: true });
                    setSearchQuery("");
                  }}
                >
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <span className="font-normal text-xs sm:text-sm text-gray-700 group-hover:text-blue-700">
                    {q.question}
                  </span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 flex-shrink-0" />
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 sm:mt-12 md:mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto">
            Our customer support team is here to help you with any questions or
            concerns you may have.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <Button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm rounded-full px-4 sm:px-6 py-2 sm:py-6 flex items-center gap-2 h-auto text-xs sm:text-sm">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>Live Chat</span>
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 sm:px-6 py-2 sm:py-6 flex items-center gap-2 shadow-md h-auto text-xs sm:text-sm">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Email Support</span>
            </Button>

            <Button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm rounded-full px-4 sm:px-6 py-2 sm:py-6 flex items-center gap-2 h-auto text-xs sm:text-sm">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>Call Us</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
