"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, Play, Heart, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  type: 'image' | 'video' | 'carousel';
  media_url: string;
  thumbnail_url?: string;
  caption: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export function InstagramCarousel() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock Instagram posts for fallback
  const mockPosts: InstagramPost[] = [
    {
      id: '1',
      type: 'video',
      media_url: '/images/instagram/transformation1.jpg',
      caption: '✨ Another stunning transformation! From dull to dazzling ✨ #HairTransformation #NycayenMagic',
      permalink: 'https://instagram.com/p/example1',
      timestamp: new Date().toISOString(),
      like_count: 245,
      comments_count: 18,
    },
    {
      id: '2',
      type: 'image',
      media_url: '/images/instagram/style2.jpg',
      caption: '💫 Loving this gorgeous balayage! Perfect for the fall season 🍂 #Balayage #HairGoals',
      permalink: 'https://instagram.com/p/example2',
      timestamp: new Date().toISOString(),
      like_count: 189,
      comments_count: 12,
    },
    {
      id: '3',
      type: 'carousel',
      media_url: '/images/instagram/before-after.jpg',
      caption: '🔥 Before & After magic! Swipe to see the incredible transformation ➡️ #BeforeAndAfter #Confidence',
      permalink: 'https://instagram.com/p/example3',
      timestamp: new Date().toISOString(),
      like_count: 312,
      comments_count: 24,
    },
    {
      id: '4',
      type: 'video',
      media_url: '/images/instagram/technique.jpg',
      caption: '🎥 Behind the scenes: Watch the technique that creates these stunning curls! #BehindTheScenes #HairTutorial',
      permalink: 'https://instagram.com/p/example4',
      timestamp: new Date().toISOString(),
      like_count: 156,
      comments_count: 8,
    },
    {
      id: '5',
      type: 'image',
      media_url: '/images/instagram/client-love.jpg',
      caption: '❤️ Client love! Nothing makes us happier than seeing our clients glow with confidence ✨ #ClientLove #Confidence',
      permalink: 'https://instagram.com/p/example5',
      timestamp: new Date().toISOString(),
      like_count: 201,
      comments_count: 15,
    },
  ];

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      console.log('Instagram credentials not configured, using mock data');
      setPosts(mockPosts);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count&access_token=${accessToken}&limit=10`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Instagram posts');
      }

      const data = await response.json();
      const transformedPosts: InstagramPost[] = data.data.map((post: any) => ({
        id: post.id,
        type: post.media_type.toLowerCase(),
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp,
        like_count: post.like_count,
        comments_count: post.comments_count,
      }));

      setPosts(transformedPosts);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Failed to load Instagram posts');
      setPosts(mockPosts); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const formatCaption = (caption: string) => {
    return caption.length > 100 ? caption.substring(0, 100) + '...' : caption;
  };

  const formatCount = (count: number | undefined) => {
    if (!count) return '0';
    return count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <Instagram className="w-16 h-16 text-primary/50 mx-auto mb-4" />
        <p className="text-muted-foreground">No Instagram posts available</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl">
              {/* Image/Video Section */}
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  {posts[currentIndex].type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-6 h-6 text-accent ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Instagram className="w-16 h-16 text-primary/50" />
                  </div>
                </div>

                {/* Type Indicator */}
                <div className="absolute top-4 right-4">
                  {posts[currentIndex].type === 'video' && (
                    <div className="bg-dark/80 px-2 py-1 rounded-full text-xs text-accent flex items-center space-x-1">
                      <Play className="w-3 h-3" fill="currentColor" />
                      <span>Video</span>
                    </div>
                  )}
                  {posts[currentIndex].type === 'carousel' && (
                    <div className="bg-dark/80 px-2 py-1 rounded-full text-xs text-accent">
                      Carousel
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent">@nycayenmoore</h3>
                    <p className="text-sm text-muted-foreground">Sponsored</p>
                  </div>
                </div>

                <div>
                  <p className="text-accent leading-relaxed">
                    {formatCaption(posts[currentIndex].caption)}
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-muted-foreground">
                      {formatCount(posts[currentIndex].like_count)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatCount(posts[currentIndex].comments_count)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={posts[currentIndex].permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>View on Instagram</span>
                  </a>
                  <a
                    href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/nycayenmoore"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark/80 hover:bg-dark/90 rounded-full flex items-center justify-center text-accent transition-all duration-200 hover:scale-110"
          aria-label="Previous post"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark/80 hover:bg-dark/90 rounded-full flex items-center justify-center text-accent transition-all duration-200 hover:scale-110"
          aria-label="Next post"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center space-x-2 mt-6">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to post ${index + 1}`}
          />
        ))}
      </div>

      {/* Post Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {posts.length}
        </span>
      </div>
    </div>
  );
}