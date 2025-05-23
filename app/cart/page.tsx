'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Sample cart items
const initialCartItems = [
  {
    id: '1',
    name: 'Butter Chicken',
    price: 320,
    quantity: 1,
    image: '/b343b0a720d5e4bad392ae5f68f87b1b.jpg',
  },
  {
    id: '5',
    name: 'Paneer Butter Masala',
    price: 280,
    quantity: 2,
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
  },
  {
    id: '7',
    name: 'Butter Naan',
    price: 60,
    quantity: 4,
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const deliveryFee = 50;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center space-x-4 py-4 border-b border-border last:border-0"
                      >
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-primary font-medium">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <Link href="/menu">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Including taxes and delivery charges
                      </p>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-6">
                    <Link href="/checkout">
                      Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-2">We Accept:</p>
                    <div className="flex items-center space-x-2">
                      <div className="bg-secondary p-2 rounded">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <span className="text-sm">UPI, Cards, Wallets, Net Banking, COD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link href="/menu">
                Browse Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}