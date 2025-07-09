"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Tag, Eye, MessageCircle } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  views?: number;
  comments?: number;
}

interface BlogPreviewProps {
  limit?: number;
  showFeatured?: boolean;
  layout?: 'grid' | 'list';
}

export function BlogPreview({ limit = 3, showFeatured = true, layout = 'grid' }: BlogPreviewProps) {
  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "10 Essential Hair Care Tips for Winter",
      excerpt: "Winter weather can be harsh on your hair. Learn how to protect and nourish your locks during the cold season with these expert tips from our stylists.",
      slug: "winter-hair-care-tips",
      author: "Nycayen Team",
      publishedAt: "2024-12-15",
      readTime: "5 min read",
      category: "Hair Care",
      tags: ["winter", "hair care", "tips", "protection"],
      featured: true,
      views: 1247,
      comments: 23,
    },
    {
      id: "2",
      title: "The Art of Color Correction: Before & After",
      excerpt: "See how our expert colorists transform hair color disasters into stunning masterpieces. Real client stories and techniques revealed.",
      slug: "color-correction-before-after",
      author: "Maria Rodriguez",
      publishedAt: "2024-12-10",
      readTime: "7 min read",
      category: "Color Techniques",
      tags: ["color correction", "transformation", "techniques"],
      featured: true,
      views: 892,
      comments: 18,
    },
    {
      id: "3",
      title: "Choosing the Perfect Haircut for Your Face Shape",
      excerpt: "Discover which haircuts complement different face shapes and learn how to communicate with your stylist to get the perfect cut.",
      slug: "haircut-face-shape-guide",
      author: "Jennifer Chen",
      publishedAt: "2024-12-08",
      readTime: "6 min read",
      category: "Styling Guide",
      tags: ["haircut", "face shape", "styling", "guide"],
      views: 654,
      comments: 12,
    },
    {
      id: "4",
      title: "Sustainable Hair Care: Eco-Friendly Products We Love",
      excerpt: "Explore our curated selection of sustainable, eco-friendly hair care products that are kind to both your hair and the environment.",
      slug: "sustainable-hair-care-products",
      author: "Amanda Davis",
      publishedAt: "2024-12-05",
      readTime: "4 min read",
      category: "Product Reviews",
      tags: ["sustainable", "eco-friendly", "products", "environment"],
      views: 423,
      comments: 8,
    },
    {
      id: "5",
      title: "Bridal Hair Trends 2025: What's Hot This Season",
      excerpt: "From romantic updos to modern braids, discover the hottest bridal hair trends that will make your wedding day unforgettable.",
      slug: "bridal-hair-trends-2025",
      author: "Lisa Thompson",
      publishedAt: "2024-12-01",
      readTime: "8 min read",
      category: "Bridal",
      tags: ["bridal", "wedding", "trends", "2025"],
      featured: true,
      views: 1156,
      comments: 31,
    },
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const displayPosts = showFeatured ? featuredPosts.slice(0, limit) : blogPosts.slice(0, limit);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (layout === 'list') {
    return (
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            className="card p-6 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Placeholder */}
              <div className="md:w-1/3">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Tag className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                    <p className="text-primary/50 text-sm">{post.category}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-2/3 space-y-4">
                <div>
                  {post.featured && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-accent group-hover:text-primary transition-colors mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  {post.views && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                  )}
                  {post.comments && (
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
          >
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                  Featured
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-sm text-accent text-xs px-3 py-1 rounded-full">
                {post.category}
              </div>

              {/* Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Tag className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                  <p className="text-primary/50 text-sm">{post.title}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-accent group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Meta Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    {post.views && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(post.views)}</span>
                      </div>
                    )}
                    {post.comments && (
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{post.tags.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View All Blog Posts */}
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="btn-outline inline-flex items-center space-x-2"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}