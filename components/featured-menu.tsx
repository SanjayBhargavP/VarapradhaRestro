'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Leaf } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Sample featured menu items
const featuredItems = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich and creamy tomato-based sauce with butter and spices.',
    price: 320,
    image: '/b343b0a720d5e4bad392ae5f68f87b1b.jpg',
    isVeg: false,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in a spiced tomato gravy with bell peppers and onions.',
    price: 280,
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
    isPopular: true,
  },
  {
    id: '3',
    name: 'Hyderabadi Biryani',
    description: 'Fragrant basmati rice cooked with aromatic spices and tender meat, a local specialty.',
    price: 350,
    image: '/2800780ee221b92e6aeac3860bcc729c.jpg',
    isVeg: false,
    isPopular: true,
  },
  {
    id: '4',
    name: 'Dal Makhani',
    description: 'Black lentils and kidney beans slow-cooked with butter, cream, and spices.',
    price: 220,
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
    isPopular: true,
  },
];

const FeaturedMenu = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {featuredItems.map((item) => (
        <motion.div key={item.id} variants={itemVariants} className="menu-card">
          <Card className="overflow-hidden h-full bg-card hover:bg-accent/50 transition-colors">
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              {item.isVeg && (
                <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                  <span className="font-semibold text-primary">{formatPrice(item.price)}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                {/*<Button className="w-full mt-2">*/}
                {/*  Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />*/}
                {/*</Button>*/}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedMenu;