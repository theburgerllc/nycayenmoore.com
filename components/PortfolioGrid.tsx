"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, List, Search, Eye, Heart, Share2, Calendar } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeImage?: string;
  description: string;
  client: string;
  date: string;
  tags: string[];
  likes?: number;
  featured?: boolean;
}

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
  showSearch?: boolean;
  columns?: 2 | 3 | 4;
}

export function PortfolioGrid({ 
  limit, 
  showFilters = true, 
  showSearch = true, 
  columns = 3 
}: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Mock portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "Dramatic Color Transformation",
      category: "coloring",
      image: "/images/portfolio/transformation1.jpg",
      beforeImage: "/images/portfolio/transformation1-before.jpg",
      description: "Complete hair makeover from brunette to stunning blonde balayage with lowlights for depth and dimension.",
      client: "Sarah M.",
      date: "2024-12-15",
      tags: ["balayage", "blonde", "transformation", "color"],
      likes: 156,
      featured: true,
    },
    {
      id: "2",
      title: "Elegant Wedding Updo",
      category: "special",
      image: "/images/portfolio/wedding1.jpg",
      description: "Romantic low bun with soft face-framing pieces and delicate pearl accessories for a garden wedding.",
      client: "Jennifer L.",
      date: "2024-12-10",
      tags: ["wedding", "updo", "romantic", "elegant"],
      likes: 203,
      featured: true,
    },
    {
      id: "3",
      title: "Modern Layered Bob",
      category: "cutting",
      image: "/images/portfolio/bob1.jpg",
      description: "Chic asymmetrical bob with subtle layers and a sleek finish. Perfect for the busy professional.",
      client: "Maria R.",
      date: "2024-12-08",
      tags: ["bob", "modern", "layers", "professional"],
      likes: 98,
    },
    {
      id: "4",
      title: "Keratin Treatment Results",
      category: "treatments",
      image: "/images/portfolio/keratin1.jpg",
      beforeImage: "/images/portfolio/keratin1-before.jpg",
      description: "Frizzy, unmanageable hair transformed to smooth, shiny perfection with our premium keratin treatment.",
      client: "Amanda K.",
      date: "2024-12-05",
      tags: ["keratin", "smoothing", "treatment", "frizz"],
      likes: 142,
    },
    {
      id: "5",
      title: "Sunset Balayage",
      category: "coloring",
      image: "/images/portfolio/balayage1.jpg",
      description: "Warm sunset-inspired balayage with copper and gold tones that complement natural skin tone beautifully.",
      client: "Lisa P.",
      date: "2024-12-01",
      tags: ["balayage", "sunset", "copper", "warm tones"],
      likes: 167,
    },
    {
      id: "6",
      title: "Prom Night Glamour",
      category: "special",
      image: "/images/portfolio/prom1.jpg",
      description: "Hollywood glamour waves with vintage-inspired styling for an unforgettable prom night look.",
      client: "Taylor S.",
      date: "2024-11-28",
      tags: ["prom", "glamour", "vintage", "waves"],
      likes: 189,
    },
    {
      id: "7",
      title: "Pixie Cut Perfection",
      category: "cutting",
      image: "/images/portfolio/pixie1.jpg",
      description: "Bold pixie cut with textured styling that enhances facial features and adds edgy sophistication.",
      client: "Rachel N.",
      date: "2024-11-25",
      tags: ["pixie", "short", "textured", "bold"],
      likes: 134,
    },
    {
      id: "8",
      title: "Hair Extension Magic",
      category: "special",
      image: "/images/portfolio/extensions1.jpg",
      beforeImage: "/images/portfolio/extensions1-before.jpg",
      description: "Seamless tape-in extensions for instant length and volume, perfectly blended for natural results.",
      client: "Nicole B.",
      date: "2024-11-20",
      tags: ["extensions", "length", "volume", "tape-in"],
      likes: 176,
    },
  ];

  const categories = [
    { id: "all", name: "All Work", count: portfolioItems.length },
    { id: "coloring", name: "Color Services", count: portfolioItems.filter(item => item.category === "coloring").length },
    { id: "cutting", name: "Cuts & Styling", count: portfolioItems.filter(item => item.category === "cutting").length },
    { id: "treatments", name: "Treatments", count: portfolioItems.filter(item => item.category === "treatments").length },
    { id: "special", name: "Special Events", count: portfolioItems.filter(item => item.category === "special").length },
  ];

  // Filter items based on category and search
  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const gridColumns = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}

          {/* Category Filters */}
          {showFilters && (
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-sm ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-primary/10 text-accent hover:bg-primary/20"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex justify-center">
            <div className="flex bg-dark/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="text-sm">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === "masonry"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm">Masonry</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${gridColumns[columns]}`}
      >
        <AnimatePresence>
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                  Featured
                </div>
              )}

              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="w-8 h-8 text-primary/50" />
                    </div>
                    <p className="text-primary/50 text-sm">{item.title}</p>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button className="w-10 h-10 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors">
                          <Heart className="w-5 h-5 text-accent" />
                        </button>
                        <button className="w-10 h-10 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors">
                          <Share2 className="w-5 h-5 text-accent" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-1 text-accent text-sm">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-semibold text-accent group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <span className="text-primary font-medium capitalize">
                    {item.category}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {displayedItems.length === 0 && (
        <div className="text-center py-20">
          <Filter className="w-16 h-16 text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent mb-2">
            No portfolio items found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filters.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {limit && filteredItems.length > limit && (
        <div className="text-center mt-12">
          <button className="btn-outline">
            View All Portfolio Items
          </button>
        </div>
      )}

      {/* Modal for detailed view - placeholder for future implementation */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-accent">{selectedItem.title}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-muted-foreground hover:text-accent"
                >
                  ✕
                </button>
              </div>
              <p className="text-muted-foreground">{selectedItem.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}