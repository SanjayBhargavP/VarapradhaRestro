'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Clock, MapPin, Phone, Star, Users, Calendar, ArrowRight, ChefHat, Award, ThumbsUp } from 'lucide-react';
import FeaturedMenu from '@/components/featured-menu';
import TestimonialSlider from '@/components/testimonial-slider';
import CountUpNumber from '@/components/count-up-number';

export default function Home() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center min-h-[90vh] px-4 py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow">
              Welcome to <span className="text-primary">Varapradha Restro</span>
            </h1>
            <p className="text-xl md:text-2xl text-white text-shadow max-w-2xl mx-auto">
              Experience the authentic flavors of India with our carefully crafted dishes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-lg">
                <Link href="/menu">
                  View Our Menu <Utensils className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/*<Button asChild size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">*/}
              {/*  <Link href="/reservation">*/}
              {/*    Reserve a Table <Calendar className="ml-2 h-5 w-5" />*/}
              {/*  </Link>*/}
              {/*</Button>*/}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Discover <span className="text-primary">Our Story</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Varapradha Restro brings the authentic taste of India to Hyderabad. Our restaurant combines traditional recipes with modern culinary techniques to create an unforgettable dining experience.
              </p>
              <p className="text-lg text-muted-foreground">
                Located near Sri Indu College, we've been serving the community with love and passion since our establishment. Our chefs use only the freshest ingredients to prepare dishes that capture the essence of Indian cuisine.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
                  <ChefHat className="h-8 w-8 text-primary mb-2" />
                  <CountUpNumber value={15} duration={2} />
                  <p className="text-sm text-muted-foreground">Expert Chefs</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <CountUpNumber value={8} duration={2} />
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
                  <ThumbsUp className="h-8 w-8 text-primary mb-2" />
                  <CountUpNumber value={95} duration={2} />
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CountUpNumber value={10000} duration={2} />
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/Two.jpg"
                alt="Varapradha Restro Interior"
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Featured Dishes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our chef's special selection of authentic Indian dishes prepared with love and tradition
            </p>
          </div>
          <FeaturedMenu />
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/menu">
                View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section className="reservation-section relative py-24 px-4">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background/10 backdrop-blur-md p-8 md:p-12 rounded-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Reserve Your <span className="text-primary">Table Today</span>
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Enjoy a memorable dining experience with your loved ones. Book a table in advance to avoid waiting.
            </p>
            <Button onClick={handleComingSoon} size="lg" variant="secondary" className="text-lg">
              Coming Soon <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear what our valued customers have to say about their dining experience
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Find <span className="text-primary">Us Here</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We're conveniently located near Sri Indu College of Engineering & Technology in Ibrahimpatnam, Hyderabad. Visit us for an unforgettable dining experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    55E2, 56-E/2, Chintapally Grampanchayat, Ibrahimpatnam, near Sri Indu College Of Engineering & Tech, Ibrahimpatnam, Hyderabad, India
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <p className="text-muted-foreground">+91 9876543210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Get Directions <MapPin className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.4144872893257!2d78.58016937469272!3d17.30000798281285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba659868b4727%3A0x6a3c7a71f512b23e!2sSri%20Indu%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1718035050787!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Online CTA */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Craving Our Delicious Food?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Order online and enjoy our authentic Indian cuisine from the comfort of your home
            </p>
            <Button onClick={handleComingSoon} size="lg" variant="secondary" className="text-lg">
              Coming Soon <Utensils className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Confetti Overlay */}
        {showConfetti && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Image src="/confetti.gif" alt="Confetti" width={300} height={300} className="pointer-events-none" />
            </div>
        )}
      </section>
    </div>
  );
}