import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { products, categories, featuredProducts, newArrivals } from '@/data/products';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">New Collection 2024</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
                Discover
                <span className="gradient-text"> Premium</span>
                <br />
                Products
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                Shop the latest trends with exclusive deals and lightning-fast delivery. 
                Your style, your way, delivered to your doorstep.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-gradient h-14 px-8 text-base" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base" asChild>
                  <Link to="/products?filter=sale">
                    View Deals
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { value: '50K+', label: 'Products' },
                  { value: '100K+', label: 'Customers' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Floating Product Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-0 z-10"
                >
                  <div className="glass rounded-2xl p-4 shadow-elevated">
                    <img 
                      src={products[0].image} 
                      alt={products[0].name}
                      className="w-40 h-40 object-cover rounded-xl"
                    />
                    <p className="mt-2 font-semibold text-sm truncate w-40">{products[0].name}</p>
                    <p className="text-primary font-bold">${products[0].price}</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-32 right-0 z-10"
                >
                  <div className="glass rounded-2xl p-4 shadow-elevated">
                    <img 
                      src={products[1].image} 
                      alt={products[1].name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <p className="mt-2 font-semibold text-sm truncate w-32">{products[1].name}</p>
                    <p className="text-primary font-bold">${products[1].price}</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-20 z-10"
                >
                  <div className="glass rounded-2xl p-4 shadow-elevated">
                    <img 
                      src={products[2].image} 
                      alt={products[2].name}
                      className="w-36 h-36 object-cover rounded-xl"
                    />
                    <p className="mt-2 font-semibold text-sm truncate w-36">{products[2].name}</p>
                    <p className="text-primary font-bold">${products[2].price}</p>
                  </div>
                </motion.div>

                {/* Background Circle */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`category-card aspect-square relative overflow-hidden ${
                      activeCategory === category.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <span className="font-semibold text-sm text-center">{category.name}</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="flex items-center gap-2 text-accent mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Featured Products
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl hero-gradient p-8 md:p-16"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-2xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Flash Sale
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                Up to 50% Off on Electronics
              </h2>
              <p className="text-white/80 mb-8 max-w-lg">
                Don't miss out on our biggest sale of the year. Premium gadgets at unbeatable prices.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8" asChild>
                <Link to="/products?category=electronics&sale=true">
                  Shop the Sale
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-10 top-10 w-40 h-40 bg-accent/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Just In</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                New Arrivals
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products?filter=new">
                View All New
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
