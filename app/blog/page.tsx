"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Eye, MessageCircle, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  comments: number;
  readTime: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Ultimate Guide to Hair Care Routines",
      excerpt: "Discover the secrets to maintaining healthy, beautiful hair with our comprehensive guide to daily hair care routines.",
      content: "A complete guide to hair care...",
      author: "Nycayen Moore",
      date: "2024-03-01",
      category: "hair-care",
      tags: ["hair-care", "routine", "healthy-hair", "tips"],
      image: "/images/blog/hair-care-routine.jpg",
      views: 1240,
      comments: 23,
      readTime: "8 min",
      featured: true
    },
    {
      id: "2",
      title: "Spring Hair Color Trends 2024",
      excerpt: "Explore the hottest hair color trends for spring 2024, from subtle balayage to bold fashion colors.",
      content: "Spring color trends...",
      author: "Nycayen Moore",
      date: "2024-02-28",
      category: "trends",
      tags: ["trends", "color", "spring", "2024"],
      image: "/images/blog/spring-colors.jpg",
      views: 892,
      comments: 18,
      readTime: "6 min"
    },
    {
      id: "3",
      title: "How to Choose the Right Haircut for Your Face Shape",
      excerpt: "Learn how to select the perfect haircut that complements your unique face shape and enhances your best features.",
      content: "Face shape guide...",
      author: "Nycayen Moore",
      date: "2024-02-25",
      category: "styling",
      tags: ["face-shape", "haircut", "styling", "tips"],
      image: "/images/blog/face-shape-guide.jpg",
      views: 1567,
      comments: 34,
      readTime: "10 min",
      featured: true
    },
    {
      id: "4",
      title: "Protecting Your Hair from Heat Damage",
      excerpt: "Essential tips and products to protect your hair from heat styling tools and maintain its health and shine.",
      content: "Heat protection guide...",
      author: "Nycayen Moore",
      date: "2024-02-20",
      category: "hair-care",
      tags: ["heat-protection", "styling", "hair-health", "products"],
      image: "/images/blog/heat-protection.jpg",
      views: 723,
      comments: 12,
      readTime: "5 min"
    },
    {
      id: "5",
      title: "The Science Behind Hair Growth",
      excerpt: "Understanding the hair growth cycle and what factors influence healthy hair growth and thickness.",
      content: "Hair growth science...",
      author: "Nycayen Moore",
      date: "2024-02-15",
      category: "education",
      tags: ["hair-growth", "science", "education", "health"],
      image: "/images/blog/hair-growth.jpg",
      views: 945,
      comments: 21,
      readTime: "7 min"
    },
    {
      id: "6",
      title: "DIY Hair Masks for Every Hair Type",
      excerpt: "Natural and effective DIY hair mask recipes using ingredients you probably already have at home.",
      content: "DIY hair masks...",
      author: "Nycayen Moore",
      date: "2024-02-10",
      category: "diy",
      tags: ["diy", "hair-masks", "natural", "recipes"],
      image: "/images/blog/diy-masks.jpg",
      views: 1123,
      comments: 28,
      readTime: "6 min"
    },
    {
      id: "7",
      title: "Wedding Hair Inspiration: Timeless Styles",
      excerpt: "Elegant bridal hair ideas that will make you feel beautiful and confident on your special day.",
      content: "Wedding hair styles...",
      author: "Nycayen Moore",
      date: "2024-02-05",
      category: "wedding",
      tags: ["wedding", "bridal", "elegant", "inspiration"],
      image: "/images/blog/wedding-hair.jpg",
      views: 1456,
      comments: 42,
      readTime: "9 min"
    },
    {
      id: "8",
      title: "Managing Curly Hair: Tips and Techniques",
      excerpt: "Expert advice on caring for and styling curly hair to enhance your natural texture and reduce frizz.",
      content: "Curly hair care...",
      author: "Nycayen Moore",
      date: "2024-01-30",
      category: "styling",
      tags: ["curly-hair", "texture", "styling", "frizz"],
      image: "/images/blog/curly-hair.jpg",
      views: 834,
      comments: 19,
      readTime: "7 min"
    },
    {
      id: "9",
      title: "The Best Hair Products for Winter",
      excerpt: "Protect your hair from harsh winter weather with our recommended products and routines.",
      content: "Winter hair care...",
      author: "Nycayen Moore",
      date: "2024-01-25",
      category: "seasonal",
      tags: ["winter", "products", "protection", "seasonal"],
      image: "/images/blog/winter-care.jpg",
      views: 678,
      comments: 15,
      readTime: "5 min"
    }
  ];

  const categories = [
    { id: "all", name: "All Posts", count: blogPosts.length },
    { id: "hair-care", name: "Hair Care", count: blogPosts.filter(post => post.category === "hair-care").length },
    { id: "trends", name: "Trends", count: blogPosts.filter(post => post.category === "trends").length },
    { id: "styling", name: "Styling", count: blogPosts.filter(post => post.category === "styling").length },
    { id: "education", name: "Education", count: blogPosts.filter(post => post.category === "education").length },
    { id: "diy", name: "DIY", count: blogPosts.filter(post => post.category === "diy").length },
    { id: "wedding", name: "Wedding", count: blogPosts.filter(post => post.category === "wedding").length },
    { id: "seasonal", name: "Seasonal", count: blogPosts.filter(post => post.category === "seasonal").length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              Hair Care Blog
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Expert tips, trends, and insights for beautiful, healthy hair
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8 text-center"
            >
              Featured Posts
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-dark px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-playfair font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </div>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="relative mb-8"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-dark"
                      : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-primary">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-playfair font-bold text-primary mb-3 line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-20"
              >
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                  No Articles Found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-12 bg-gradient-to-b from-dark to-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-card text-primary hover:bg-primary/10"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-primary text-dark"
                      : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-card text-primary hover:bg-primary/10"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6"
            >
              Stay Updated
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8"
            >
              Subscribe to our newsletter for the latest hair care tips and trends
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}