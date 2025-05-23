'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Leaf, Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Types matching Prisma API
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isVeg: boolean;
  isPopular: boolean;
}
interface Category {
  id: number;
  name: string;
  menuItems: MenuItem[];
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  // Fetch categories & items
  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Category[] = await res.json();
        setCategories(data);
        const items = data.flatMap(cat =>
            cat.menuItems.map(item => ({ ...item, categoryId: cat.id }))
        );
        setAllItems(items);
        if (data.length) setActiveCategory(String(data[0].id));
      } catch (e) {
        console.error(e);
      }
    }
    loadMenu();
  }, []);

  // Filter logic
  useEffect(() => {
    let list = allItems.filter(i => String((i as any).categoryId) === activeCategory);
    if (searchQuery) list = list.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (vegOnly) list = list.filter(i => i.isVeg);
    setFilteredItems(list);
  }, [allItems, activeCategory, searchQuery, vegOnly]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } } };

  return (
      <div className="min-h-screen pt-20 pb-16 bg-slate-900">
        {/* Hero */}
        <section className="relative py-20 bg-[url('/menu-hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-bold">
              Our <span className="text-orange-500">Menu</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-2 text-xl max-w-2xl mx-auto">
              Explore our wide range of authentic Indian dishes prepared with love and tradition
            </motion.p>
          </div>
        </section>

        {/* Search & Veg Filter */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                  type="text"
                  placeholder="Search our menu..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-800 text-white"
              />
            </div>
            <Button variant={vegOnly ? 'default' : 'outline'} onClick={() => setVegOnly(v => !v)} className="flex items-center space-x-2">
              <Leaf className={vegOnly ? 'text-white h-5 w-5' : 'text-green-400 h-5 w-5'} />
              Veg Only
            </Button>
          </div>
        </section>

        {/* Tabs & Items */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-8 flex flex-wrap justify-center gap-2 w-full md:w-1/2 mx-auto">
                {categories.map(cat => (
                    <TabsTrigger key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </TabsTrigger>
                ))}
              </TabsList>

              {categories.map(cat => (
                  <TabsContent key={cat.id} value={String(cat.id)}>
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {filteredItems.map(item => (
                          <motion.div key={item.id} variants={itemVariants}>
                            <Card className="overflow-hidden bg-slate-800 h-full">
                              <div className="relative h-48 w-full">
                                <Image src={item.image ?? '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                                {item.isVeg && <div className="absolute top-2 left-2 bg-slate-900/70 p-1 rounded-full"><Leaf className="h-4 w-4 text-green-400" /></div>}
                              </div>
                              <CardContent className="p-4 flex-grow">
                                <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                                <p className="text-slate-300 text-sm mb-4 flex-grow">{item.description}</p>
                              </CardContent>
                              <CardFooter className="flex items-center justify-between px-4 pb-4 pt-0">
                                <span className="text-orange-400 font-bold">{formatPrice(item.price)}</span>
                                <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                                  <span>Add to Cart</span>
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                      ))}
                    </motion.div>
                    {filteredItems.length === 0 && (
                        <div className="text-center py-12 text-slate-400">No items found matching your criteria.</div>
                    )}
                  </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </div>
  );
}