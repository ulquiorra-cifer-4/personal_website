import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const services = [
  {
    num: '01',
    title: 'branding',
    desc: 'Build a strong, memorable identity that connects with your audience.',
    color: 'from-[#1a1a2e] to-[#16213e]',
    accent: '#4a9eff',
    image: '/images/6.jpg',
  },
  {
    num: '02',
    title: 'Social media',
    desc: 'Content that captures attention and drives meaningful engagement.',
    color: 'from-[#2d1b36] to-[#1a0a2e]',
    accent: '#b44aff',
    image: '/images/7.jpg',
  },
  {
    num: '03',
    title: '3D',
    desc: 'Immersive 3D visuals that add depth to your brand story.',
    color: 'from-[#1b2d1e] to-[#0a2e12]',
    accent: '#4aff7a',
    image: '/images/8.jpg',
  },
  {
    num: '04',
    title: 'website',
    desc: 'Modern, responsive websites that convert visitors into customers.',
    color: 'from-[#2d2b1b] to-[#2e2a0a]',
    accent: '#ffcf4a',
    image: '/images/9.jpg',
  },
  {
    num: '05',
    title: 'Motion',
    desc: 'Dynamic animations that bring your brand to life.',
    color: 'from-[#2d1b1b] to-[#2e0a0a]',
    accent: '#ff4a6a',
    image: '/images/10.jpg',
  },
];

function ServiceItem({
  service,
  index,
  active,
  onHover,
}: {
  service: typeof services[0];
  index: number;
  active: number;
  onHover: (i: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease,
      }}
      onMouseEnter={() => onHover(index)}
      className={`service-item group cursor-pointer border-b border-border py-6 md:py-8 flex items-start md:items-center gap-4 md:gap-6 transition-all duration-400 ${
        index === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
      }`}
    >
      <span
        className={`text-xs font-mono mt-1 md:mt-0 transition-colors duration-300 ${
          index === active ? 'text-accent' : 'text-text-muted'
        }`}
      >
        ({service.num})
      </span>
      <div className="flex-1">
        <h3
          className={`font-heading text-[clamp(1.8rem,4vw,4rem)] font-semibold leading-[1.1] tracking-tight lowercase transition-colors duration-300 ${
            index === active ? 'text-text-primary' : 'text-text-secondary'
          }`}
        >
          {service.title}
        </h3>
        <AnimatePresence>
          {index === active && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-text-secondary font-body mt-2 max-w-sm"
            >
              {service.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
          index === active ? 'border-accent bg-accent/10' : 'border-border'
        }`}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-colors duration-300 ${
            index === active ? 'text-accent' : 'text-text-muted'
          }`}
        >
          <path
            d="M1 11L11 1M11 1H3M11 1V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: false, margin: '-80px' });
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: false, margin: '-40px' });

  return (
    <section id="services" className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
        {/* Left - Image Stack */}
        <motion.div
          ref={imageRef}
          animate={imageInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.9, ease }}
          className="lg:w-[45%] lg:pr-16"
        >
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0"
              >
                <img
                  src={services[active].image}
                  alt={services[active].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[80px] opacity-20 pointer-events-none"
                  style={{ backgroundColor: services[active].accent }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div className="hidden lg:flex gap-2 mt-4">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'bg-text-primary' : 'bg-border hover:bg-border-light'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right - Service List */}
        <div className="lg:w-[55%]">
          {/* Section Label */}
          <motion.div
            ref={labelRef}
            animate={labelInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease }}
            className="mb-10"
          >
            <span className="text-xs text-text-muted font-mono uppercase tracking-[0.2em]">
              Services
            </span>
          </motion.div>

          {/* Service Items — each reveals individually */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <ServiceItem
                key={i}
                service={service}
                index={i}
                active={active}
                onHover={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
