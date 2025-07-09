"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, Star, Scissors, Palette, Sparkles, Crown, Heart, Zap } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: { min: number; max?: number };
  duration: string;
  category: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const services: Service[] = [
    {
      id: "haircut-styling",
      name: "Haircut & Styling",
      shortDescription: "Professional cut and style tailored to your face shape and lifestyle",
      description: "Our signature haircut and styling service combines precision cutting techniques with personalized styling to create a look that's uniquely you. We consider your face shape, hair texture, lifestyle, and personal preferences to deliver a cut that enhances your natural beauty.",
      price: { min: 85, max: 150 },
      duration: "60-90 minutes",
      category: "styling",
      features: [
        "Consultation and face shape analysis",
        "Precision cutting techniques",
        "Personalized styling",
        "Blow-dry and finish",
        "Hair care tips and maintenance advice"
      ],
      icon: Scissors,
      popular: true
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      shortDescription: "Full color services including highlights, lowlights, and color corrections",
      description: "Transform your look with our comprehensive color services. From subtle highlights to bold color transformations, our expert colorists use premium products to achieve stunning, long-lasting results that complement your skin tone and style.",
      price: { min: 120, max: 300 },
      duration: "2-4 hours",
      category: "coloring",
      features: [
        "Color consultation and strand test",
        "Premium color products",
        "Foil highlights or balayage technique",
        "Toner application",
        "Color protection treatment",
        "Styling and finish"
      ],
      icon: Palette,
      popular: true
    },
    {
      id: "balayage",
      name: "Balayage",
      shortDescription: "Hand-painted highlights for a natural, sun-kissed look",
      description: "Our balayage technique creates beautiful, natural-looking highlights that grow out seamlessly. This hand-painted method allows for a more personalized and artistic approach to hair coloring, perfect for those wanting a low-maintenance yet stunning look.",
      price: { min: 180, max: 280 },
      duration: "3-4 hours",
      category: "coloring",
      features: [
        "Hand-painted technique",
        "Natural-looking results",
        "Low maintenance growth",
        "Customizable placement",
        "Toning for perfect shade",
        "Styling and finish"
      ],
      icon: Sparkles
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning Treatment",
      shortDescription: "Intensive treatment to restore moisture and shine to damaged hair",
      description: "Revitalize your hair with our deep conditioning treatments. Perfect for dry, damaged, or chemically treated hair, these intensive treatments restore moisture, add shine, and improve hair health and manageability.",
      price: { min: 45, max: 85 },
      duration: "45-60 minutes",
      category: "treatments",
      features: [
        "Hair analysis and consultation",
        "Deep penetrating treatment",
        "Scalp massage",
        "Heat treatment for better absorption",
        "Moisture lock finish",
        "Take-home care recommendations"
      ],
      icon: Heart
    },
    {
      id: "keratin-treatment",
      name: "Keratin Treatment",
      shortDescription: "Smoothing treatment to reduce frizz and add shine",
      description: "Our keratin treatment smooths the hair cuticle, reducing frizz and adding incredible shine. This treatment is perfect for those with unruly, frizzy, or damaged hair who want smoother, more manageable locks.",
      price: { min: 200, max: 350 },
      duration: "2-3 hours",
      category: "treatments",
      features: [
        "Frizz reduction for up to 4 months",
        "Adds shine and smoothness",
        "Reduces drying time",
        "Improves hair manageability",
        "Safe for all hair types",
        "Aftercare instructions included"
      ],
      icon: Zap
    },
    {
      id: "wedding-special",
      name: "Wedding & Special Events",
      shortDescription: "Bridal and special occasion hair styling services",
      description: "Make your special day perfect with our bridal and special event styling services. We offer trial sessions, day-of styling, and can accommodate bridal parties. Our elegant updos and styles will make you feel beautiful and confident.",
      price: { min: 150, max: 400 },
      duration: "1-3 hours",
      category: "special",
      features: [
        "Bridal consultation and trial",
        "Day-of styling service",
        "Bridal party packages available",
        "Long-lasting styles",
        "Touch-up kit provided",
        "Photography-ready finish"
      ],
      icon: Crown,
      popular: true
    }
  ];

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    { id: "styling", name: "Styling", count: services.filter(s => s.category === "styling").length },
    { id: "coloring", name: "Coloring", count: services.filter(s => s.category === "coloring").length },
    { id: "treatments", name: "Treatments", count: services.filter(s => s.category === "treatments").length },
    { id: "special", name: "Special Events", count: services.filter(s => s.category === "special").length }
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);

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
              Our Services
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Discover our range of personalized hair styling services designed to enhance your natural beauty
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-dark"
                    : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <service.icon className="w-8 h-8 text-primary flex-shrink-0" />
                    {service.popular && (
                      <span className="bg-primary text-dark text-xs px-2 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">
                        ${service.price.min}{service.price.max && `-$${service.price.max}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-primary">Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="w-full bg-primary text-dark py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block"
                  >
                    Book This Service
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Details Modal Trigger */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8 text-center"
            >
              Why Choose Our Services?
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Expert Stylists</h3>
                <p className="text-muted-foreground">
                  Our certified professionals stay updated with the latest trends and techniques
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Personalized Care</h3>
                <p className="text-muted-foreground">
                  Every service is tailored to your unique hair type, lifestyle, and preferences
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Premium Products</h3>
                <p className="text-muted-foreground">
                  We use only the finest hair care products for optimal results and hair health
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
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
              Ready to Transform Your Hair?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Book your appointment today and experience the art of hair styling with Nycayen. 
              We can&apos;t wait to help you discover your perfect look.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/booking"
                className="bg-primary text-dark px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Ask a Question
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}