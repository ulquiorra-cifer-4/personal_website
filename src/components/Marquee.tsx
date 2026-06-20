import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ text, speed = 30, reverse = false, className = '' }: MarqueeProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const items = Array(8).fill(text);

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.6 }}
      transition={{ duration: 0.7, ease }}
      style={{ transformOrigin: 'center' }}
      className={`overflow-hidden py-8 md:py-12 border-y border-border ${className}`}
    >
      <motion.div
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex items-center whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-semibold text-text-primary/10 uppercase tracking-wider mx-8">
              {item}
            </span>
            <span className="w-3 h-3 rounded-full bg-accent/20 mx-4 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
