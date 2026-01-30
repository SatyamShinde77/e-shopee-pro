import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { Footer } from '@/components/Footer';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen pt-36 md:pt-40">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold font-display mb-8"
        >
          Shopping Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. 
              Start shopping to find amazing products!
            </p>
            <Button size="lg" className="btn-gradient" asChild>
              <Link to="/products">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        layout
                        className="p-6"
                      >
                        <div className="flex gap-6">
                          <Link to={`/product/${item.id}`}>
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover"
                            />
                          </Link>
                          
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground capitalize mb-2">
                              {item.category}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xl font-bold text-primary">
                                ${item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="w-8 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>

                              {/* Remove Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="hidden md:block text-right">
                            <span className="text-lg font-bold">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 sticky top-40"
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="p-3 rounded-lg bg-accent/10 text-sm">
                      <span className="text-accent">
                        Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full h-14 text-base btn-gradient" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
