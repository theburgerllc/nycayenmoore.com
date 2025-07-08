"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Star, Award, Users } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Award, value: "5+", label: "Years Experience" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary/30 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-primary/40 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-primary/20 rounded-full"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4 border border-primary/30 px-4 py-2 rounded-full">
                Professional Hair Styling
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight"
            >
              <span className="text-accent">Empower Through</span>
              <br />
              <span className="gradient-text">Beauty</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Boosting Confidence via Personalized Hair Styling. 
              <span className="text-primary font-medium block mt-2">
                The Art of Hair
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link
                href="/booking"
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Transformation</span>
              </Link>
              <Link
                href="/portfolio"
                className="btn-outline flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>View Portfolio</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-accent">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column - Hero Image/Video */}
          <motion.div
            variants={itemVariants}
            className="relative order-first lg:order-last"
          >
            <div className="relative">
              {/* Instagram Video Placeholder */}
              <div className="aspect-[9/16] max-w-sm mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden shadow-2xl">
                <div className="instagram-embed">
                  {/* Placeholder for Instagram video carousel */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <p className="text-primary font-medium">Instagram Video</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Star className="w-8 h-8 text-primary" fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Award className="w-6 h-6 text-secondary" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}