"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Cloud, MapPin, Plane, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ComboBoxResponsive from "@/components/autocomplete-dropdown";

export default function Hero() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/90 to-white min-h-[90vh] flex items-center">
      {/* Animated clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <Cloud className="absolute text-white h-16 w-16 opacity-80 animate-float-slow top-20 left-[10%]" />
        <Cloud className="absolute text-white h-24 w-24 opacity-90 animate-float-medium top-40 left-[30%]" />
        <Cloud className="absolute text-white h-20 w-20 opacity-80 animate-float-fast top-16 left-[60%]" />
        <Cloud className="absolute text-white h-28 w-28 opacity-70 animate-float-slow top-32 left-[80%]" />
        <Cloud className="absolute text-white h-16 w-16 opacity-80 animate-float-medium top-60 left-[20%]" />
        <Cloud className="absolute text-white h-20 w-20 opacity-90 animate-float-fast top-72 left-[70%]" />
      </div>

      {/* Flying airplane animation */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute animate-fly-across">
          <div className="relative">
            <Plane className="h-12 w-12 text-primary rotate-[30deg] drop-shadow-md" />
            <div className="absolute h-1 w-32 bg-primary/30 rounded-full blur-sm -left-32 top-6 -rotate-[30deg]"></div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/100 px-4 py-1.5 w-fit">
              <Plane className="mr-2 h-4 w-4 text-white" />
              <span className="text-sm font-bold text-white">
                Ready for adventure!
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-white drop-shadow-2xl">
                Get Confirmed Flight Reservation
              </span>
              <span className="block text-white drop-shadow-2xl">
                in Minutes!{" "}
                <span className="animate-wave inline-block">✈️</span>
              </span>
            </h1>

            <p className="max-w-md text-lg text-gray-700">
              Book your next adventure with our cute and friendly flight booking
              service. We make travel fun and hassle-free!
            </p>

            {/* Flight search form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/20 space-y-4 max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    From
                  </label>
                  <ComboBoxResponsive />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    To
                  </label>
                  <Input
                    placeholder="Arrival city"
                    className="rounded-xl border-primary/20 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                    Departure Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl border-primary/20",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                    Return Date (Optional)
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl border-primary/20",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base">
                <Search className="mr-2 h-4 w-4" />
                Find Flights
              </Button>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 hidden md:block">
            <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px]">
              {/* Animated globe/map with flight path */}
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-slow"></div>
              <div className="absolute inset-8 rounded-full bg-blue-50 border-4 border-white shadow-inner flex items-center justify-center">
                <div className="relative w-full h-full hidden sm:flex">
                  {/* Simplified world map */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-primary/20 rounded-full"></div>
                  <div className="absolute top-2/4 left-1/3 w-1/3 h-1/5 bg-primary/30 rounded-full"></div>

                  {/* Animated flight path */}
                  <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        d="M10,50 Q50,20 90,50"
                        fill="none"
                        stroke="#FFEE8C"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-dash"
                      />
                      <circle cx="10" cy="50" r="3" fill="#FFEE8C" />
                      <circle cx="90" cy="50" r="3" fill="#FFEE8C" />
                    </svg>

                    {/* Animated plane along path */}
                    <div className="absolute animate-fly-path">
                      <Plane className="h-6 w-6 text-primary rotate-[30deg]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-6 top-1/4 animate-bounce-slow">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="absolute -left-6 bottom-1/4 animate-bounce-slow animation-delay-1000">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
