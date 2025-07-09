"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, Heart, Filter, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { shopifyClient, ShopifyProduct, ShopifyCart } from "@/utils/shopify";

export default function ShopPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    loadProducts();
    initializeCart();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await shopifyClient.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeCart = async () => {
    try {
      const newCart = await shopifyClient.createCart();
      setCart(newCart);
    } catch (error) {
      console.error("Error initializing cart:", error);
    }
  };

  const addToCart = async (productId: string, variantId: string) => {
    if (!cart) return;
    
    setAddingToCart(productId);
    
    try {
      const updatedCart = await shopifyClient.addToCart(cart.id, variantId, 1);
      if (updatedCart) {
        setCart(updatedCart);
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

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
              Our Shop
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Premium hair care products and styling tools curated by our experts
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Search and Cart */}
      <section className="py-12 bg-dark sticky top-0 z-40 backdrop-blur-md bg-dark/90">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <motion.div 
              variants={itemVariants}
              className="relative flex-1 max-w-md"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cart?.lineItems.length || 0})
              {cart && cart.lineItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-accent text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.lineItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Not Configured Warning */}
      {!shopifyClient.configured && (
        <section className="py-8 bg-secondary/10 border border-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card border border-border rounded-lg p-6">
                <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                  Demo Mode
                </h3>
                <p className="text-muted-foreground">
                  This shop is in demo mode with sample products. Configure Shopify integration for live products.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-dark/80 text-primary p-2 rounded-full hover:bg-dark transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    {!product.available && (
                      <div className="absolute inset-0 bg-dark/80 flex items-center justify-center">
                        <span className="bg-secondary text-accent px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-playfair font-bold text-primary mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 5 ? "text-primary fill-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(4.8)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product.id, product.variants[0].id)}
                        disabled={!product.available || addingToCart === product.id}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          product.available
                            ? "bg-primary text-dark hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {addingToCart === product.id ? (
                          <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                No Products Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="bg-card border-l border-border w-full max-w-md h-full overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-playfair font-bold text-primary">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {cart && cart.lineItems.length > 0 ? (
                <div className="space-y-4">
                  {cart.lineItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-primary">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                        <p className="text-sm font-medium text-primary">{item.variant.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted/20 rounded transition-colors">
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="p-1 hover:bg-muted/20 rounded transition-colors">
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">Total:</span>
                      <span className="text-xl font-bold text-primary">{cart.totalPrice}</span>
                    </div>
                    
                    {shopifyClient.configured ? (
                      <a
                        href={cart.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-dark py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block"
                      >
                        Checkout
                      </a>
                    ) : (
                      <div className="w-full bg-muted text-muted-foreground py-3 px-4 rounded-lg font-medium text-center">
                        Checkout (Demo Mode)
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Features Section */}
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
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-12 text-center"
            >
              Why Shop With Us?
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Only the finest hair care products from trusted brands
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Expert Curated</h3>
                <p className="text-muted-foreground">
                  Products personally selected by our professional stylists
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-primary mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  Quick and secure delivery to your doorstep
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}