'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const CountUpNumber = ({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}: CountUpNumberProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = (timestamp - startTimeRef.current) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.floor(value * Math.min(progress, 1)));
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [inView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="text-2xl font-bold text-primary">
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
};

export default CountUpNumber;