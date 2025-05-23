'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Leaf, Search, Filter } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Sample menu categories and items
const categories = [
  { id: 'starters', name: 'Starters' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'breads', name: 'Breads' },
  { id: 'rice', name: 'Rice & Biryani' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

const menuItems = [
  // Starters
  {
    id: '1',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.',
    price: 250,
    category: 'starters',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  {
    id: '2',
    name: 'Chicken 65',
    description: 'Spicy deep-fried chicken pieces marinated with red chillies and aromatic spices.',
    price: 280,
    category: 'starters',
    image: '/b343b0a720d5e4bad392ae5f68f87b1b.jpg',
    isVeg: false,
  },
  {
    id: '3',
    name: 'Veg Manchurian',
    description: 'Deep-fried vegetable balls tossed in a spicy, sweet, and tangy sauce.',
    price: 220,
    category: 'starters',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  
  // Main Course
  {
    id: '4',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich and creamy tomato-based sauce with butter and spices.',
    price: 320,
    category: 'main-course',
    image: '/b343b0a720d5e4bad392ae5f68f87b1b.jpg',
    isVeg: false,
  },
  {
    id: '5',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich and creamy tomato-based gravy with butter and spices.',
    price: 280,
    category: 'main-course',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  {
    id: '6',
    name: 'Dal Makhani',
    description: 'Black lentils and kidney beans slow-cooked with butter, cream, and spices.',
    price: 220,
    category: 'main-course',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  
  // Breads
  {
    id: '7',
    name: 'Butter Naan',
    description: 'Soft leavened bread made from refined flour and baked in a tandoor, brushed with butter.',
    price: 60,
    category: 'breads',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  {
    id: '8',
    name: 'Garlic Naan',
    description: 'Soft leavened bread made from refined flour, topped with garlic and baked in a tandoor.',
    price: 70,
    category: 'breads',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  
  // Rice & Biryani
  {
    id: '9',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Fragrant basmati rice cooked with aromatic spices and tender chicken, a local specialty.',
    price: 350,
    category: 'rice',
    image: '/2800780ee221b92e6aeac3860bcc729c.jpg',
    isVeg: false,
  },
  {
    id: '10',
    name: 'Veg Pulao',
    description: 'Basmati rice cooked with mixed vegetables and mild spices.',
    price: 220,
    category: 'rice',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  
  // Desserts
  {
    id: '11',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup, served warm.',
    price: 120,
    category: 'desserts',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  {
    id: '12',
    name: 'Rasmalai',
    description: 'Soft cottage cheese dumplings soaked in sweetened, thickened milk flavored with cardamom.',
    price: 150,
    category: 'desserts',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  
  // Beverages
  {
    id: '13',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with milk.',
    price: 60,
    category: 'beverages',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
  {
    id: '14',
    name: 'Mango Lassi',
    description: 'Sweet yogurt-based drink with mango pulp and a hint of cardamom.',
    price: 120,
    category: 'beverages',
    image: '/23246ab82c71b4b044e482be524e5791.jpg',
    isVeg: true,
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [vegOnly, setVegOnly] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const filtered = menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVegFilter = vegOnly ? item.isVeg : true;
      
      return matchesCategory && matchesSearch && matchesVegFilter;
    });
    
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery, vegOnly]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="menu-section relative py-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore our wide range of authentic Indian dishes prepared with love and tradition
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={vegOnly ? "default" : "outline"}
                onClick={() => setVegOnly(!vegOnly)}
                className="flex items-center"
              >
                <Leaf className={`h-5 w-5 mr-2 ${vegOnly ? "text-white" : "text-green-500"}`} />
                Veg Only
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories and Items */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="starters" onValueChange={setActiveCategory}>
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  ref={ref}
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredItems
                    .filter(item => item.category === category.id)
                    .map((item) => (
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
                              <Button className="w-full mt-2">
                                Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
                
                {filteredItems.filter(item => item.category === category.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No items found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}