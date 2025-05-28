'use client';

import {useState, useEffect, useRef} from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, Square, Triangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/lib/utils';

// Define the shape of a menu item
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'soups', name: 'Soups' },
  { id: 'starters', name: 'Starters' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'tandoori', name: 'Tandoori' },
  { id: 'noodleAndFriedRice', name: 'Noodles & Fried Rice' },
  { id: 'seafood', name: 'Sea Food' },
  { id: 'breads', name: 'Breads' },
  { id: 'rice', name: 'Rice & Biryani' },
  { id: 'combos', name: 'Combos' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'addons', name: 'Add Ons' }
];

// Replace the array below with your dynamic data
const menuItems = [
  // Soups
  { id: '1',  name: 'Tomato Kothimira Rasam',           description: '', price: 110, category: 'soups',      image: '', isVeg: true  },
  { id: '2',  name: 'Corn Soup',                         description: '', price: 110, category: 'soups',      image: '', isVeg: true  },
  { id: '3',  name: 'Miriyala Rasam',                    description: '', price: 110, category: 'soups',      image: '', isVeg: true  },
  { id: '4',  name: 'Veg Manchow Rasam',                 description: '', price: 110, category: 'soups',      image: '', isVeg: true  },
  { id: '5',  name: 'Veg Hot & Sour Rasam',              description: '', price: 110, category: 'soups',      image: '', isVeg: true  },
  { id: '6',  name: 'Velulli Kodi Charu',                description: '', price: 130, category: 'soups',      image: '', isVeg: false },
  { id: '7',  name: 'Chicken Manchow Soup',              description: '', price: 130, category: 'soups',      image: '', isVeg: false },
  { id: '8',  name: 'Chicken Hot & Sour Soup',           description: '', price: 130, category: 'soups',      image: '', isVeg: false },


  // Starters (veg)
  { id: '9',  name: 'Crispy Veg',            description: '', price: 249, category: 'starters',      image: '', isVeg: true },
  { id: '10', name: 'Pachimirchi Gobi',                  description: '', price: 199, category: 'starters',  image: '', isVeg: true  },
  { id: '11', name: 'Veg Manchurian',                    description: '', price: 229, category: 'starters',  image: '', isVeg: true  },
  { id: '12', name: 'Babycorn – Salt & Pepper/ 65/ Chilli/ Majestic/ Schezwan', description: '', price: 249, category: 'starters', image: '', isVeg: true },
  { id: '13', name: 'Mushroom – Karvepaku/ Salt & Pepper/ 65/ Chilli/ Majestic/ Schezwan', description: '', price: 249, category: 'starters', image: '', isVeg: true },
  { id: '14', name: 'Paneer – 65/ Chilli/ Majestic/ Schezwan', description: '', price: 259, category: 'starters', image: '', isVeg: true },
  { id: '15',  name: 'Mokka Jonna Vepudu',            description: '', price: 249, category: 'starters',      image: '', isVeg: true },

  // Starters (non veg)
  { id: '15', name: 'Ulavacharu Kodi Vepudu',               description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '15', name: 'Ghee Roast Chicken',               description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '16', name: 'Andra Kodi Vepudu',                 description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '17', name: 'Pachimirchi Kodi Vepudu',           description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '18', name: 'Chilli Chicken',                    description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '19', name: 'Chicken 65',                        description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '20', name: 'Ginger Chicken',                    description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '21', name: 'Chicken Drumsticks',                description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '22', name: 'Chicken Majestic',                  description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '23', name: 'Schezwan Chicken',                  description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '24', name: 'Pepper Chicken',                    description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '25', name: 'Chicken 555',                       description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '26', name: 'Chicken Manchurian',                description: '', price: 299, category: 'starters',  image: '', isVeg: false },
  { id: '27', name: 'Lemon Chicken',                     description: '', price: 309, category: 'starters',  image: '', isVeg: false },
  { id: '28', name: 'Gongura Kodi Vepudu',               description: '', price: 309, category: 'starters',  image: '', isVeg: false },
  { id: '29', name: 'Chicken Lollipop',                  description: '', price: 309, category: 'starters',  image: '', isVeg: false },
  { id: '30', name: 'Pancow Chicken',                    description: '', price: 309, category: 'starters',  image: '', isVeg: false },
  { id: '31', name: 'Kaju Chicken',                      description: '', price: 319, category: 'starters',  image: '', isVeg: false },
  { id: '32', name: 'Ghee Roast Mutton',                 description: '', price: 359, category: 'starters',  image: '', isVeg: false },
  { id: '33', name: 'Telangana Mamsam Vepudu (Mutton)',  description: '', price: 359, category: 'starters',  image: '', isVeg: false },
  { id: '34', name: 'Gongura Mamsam Vepudu (Mutton)',    description: '', price: 359, category: 'starters',  image: '', isVeg: false },
  { id: '35', name: 'Mutton Pepper Fry',                 description: '', price: 359, category: 'starters',  image: '', isVeg: false },
  // { id: '36', name: 'Kheema Balls',                      description: '', price: 359, category: 'starters',  image: '', isVeg: false },

  // Main Course (veg)
  { id: '37', name: 'Dal Tadka',                         description: '', price: 179, category: 'main-course', image: '', isVeg: true  },
  { id: '38', name: 'Dal Fry',                           description: '', price: 179, category: 'main-course', image: '', isVeg: true  },
  { id: '39', name: 'Palak Dal',                         description: '', price: 179, category: 'main-course', image: '', isVeg: true  },
  { id: '40', name: 'Tomato Pappu',                      description: '', price: 179, category: 'main-course', image: '', isVeg: true  },
  { id: '41', name: 'Paneer Chatpat',                    description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '42', name: 'Paneer Butter Masala',              description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '43', name: 'Kadai Paneer',                      description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '44', name: 'Kaju Paneer',                       description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '45', name: 'Palak Paneer',                      description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '46', name: 'Masala Kaju Paneer',                description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '47', name: 'Mix Veg Kurma',                     description: '', price: 249, category: 'main-course', image: '', isVeg: true  },
  { id: '48', name: 'Methi Cheman',                      description: '', price: 249, category: 'main-course', image: '', isVeg: true  },
  { id: '49', name: 'Kaju Masala',                       description: '', price: 259, category: 'main-course', image: '', isVeg: true  },
  { id: '50', name: 'Mushroom Masala',                   description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '51', name: 'Babycorn Masala',                   description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '45', name: 'Veg Kofta',                      description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '46', name: 'Malai Kofta',                description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '47', name: 'Shahi Paneer',                     description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '48', name: 'Veg Kolapuri',                      description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '49', name: 'Diwani Handi',                       description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '50', name: 'Matar Paneer',                   description: '', price: 269, category: 'main-course', image: '', isVeg: true  },
  { id: '51', name: 'Afghani Mushroom',                   description: '', price: 269, category: 'main-course', image: '', isVeg: true  },

  // Main Course (non veg)
  { id: '52', name: 'Egg Bhurji',                        description: '', price: 199, category: 'main-course', image: '', isVeg: false },
  { id: '53', name: 'Egg Masala',                        description: '', price: 199, category: 'main-course', image: '', isVeg: false },
  { id: '54', name: 'Telangana Kodi Kura',               description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '55', name: 'Kadai Chicken',                     description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '56', name: 'Chicken Chatpat',                   description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '57', name: 'Chicken Kurma',                     description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '58', name: 'Butter Chicken Masala',             description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '59', name: 'Chicken Tikka Masala',              description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '60', name: 'Gongura Kodi Kura',                 description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '61', name: 'Chicken Afghani',                   description: '', price: 309, category: 'main-course', image: '', isVeg: false },
  { id: '63', name: 'Mutton Roghan Josh',                description: '', price: 369, category: 'main-course', image: '', isVeg: false },
  { id: '64', name: 'Telangana Mamsam Kura (Mutton)',    description: '', price: 369, category: 'main-course', image: '', isVeg: false },
  { id: '65', name: 'Gongura Mamsam Kura (Mutton)',      description: '', price: 369, category: 'main-course', image: '', isVeg: false },
  { id: '66', name: 'Nellore Chappala Pulusu',           description: '', price: 389, category: 'main-course', image: '', isVeg: false },
  { id: '67', name: 'Butter Fish Masala',                description: '', price: 389, category: 'main-course', image: '', isVeg: false },
  { id: '68', name: 'Royyala Pulusu',                    description: '', price: 389, category: 'main-course', image: '', isVeg: false },
  { id: '69', name: 'Hyderabad Prawns Masala',           description: '', price: 389, category: 'main-course', image: '', isVeg: false },
  { id: '62', name: 'Kolapuri Chicken Curry',                    description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '62', name: 'Palak Chicken Curry',                    description: '', price: 299, category: 'main-course', image: '', isVeg: false },
  { id: '62', name: 'Achari Chicken',                    description: '', price: 299, category: 'main-course', image: '', isVeg: false },

  // Tandoori (Veg)
  // { id: '9',  name: 'Veg Seekh Kebab',            description: '', price: 229, category: 'tandoori', image: '', isVeg: true  },
  // { id: '10', name: 'Veg Hara Bara Kebab',        description: '', price: 229, category: 'tandoori', image: '', isVeg: true  },
  { id: '11', name: 'Paneer Tikka',               description: '', price: 249, category: 'tandoori', image: '', isVeg: true  },
  { id: '12', name: 'Malai Panner Tikka',         description: '', price: 249, category: 'tandoori', image: '', isVeg: true  },

  // Tandoori (Non Veg)
  { id: '13', name: 'Chicken Tikka',              description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '14', name: 'Banjara Murgh Tikka',        description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '15', name: 'Guntur Kodi Kebab',          description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '16', name: 'Gongura Kodi Kebab',         description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '17', name: 'Pachimirchi Kodi Kebab',     description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '18', name: 'Murgh Malai Kebab',          description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '19', name: 'Achari Chicken Tikka',               description: '', price: 319, category: 'tandoori', image: '', isVeg: false },
  { id: '20', name: 'Garlic Fish Tikka',          description: '', price: 359, category: 'tandoori', image: '', isVeg: false },
  { id: '21', name: 'Haryali Fish',               description: '', price: 359, category: 'tandoori', image: '', isVeg: false },
  { id: '22', name: 'Tandoori Prawns',            description: '', price: 369, category: 'tandoori', image: '', isVeg: false },
  { id: '23', name: 'Mutton Seekh Kebab',         description: '', price: 389, category: 'tandoori', image: '', isVeg: false },
  { id: '24', name: 'Mutton Kali Mirchi',         description: '', price: 389, category: 'tandoori', image: '', isVeg: false },
  { id: '25', name: 'Tangdi (Half)',              description: '', price: 219, category: 'tandoori', image: '', isVeg: false },
  { id: '26', name: 'Tangdi (Full)',              description: '', price: 399, category: 'tandoori', image: '', isVeg: false },
  { id: '27', name: 'Tandoori (Half)',            description: '', price: 259, category: 'tandoori', image: '', isVeg: false },
  { id: '28', name: 'Tandoori (Full)',            description: '', price: 479, category: 'tandoori', image: '', isVeg: false },

  // Sea Food
  { id: '29', name: 'Chilli Fish',                description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '30', name: 'Apollo Fish',                description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '31', name: 'Pancow Fish',                description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '32', name: 'Losse Prawns',               description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '33', name: 'Ginger Prawns',              description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '34', name: 'Prawns 65',                  description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '35', name: 'Pancow Prawns',              description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '36', name: 'Golden Prawns',              description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '34', name: 'Royyala Iguru',                  description: '', price: 369, category: 'seafood', image: '', isVeg: false },
  { id: '35', name: 'Roasted Fish',              description: '', price: 369, category: 'seafood', image: '', isVeg: false },

  // Breads
  { id: '70', name: 'Pulka',                             description: '', price: 25,  category: 'breads',      image: '', isVeg: true  },
  { id: '71', name: 'Tandoori Roti',                     description: '', price: 29,  category: 'breads',      image: '', isVeg: true  },
  { id: '72', name: 'Plain Naan',                        description: '', price: 39,  category: 'breads',      image: '', isVeg: true  },
  { id: '72', name: 'Kothimir Naan',                        description: '', price: 39,  category: 'breads',      image: '', isVeg: true  },
  { id: '72', name: 'Poodina Naan',                        description: '', price: 39,  category: 'breads',      image: '', isVeg: true  },
  { id: '73', name: 'Butter Naan',                       description: '', price: 39,  category: 'breads',      image: '', isVeg: true  },
  { id: '74', name: 'Garlic Naan',                       description: '', price: 39,  category: 'breads',      image: '', isVeg: true  },
  { id: '75', name: 'Masala Kulcha',                     description: '', price: 49,  category: 'breads',      image: '', isVeg: true  },
  { id: '76', name: 'Butter Roti',                       description: '', price: 35,  category: 'breads',      image: '', isVeg: true  },

  // Noodles & Fried Rice
  { id: '44', name: 'Jeera Rice',                        description: '', price: 229, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '45', name: 'Veg Soft Noodles',                  description: '', price: 209, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '46', name: 'Veg Fried Rice',                    description: '', price: 229, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '47', name: 'Veg Schezwan Noodles',              description: '', price: 219, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '48', name: 'Veg Schezwan Fried Rice',           description: '', price: 239, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '49', name: 'Egg Noodles',                       description: '', price: 239, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '50', name: 'Egg Fried Rice',                    description: '', price: 249, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '51', name: 'Veg Tikka Noodles',                 description: '', price: 219, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '52', name: 'Chicken Soft Noodles',              description: '', price: 259, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '53', name: 'Chicken Hakka Noodles',             description: '', price: 269, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '54', name: 'Chicken Fried Rice',                description: '', price: 279, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '55', name: 'Paneer Fried Rice',                 description: '', price: 259, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '56', name: 'Veg Manchurian Fried Rice',         description: '', price: 249, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '57', name: 'Veg Manchuria Noodles',             description: '', price: 239, category: 'noodleAndFriedRice', image: '', isVeg: true  },
  { id: '58', name: 'Chicken Schezwan Noodles',          description: '', price: 269, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '59', name: 'Chicken Schezwan Fried Rice',       description: '', price: 279, category: 'noodleAndFriedRice', image: '', isVeg: false },
  { id: '60', name: 'Mix Non Veg Fried Rice',            description: '', price: 339, category: 'noodleAndFriedRice', image: '', isVeg: false },

// South Indian Rices (grouped under your 'rice' category)
  { id: '61', name: 'Curd Rice',                        description: '', price: 159, category: 'rice', image: '', isVeg: true  },
  { id: '62', name: 'Sambar Rice',                      description: '', price: 199, category: 'rice', image: '', isVeg: true  },
  { id: '63', name: 'Chicken Sambar Rice',              description: '', price: 249, category: 'rice', image: '', isVeg: false },
  { id: '64', name: 'Mutton Sambar Rice',               description: '', price: 319, category: 'rice', image: '', isVeg: false },
  { id: '65', name: 'Kheema Sambar Rice',               description: '', price: 329, category: 'rice', image: '', isVeg: false },

// Special Combos for 4 Persons
  { id: '66', name: 'Chicken Biryani Family + Chicken Starter + Chicken Curry + 4 Tandoori Roti + 4 Soft Drinks + 4 Any Dessert', description: 'serves 4 people', price: 1799, category: 'combos', image: '', isVeg: false },
  { id: '67', name: 'Mutton Biryani Family + Mutton Starter + Mutton Curry + 4 Tandoori Roti + 4 Soft Drinks + 4 Any Dessert',   description: '', price: 1599, category: 'combos', image: '', isVeg: false },
  { id: '68', name: 'Fish Biryani Family + Fish Starter + Fish Curry + 4 Tandoori Roti + 4 Soft Drinks + 4 Any Dessert',       description: '', price: 1799, category: 'combos', image: '', isVeg: false },

  // Rice & Biryani → Pulaos (veg)
  { id: '77', name: 'Mix Veg Pulao',                     description: '', price: 269, category: 'rice',       image: '', isVeg: true  },
  { id: '78', name: 'Kaju Paneer Pulao',                 description: '', price: 309, category: 'rice',       image: '', isVeg: true  },
  { id: '79', name: 'Pachimirchi Paneer Pulao',          description: '', price: 309, category: 'rice',       image: '', isVeg: true  },
  { id: '80', name: 'Mushroom Pulao',                    description: '', price: 299, category: 'rice',       image: '', isVeg: true  },
  { id: '80', name: 'Curd Rice',                    description: '', price: 299, category: 'rice',       image: '', isVeg: true  },
  { id: '80', name: 'Ulavacharu Pulao',                    description: '', price: 299, category: 'rice',       image: '', isVeg: true  },

  // Rice & Biryani → Pulaos (non veg)
  { id: '81', name: 'Military Kodi Pulao',               description: '', price: 349, category: 'rice',       image: '', isVeg: false },
  { id: '82', name: 'Mutton Pulao',                      description: '', price: 419, category: 'rice',       image: '', isVeg: false },
  { id: '83', name: 'Fish Pulao',                        description: '', price: 389, category: 'rice',       image: '', isVeg: false },
  { id: '84', name: 'Prawns Pulao',                      description: '', price: 399, category: 'rice',       image: '', isVeg: false },
  { id: '85', name: 'Achari Kodi Pulao',                  description: '', price: 449, category: 'rice',       image: '', isVeg: false },

  // Rice & Biryani → Biryani
  { id: '86', name: 'Mix Veg Biryani',                   description: '', price: 239, category: 'rice',       image: '', isVeg: true  },
  { id: '87', name: 'Paneer Biryani',                    description: '', price: 259, category: 'rice',       image: '', isVeg: true  },
  { id: '88', name: 'Mushroom Biryani',                  description: '', price: 259, category: 'rice',       image: '', isVeg: true  },
  { id: '89', name: 'Kaju Paneer Biryani',               description: '', price: 299, category: 'rice',       image: '', isVeg: true  },
  { id: '90', name: 'Kaju Biryani',                      description: '', price: 309, category: 'rice',       image: '', isVeg: true  },
  { id: '91', name: 'Babycorn Biryani',                  description: '', price: 259, category: 'rice',       image: '', isVeg: true  },
  { id: '92', name: 'Egg Biryani',                       description: '', price: 249, category: 'rice',       image: '', isVeg: false },
  { id: '93', name: 'Chicken Biryani (Single)',          description: '', price: 169, category: 'rice',       image: '', isVeg: false },
  { id: '94', name: 'Chicken Biryani (Full)',            description: '', price: 299, category: 'rice',       image: '', isVeg: false },
  { id: '95', name: 'Chicken Biryani (Family)',          description: '', price: 599, category: 'rice',       image: '', isVeg: false },
  { id: '96', name: 'Chicken Fry Piece Biryani',         description: '', price: 319, category: 'rice',       image: '', isVeg: false },
  { id: '97', name: 'Chicken Special Biryani',           description: '', price: 319, category: 'rice',       image: '', isVeg: false },
  { id: '98', name: 'Chicken Potlam Biryani',            description: '', price: 359, category: 'rice',       image: '', isVeg: false },
  { id: '99', name: 'Lollipop Biryani',                  description: '', price: 359, category: 'rice',       image: '', isVeg: false },
  { id: '100',name: 'Gongura Chicken Biryani',           description: '', price: 339, category: 'rice',       image: '', isVeg: false },
  { id: '101',name: 'Chicken Tikka Biryani',             description: '', price: 339, category: 'rice',       image: '', isVeg: false },
  { id: '102',name: 'Tangdi Biryani',                    description: '', price: 349, category: 'rice',       image: '', isVeg: false },
  { id: '103',name: 'Mutton Biryani (Single)',           description: '', price: 199, category: 'rice',       image: '', isVeg: false },
  { id: '104',name: 'Mutton Biryani (Full)',             description: '', price: 369, category: 'rice',       image: '', isVeg: false },
  { id: '105',name: 'Mutton Biryani (Family)',           description: '', price: 749, category: 'rice',       image: '', isVeg: false },
  { id: '106',name: 'Gongura Mutton Biryani',            description: '', price: 379, category: 'rice',       image: '', isVeg: false },
  { id: '107',name: 'Mutton Kheema Biryani',             description: '', price: 379, category: 'rice',       image: '', isVeg: false },
  { id: '108',name: 'Mutton Potlam Biryani',             description: '', price: 409, category: 'rice',       image: '', isVeg: false },
  { id: '109',name: 'Fish Biryani',                      description: '', price: 369, category: 'rice',       image: '', isVeg: false },
  { id: '110',name: 'Royyala Biryani',                   description: '', price: 369, category: 'rice',       image: '', isVeg: false },

  // Rice & Biryani → South Indian Rices
  { id: '111',name: 'Curd Rice',                         description: '', price: 159, category: 'rice',       image: '', isVeg: true  },
  { id: '112',name: 'Sambar Rice',                       description: '', price: 199, category: 'rice',       image: '', isVeg: true  },
  { id: '113',name: 'Chicken Sambar Rice',               description: '', price: 249, category: 'rice',       image: '', isVeg: false },
  { id: '114',name: 'Mutton Sambar Rice',                description: '', price: 319, category: 'rice',       image: '', isVeg: false },
  { id: '115',name: 'Kheema Sambar Rice',                description: '', price: 329, category: 'rice',       image: '', isVeg: false },

  // Desserts
  // { id: '116',name: 'Sweet Bambino',                     description: '', price: 69,  category: 'desserts',   image: '', isVeg: true  },
  { id: '117',name: 'Gulab Jamun (3pcs)',                description: '', price: 49,  category: 'desserts',   image: '', isVeg: true  },
  { id: '118',name: 'Kadhu ki Kheer',                    description: '', price: 49,  category: 'desserts',   image: '', isVeg: true  },
  { id: '119',name: 'Double ka Meeta',                   description: '', price: 49,  category: 'desserts',   image: '', isVeg: true  },
  { id: '120',name: 'Apricot Delight',                   description: '', price: 139, category: 'desserts',   image: '', isVeg: true  },

  // Beverages
  { id: '121',name: 'Water Bottle',                      description: '', price: 20,  category: 'beverages',  image: '', isVeg: true  },
  { id: '122',name: 'Any Soft Drink',                    description: '', price: 20,  category: 'beverages',  image: '', isVeg: true  },
  // { id: '123',name: 'Maaza',                             description: '', price: 25,  category: 'beverages',  image: '', isVeg: true  },
  // { id: '124',name: 'Majjiga',                           description: '', price: 59,  category: 'beverages',  image: '', isVeg: true  },
  // { id: '125',name: 'Pulpy Orange',                      description: '', price: 25,  category: 'beverages',  image: '', isVeg: true  },

  // Add Ons
  { id: '126',name: 'Chicken Biryani Extra Piece',       description: '', price: 99,  category: 'addons',     image: '', isVeg: false },
  { id: '127',name: 'Chicken Biryani Extra Rice',        description: '', price: 129, category: 'addons',     image: '', isVeg: false }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'veg' | 'nonVeg'>('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredItems(
        menuItems.filter((item) => {
          const matchCategory = activeCategory === 'all' || item.category === activeCategory;
          const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchFilter =
              filterMode === 'all' ||
              (filterMode === 'veg' && item.isVeg) ||
              (filterMode === 'nonVeg' && !item.isVeg);
          return matchCategory && matchSearch && matchFilter;
        })
    );
  }, [activeCategory, searchQuery, filterMode]);

  useEffect(() => {
    tabsRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } } };

  return (
      <div className="min-h-screen pt-20 pb-16">
         {/*Hero Section */}
        <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: '/Menu.jpg' }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center text-white">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold"
            >
              Our <span className="text-primary">Menu</span>
            </motion.h1>
          </div>
        </section>

        {/* Combined Sticky Search + Filters + Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <div className="sticky top-0 z-50 bg-white dark:bg-gray-900">
            {/* Search & Veg/Non-Veg Filters */}
            <div className="py-2">
              <div className="max-w-6xl mx-auto px-4 flex-row flex items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:flex-1 max-w-xs">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="w-full pl-8 pr-3 py-1.5 rounded-full border border-input bg-background"
                  />
                </div>
                {/* Veg & Non-Veg Toggles */}
                <div className="flex items-center space-x-4">
                  {/* Veg Toggle */}
                  <div className="flex items-center space-x-1">
                    <div className="h-4 w-4 flex-shrink-0 rounded border-2 border-emerald-600 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-600" />
                    </div>
                    <span className="text-emerald-600 font-medium text-sm"><b>Veg</b></span>
                    <Switch
                        checked={filterMode === 'veg'}
                        onCheckedChange={(checked) => setFilterMode(checked ? 'veg' : 'all')}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors toggle-veg ${
                            filterMode === 'veg' ? 'bg-emerald-600' : 'bg-gray-200'
                        }`}
                    >
                    <span
                        className={`inline-block h-3 w-3 transform rounded-full transition-transform ${
                            filterMode === 'veg' ? 'translate-x-4' : 'translate-x-0'
                        } bg-white`}
                    />
                    </Switch>
                  </div>
                  {/* Non-Veg Toggle */}
                  <div className="flex items-center space-x-1">
                    <div className="h-4 w-4 flex-shrink-0 rounded border-2 border-rose-600 flex items-center justify-center">
                      <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 fill-current text-rose-600">
                        <path d="M4 1l3 6H1z" />
                      </svg>
                    </div>
                    <span className="text-rose-600 font-medium text-sm"><b>Non-Veg</b></span>
                    <Switch
                        checked={filterMode === 'nonVeg'}
                        onCheckedChange={(checked) => setFilterMode(checked ? 'nonVeg' : 'all')}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors toggle-nonveg ${
                            filterMode === 'nonVeg' ? 'bg-rose-600' : 'bg-gray-200'
                        }`}
                    >
                    <span
                        className={`inline-block h-3 w-3 transform rounded-full transition-transform ${
                            filterMode === 'nonVeg' ? 'translate-x-4' : 'translate-x-0'
                        } bg-white`}
                    />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-4 pb-2">
              <div className="mx-auto">
                <TabsList
                    ref={tabsRef}
                    className="flex flex-nowrap overflow-x-auto overscroll-y-hidden hide-scrollbar gap-4 mb-0"
                >
                  {categories.map((cat) => (
                      <TabsTrigger
                          key={cat.id}
                          value={cat.id}
                          className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium ${
                              activeCategory === cat.id
                                  ? 'bg-primary text-white'
                                  : 'bg-secondary/30 text-muted-foreground'
                          }`}
                      >
                        {cat.name}
                      </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>

          {/* Tab Panels */}
          <div className="py-8">
            <div className="max-w-6xl mx-auto px-4">
              {categories.map((cat) => (
                  <TabsContent key={cat.id} value={cat.id}>
                    {(activeCategory === 'all' ? categories.filter((c) => c.id !== 'all') : [cat]).map((group) => {
                      const items = filteredItems.filter((i) => i.category === group.id);
                      if (!items.length) return null;
                      return (
                          <div key={group.id} className="mb-8">
                            {activeCategory === 'all' && <h2 className="text-2xl font-semibold mb-4">{group.name}</h2>}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                              {items.map((item) => (
                                  <motion.div key={item.id} variants={itemVariants} className="menu-card">
                                    <Card className="w-full h-full bg-card hover:bg-accent/50 transition-colors">
                                      <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                          <div className="flex items-start gap-2 min-w-0">
                                            {item.isVeg ? (
                                                <div className="h-6 w-6 rounded-md border-2 border-emerald-600 flex items-center justify-center">
                                                  <div className="h-3 w-3 rounded-full bg-emerald-600" />
                                                </div>
                                            ) : (
                                                <div className="h-6 w-6 rounded-md border-2 border-rose-600 flex items-center justify-center">
                                                  <svg viewBox="0 0 8 8" className="h-3 w-3 fill-current text-rose-600">
                                                    <path d="M4 1l3 6H1z" />
                                                  </svg>
                                                </div>
                                            )}
                                            <h3 className="font-bold text-base break-words">{item.name}</h3>
                                          </div>
                                          <span className="text-primary font-semibold">{formatPrice(item.price)}</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                              ))}
                            </motion.div>
                          </div>
                      );
                    })}
                  </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
  );
}



