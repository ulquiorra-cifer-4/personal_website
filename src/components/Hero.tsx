import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Hero() {
  const [time, setTime] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Jakarta',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const headingWords = ['Creative', 'Agency', 'for', 'Bold', 'Companies.'];
  const descWords = 'An award-winning design studio sets brand apart from competition with stunning branding and websites.'.split(' ');

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col lg:flex-row pt-28 md:pt-32 pb-12 px-4 md:px-6 max-w-[1500px] mx-auto gap-8 lg:gap-0"
    >
      {/* Left Side */}
      <div className="flex flex-col justify-between flex-1 lg:pr-12">
        {/* Top Badges */}
        <div className="flex items-center gap-6 mb-12 md:mb-0">
          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-bg-card"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-xs text-text-secondary font-body">Open for project</span>
            <span className="text-xs text-text-muted font-body">Jan '26</span>
          </motion.div>

          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-bg-card"
          >
            <span className="text-xs text-text-primary font-mono">{time}</span>
            <span className="text-xs text-text-muted font-body">Jakarta, ID</span>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <div>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight mb-6">
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  animate={inView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                  transition={{ duration: 0.85, delay: 0.2 + i * 0.09, ease }}
                  className="inline-block text-text-primary"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="max-w-md mb-8">
            {descWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  animate={inView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.7 + i * 0.025, ease }}
                  className="inline-block text-sm md:text-base text-text-secondary font-body leading-relaxed"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <motion.div
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 60 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="relative lg:w-[45%] flex-shrink-0"
      >
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden bg-bg-card">
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent z-10" />
          <img
            src="/images/1.jpg"
            alt="Hero showcase"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-xs text-text-muted font-mono">©25</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
