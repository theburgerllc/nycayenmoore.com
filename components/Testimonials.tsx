"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  service: string;
  image?: string;
  date: string;
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock testimonials data (in a real app, this would come from an API)
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "Absolutely incredible experience! My hair has never looked better. The team at Nycayen truly understands the art of hair styling. I walked in feeling ordinary and left feeling like a queen!",
      service: "Hair Coloring & Styling",
      date: "2024-12-15",
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      location: "Brooklyn, NY",
      rating: 5,
      comment: "I was hesitant about changing my look, but the consultation was so thorough and professional. They listened to my concerns and created exactly what I envisioned. My confidence has never been higher!",
      service: "Hair Transformation",
      date: "2024-12-10",
    },
    {
      id: "3",
      name: "Ashley Thompson",
      location: "Manhattan, NY",
      rating: 5,
      comment: "The attention to detail is phenomenal. Every cut, every color choice, every styling decision was perfect. This isn't just a salon - it's where art meets beauty. Highly recommend!",
      service: "Balayage & Cut",
      date: "2024-12-08",
    },
    {
      id: "4",
      name: "Jennifer Chen",
      location: "Queens, NY",
      rating: 5,
      comment: "I've been to many salons, but none compare to Nycayen. The personalized approach and genuine care for each client shines through. My hair looks and feels amazing!",
      service: "Hair Treatment & Styling",
      date: "2024-12-05",
    },
    {
      id: "5",
      name: "Amanda Davis",
      location: "Bronx, NY",
      rating: 5,
      comment: "From the moment I walked in, I felt welcomed and valued. The transformation exceeded my expectations. The skill and artistry here is unmatched. I'm a client for life!",
      service: "Complete Makeover",
      date: "2024-12-01",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Testimonial Display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Background Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-20 h-20 text-primary" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
              {/* Client Avatar & Info */}
              <div className="text-center md:text-left">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto md:mx-0 mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h4 className="text-xl font-semibold text-accent mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                
                <p className="text-muted-foreground text-sm mb-3">
                  {testimonials[currentIndex].location}
                </p>
                
                <div className="flex justify-center md:justify-start mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <div className="text-center md:text-left">
                  <p className="text-primary font-medium text-sm">
                    {testimonials[currentIndex].service}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(testimonials[currentIndex].date)}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:col-span-2">
                <blockquote className="text-lg md:text-xl leading-relaxed text-accent italic relative">
                  <Quote className="w-6 h-6 text-primary/50 absolute -top-2 -left-2" />
                  <span className="ml-4">
                    "{testimonials[currentIndex].comment}"
                  </span>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark/80 hover:bg-dark/90 rounded-full flex items-center justify-center text-accent transition-all duration-200 hover:scale-110 z-20"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark/80 hover:bg-dark/90 rounded-full flex items-center justify-center text-accent transition-all duration-200 hover:scale-110 z-20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Testimonial Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-3 bg-primary rounded-full"
                : "w-3 h-3 bg-primary/30 hover:bg-primary/50 rounded-full"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">500+</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">4.9</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">98%</div>
          <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">5+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
      </div>

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Auto-playing testimonials</span>
          </div>
        </div>
      )}
    </div>
  );
}