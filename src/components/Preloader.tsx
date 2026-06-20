import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-text-primary flex items-center justify-center mb-6 mx-auto">
              <span className="text-bg font-heading font-bold text-lg">R</span>
            </div>
            <motion.p
              className="font-mono text-6xl md:text-8xl font-bold text-text-primary tabular-nums"
            >
              {Math.min(count, 100)}
            </motion.p>
            <div className="w-48 h-[2px] bg-border mt-6 mx-auto rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
