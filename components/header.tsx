'use client';

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Home, UtensilsCrossed, Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!searchRef.current) return;
    const obs = new IntersectionObserver(
        ([e]) => setCollapsed(!e.isIntersecting),
        { rootMargin: '-64px 0 0 0', threshold: 0 }
    );
    obs.observe(searchRef.current);
    return () => obs.disconnect();
  }, []);



  // Scroll handler for background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/menu', label: 'Menu', icon: <UtensilsCrossed className="h-5 w-5" /> },
    { href: '/contact', label: 'Contact', icon: <Phone className="h-5 w-5" /> },
  ];

  return (
      <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-primary">Varapradha Restro</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map(link => (
                  <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === link.href
                              ? 'text-primary'
                              : 'text-foreground/80 hover:text-primary hover:bg-accent'
                      }`}
                  >
                    {link.label}
                  </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2 pr-4 md:pr-0">
              {/* Theme toggle always visible */}
              <ModeToggle />

              {/* Mobile menu button */}
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle Menu"
                  className="md:hidden"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile sliding menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-background/95 backdrop-blur-md shadow-lg"
              >
                <div className="px-4 pt-2 pb-4 space-y-1">
                  {navLinks.map(link => (
                      <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                              pathname === link.href
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-foreground/80 hover:text-primary hover:bg-accent'
                          }`}
                      >
                        {link.icon}
                        <span className="ml-2">{link.label}</span>
                      </Link>
                  ))}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
};

export default Header;
