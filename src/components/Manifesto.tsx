import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-120px' });

  const words = ['no', 'boring', 'stuff'];
  const descWords = 'We bring unique perspective to you to stand out among the crowd.'.split(' ');

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-4 md:px-6 max-w-[1500px] mx-auto overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg z-10" />
        <motion.div
          animate={inView ? { opacity: 0.07, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Large Heading Words */}
        <div className="mb-8">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                animate={inView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.14,
                  ease,
                }}
                className="font-heading text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.95] tracking-tighter text-text-primary lowercase"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Description - word by word */}
        <div className="max-w-md">
          {descWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                animate={inView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.45 + i * 0.04,
                  ease,
                }}
                className="inline-block text-sm md:text-base text-text-secondary font-body leading-relaxed"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
