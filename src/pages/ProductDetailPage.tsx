import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Check,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => useCartStore.getState().openCart(),
      },
    });
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen pt-36 md:pt-40">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <Link 
            to={`/products?category=${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Main Image */}
            <div 
              className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/30 mb-4 cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-4 left-4 ${
                  product.badge === 'sale' ? 'badge-sale' : 'badge-new'
                } text-sm`}>
                  {product.badge === 'sale' ? `-${discount}% OFF` : 'NEW'}
                </span>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-medium hover:bg-card transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-medium hover:bg-card transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </p>
            
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-semibold rounded">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description || 'Premium quality product with exceptional features and design. Built to last and designed to impress.'}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-destructive font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full h-14 text-base gap-2 ${
                    isAddingToCart ? 'animate-cart-bounce' : ''
                  } btn-gradient`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {isAddingToCart ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                  {isAddingToCart ? 'Added!' : 'Add to Cart'}
                </Button>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                onClick={() => toast.success('Added to wishlist!')}
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-secondary/30">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: RotateCcw, label: '30-Day Returns' },
                { icon: Shield, label: '2-Year Warranty' },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-xs font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold font-display mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out p-4"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
