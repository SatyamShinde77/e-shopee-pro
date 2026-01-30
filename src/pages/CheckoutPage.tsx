import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  CreditCard, 
  Truck, 
  MapPin,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Shipping', icon: MapPin },
  { id: 2, name: 'Delivery', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 md:pt-40 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold font-display mb-8"
        >
          Checkout
        </motion.h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                  <span className="font-medium hidden sm:inline">{step.name}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              {currentStep === 1 && (
                <>
                  <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="123 Main St, Apt 4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <Input
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="h-12 rounded-xl"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input
                          value={shippingData.state}
                          onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                          className="h-12 rounded-xl"
                          placeholder="CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP</label>
                        <Input
                          value={shippingData.zip}
                          onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                          className="h-12 rounded-xl"
                          placeholder="94102"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h2 className="text-xl font-bold mb-6">Delivery Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'standard', name: 'Standard Delivery', time: '5-7 business days', price: shipping === 0 ? 'Free' : '$9.99' },
                      { id: 'express', name: 'Express Delivery', time: '2-3 business days', price: '$19.99' },
                      { id: 'overnight', name: 'Overnight Delivery', time: 'Next business day', price: '$29.99' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="delivery"
                            defaultChecked={method.id === 'standard'}
                            className="w-5 h-5 text-primary"
                          />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.time}</p>
                          </div>
                        </div>
                        <span className={`font-semibold ${method.price === 'Free' ? 'text-green-600' : ''}`}>
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        className="h-12 rounded-xl"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          className="h-12 rounded-xl"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          className="h-12 rounded-xl"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card</label>
                      <Input
                        className="h-12 rounded-xl"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to="/cart">Back to Cart</Link>
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    className="btn-gradient"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Continue
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    className="btn-gradient"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                    <Check className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 sticky top-40"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
