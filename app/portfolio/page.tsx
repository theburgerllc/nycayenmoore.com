"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronLeft, ChevronRight, Star, Calendar, User, Heart, Grid, Layout } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  clientName: string;
  rating: number;
  date: string;
  tags: string[];
  testimonial?: string;
}

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "Elegant Balayage Transformation",
      description: "Stunning balayage highlights that perfectly complement natural hair color",
      category: "coloring",
      service: "Balayage",
      beforeImage: "/images/portfolio/before-1.jpg",
      afterImage: "/images/portfolio/after-1.jpg",
      clientName: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      tags: ["balayage", "highlights", "natural", "blonde"],
      testimonial: "I absolutely love my new look! The balayage is so natural and beautiful."
    },
    {
      id: "2",
      title: "Dramatic Color Correction",
      description: "Expert color correction from damaged blonde to healthy brunette",
      category: "coloring",
      service: "Color Correction",
      beforeImage: "/images/portfolio/before-2.jpg",
      afterImage: "/images/portfolio/after-2.jpg",
      clientName: "Emily R.",
      rating: 5,
      date: "2024-01-20",
      tags: ["color-correction", "brunette", "healthy", "transformation"],
      testimonial: "Nycayen saved my hair! I can't believe how healthy and beautiful it looks now."
    },
    {
      id: "3",
      title: "Precision Pixie Cut",
      description: "Bold pixie cut with modern styling and texture",
      category: "styling",
      service: "Haircut & Styling",
      beforeImage: "/images/portfolio/before-3.jpg",
      afterImage: "/images/portfolio/after-3.jpg",
      clientName: "Maya L.",
      rating: 5,
      date: "2024-01-25",
      tags: ["pixie", "short", "modern", "edgy"],
      testimonial: "I feel so confident and stylish with my new pixie cut!"
    },
    {
      id: "4",
      title: "Bridal Updo Elegance",
      description: "Romantic bridal updo with delicate curls and accessories",
      category: "special",
      service: "Wedding Styling",
      beforeImage: "/images/portfolio/before-4.jpg",
      afterImage: "/images/portfolio/after-4.jpg",
      clientName: "Jessica K.",
      rating: 5,
      date: "2024-02-01",
      tags: ["bridal", "updo", "elegant", "romantic"],
      testimonial: "Perfect for my wedding day! I felt like a princess."
    },
    {
      id: "5",
      title: "Keratin Smoothing Treatment",
      description: "Frizz-free, smooth hair transformation with keratin treatment",
      category: "treatments",
      service: "Keratin Treatment",
      beforeImage: "/images/portfolio/before-5.jpg",
      afterImage: "/images/portfolio/after-5.jpg",
      clientName: "Amanda T.",
      rating: 5,
      date: "2024-02-05",
      tags: ["keratin", "smooth", "frizz-free", "treatment"],
      testimonial: "My hair is so much more manageable now. I save so much time styling!"
    },
    {
      id: "6",
      title: "Vibrant Fashion Colors",
      description: "Bold fashion colors with professional color placement",
      category: "coloring",
      service: "Fashion Colors",
      beforeImage: "/images/portfolio/before-6.jpg",
      afterImage: "/images/portfolio/after-6.jpg",
      clientName: "Zoe P.",
      rating: 5,
      date: "2024-02-10",
      tags: ["fashion-colors", "bold", "creative", "vibrant"],
      testimonial: "I love how creative and vibrant my hair looks! So unique!"
    },
    {
      id: "7",
      title: "Long Layer Cut",
      description: "Beautiful long layers with face-framing highlights",
      category: "styling",
      service: "Haircut & Styling",
      beforeImage: "/images/portfolio/before-7.jpg",
      afterImage: "/images/portfolio/after-7.jpg",
      clientName: "Lisa H.",
      rating: 5,
      date: "2024-02-15",
      tags: ["long-layers", "highlights", "face-framing", "natural"],
      testimonial: "The layers add so much movement and life to my hair!"
    },
    {
      id: "8",
      title: "Curl Enhancement Treatment",
      description: "Natural curl enhancement with specialized treatments",
      category: "treatments",
      service: "Curl Treatment",
      beforeImage: "/images/portfolio/before-8.jpg",
      afterImage: "/images/portfolio/after-8.jpg",
      clientName: "Maria S.",
      rating: 5,
      date: "2024-02-20",
      tags: ["curls", "enhancement", "natural", "defined"],
      testimonial: "My curls have never looked better! They're so defined and bouncy."
    },
    {
      id: "9",
      title: "Gradient Ombré",
      description: "Smooth ombré transition from dark to light",
      category: "coloring",
      service: "Ombré",
      beforeImage: "/images/portfolio/before-9.jpg",
      afterImage: "/images/portfolio/after-9.jpg",
      clientName: "Rachel D.",
      rating: 5,
      date: "2024-02-25",
      tags: ["ombre", "gradient", "smooth", "transition"],
      testimonial: "The ombré is so seamless and beautiful. I get compliments everywhere!"
    }
  ];

  const categories = [
    { id: "all", name: "All Work", count: portfolioItems.length },
    { id: "coloring", name: "Coloring", count: portfolioItems.filter(item => item.category === "coloring").length },
    { id: "styling", name: "Styling", count: portfolioItems.filter(item => item.category === "styling").length },
    { id: "treatments", name: "Treatments", count: portfolioItems.filter(item => item.category === "treatments").length },
    { id: "special", name: "Special Events", count: portfolioItems.filter(item => item.category === "special").length }
  ];

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!selectedItem) return;
    
    if (direction === "prev") {
      setCurrentImageIndex(currentImageIndex === 0 ? 1 : 0);
    } else {
      setCurrentImageIndex(currentImageIndex === 1 ? 0 : 1);
    }
  };

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
              Our Portfolio
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Explore our stunning client transformations and artistic creations
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Controls */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="relative mb-8"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search transformations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </motion.div>

            {/* Category Filter and View Mode */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-2"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? "bg-primary text-dark"
                        : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">View:</span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-primary text-dark" : "bg-card text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "masonry" ? "bg-primary text-dark" : "bg-card text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Layout className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className={`max-w-7xl mx-auto ${
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            }`}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className={`bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer ${
                  viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                }`}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 text-accent/90 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < item.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary font-medium">{item.service}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-playfair font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{item.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-center py-20"
            >
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-playfair font-bold text-primary">
                    {selectedItem.title}
                  </h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={currentImageIndex === 0 ? selectedItem.afterImage : selectedItem.beforeImage}
                        alt={currentImageIndex === 0 ? "After" : "Before"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-dark/80 px-2 py-1 rounded text-sm font-medium text-primary">
                        {currentImageIndex === 0 ? "After" : "Before"}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleImageNavigation("prev")}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {currentImageIndex === 0 ? "Before" : "After"}
                      </button>
                      <button
                        onClick={() => handleImageNavigation("next")}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {currentImageIndex === 0 ? "Before" : "After"}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-playfair font-bold text-primary mb-2">Service</h3>
                      <p className="text-muted-foreground">{selectedItem.service}</p>
                    </div>

                    <div>
                      <h3 className="font-playfair font-bold text-primary mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedItem.description}</p>
                    </div>

                    <div>
                      <h3 className="font-playfair font-bold text-primary mb-2">Client Rating</h3>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < selectedItem.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="text-muted-foreground ml-2">({selectedItem.rating}/5)</span>
                      </div>
                    </div>

                    {selectedItem.testimonial && (
                      <div>
                        <h3 className="font-playfair font-bold text-primary mb-2">Client Testimonial</h3>
                        <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4">
                          "{selectedItem.testimonial}"
                        </blockquote>
                        <p className="text-sm text-muted-foreground mt-2">- {selectedItem.clientName}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-playfair font-bold text-primary mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Ready for Your Transformation?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Join our portfolio of satisfied clients. Book your appointment today and let us create 
              your perfect look.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/booking"
                className="bg-primary text-dark px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Book Your Transformation
              </a>
              <a
                href="/services"
                className="border border-primary text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                View Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}