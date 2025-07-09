"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Heart, Users, Star, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Empowerment Through Beauty",
      description: "We believe that when you look good, you feel good. Our mission is to boost confidence through personalized hair styling."
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Every client is unique. We take time to understand your lifestyle, preferences, and hair goals to create your perfect look."
    },
    {
      icon: Star,
      title: "Excellence in Service",
      description: "We're committed to delivering exceptional results using the latest techniques and premium products."
    },
    {
      icon: Sparkles,
      title: "Artistic Innovation",
      description: "Hair is our canvas. We blend traditional techniques with modern trends to create stunning transformations."
    }
  ];

  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
    { value: "4.9", label: "Average Rating" },
    { value: "50+", label: "Awards Won" }
  ];

  const certifications = [
    "Advanced Hair Coloring Certification",
    "Balayage Specialist Training",
    "Keratin Treatment Expert",
    "Wedding Hair Specialist",
    "Texture & Curl Specialist",
    "Color Correction Advanced Course"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-6"
            >
              About Nycayen
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              The Art of Hair - Transforming Lives Through Beauty
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Nycayen, our mission is to <span className="text-primary font-semibold">Empower Through Beauty</span> 
                  by boosting confidence through personalized hair styling. We believe that beautiful hair is not just about 
                  appearance—it&apos;s about how you feel when you look in the mirror.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every client who walks through our doors is unique, and we celebrate that individuality by creating 
                  custom looks that enhance your natural beauty and reflect your personal style.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a world where everyone feels confident and beautiful in their own skin. Through the 
                  art of hair styling, we aim to transform not just appearances, but lives—building self-esteem 
                  and empowering individuals to embrace their authentic selves.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our tagline, <span className="text-primary font-semibold">&ldquo;The Art of Hair,&rdquo;</span> reflects our 
                  commitment to treating every styling session as a creative masterpiece.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              The principles that guide everything we do at Nycayen
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience & Certifications */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6"
              >
                Experience & Expertise
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                With over 5 years of experience in the beauty industry, our founder and lead stylist 
                has transformed hundreds of clients, helping them discover their perfect look and boost 
                their confidence.
              </motion.p>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                We stay current with the latest trends and techniques through continuous education and 
                professional development, ensuring our clients receive the most innovative and effective 
                hair styling services.
              </motion.p>
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 text-primary"
              >
                <Award className="w-6 h-6" />
                <span className="font-medium">Certified Professional Stylist</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h3 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-6"
              >
                Professional Certifications
              </motion.h3>
              <motion.div 
                variants={itemVariants}
                className="space-y-3"
              >
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 text-muted-foreground">
                    <Scissors className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6"
            >
              Ready to Transform Your Look?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Experience the art of hair styling with Nycayen. Book your consultation today and 
              discover the confidence that comes with beautiful hair.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/booking"
                className="bg-primary text-dark px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/portfolio"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}