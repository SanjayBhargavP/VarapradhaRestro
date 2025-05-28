'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// Sample testimonials
const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'The food at Varapradha Restro is absolutely delicious! The butter chicken and naan are the best I\'ve had in Hyderabad. The staff is friendly and the ambiance is perfect for both family dinners and special occasions.',
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    rating: 5,
    comment: 'I ordered online and the food arrived hot and fresh. The packaging was excellent and the flavors were authentic. Their biryani is a must-try! Will definitely order again.',
  },
  {
    id: '3',
    name: 'Ananya Patel',
    rating: 4,
    comment: 'We had a wonderful experience at Varapradha Restro. The table reservation system was smooth, and they accommodated our special requests for a birthday celebration. The food was excellent, especially the paneer dishes.',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    rating: 5,
    comment: 'This restaurant has become our family favorite. The menu has great variety and the portion sizes are generous. The online ordering system is very convenient and the delivery is always on time.',
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden py-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            <Card className="max-w-2xl w-full bg-card shadow-lg">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <p className="text-lg mb-6 italic text-muted-foreground">
                  "{testimonials[currentIndex].comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <div className="flex mt-1">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="rounded-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 p-0 rounded-full ${
              index === currentIndex
                ? 'bg-primary'
                : 'bg-primary/30'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="rounded-full"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSlider;