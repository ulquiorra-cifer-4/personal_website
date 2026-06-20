import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const testimonials = [
  {
    quote: 'Rama made the whole branding process feel light and stress free. Our ideas finally make sense visually and the result truly stands out.',
    author: 'Sarah Chen',
    role: 'CEO, Nexus',
    rating: 5,
  },
  {
    quote: 'They took our ideas and turned them into a brand that actually stands out. The process was smooth, fast, and surprisingly fun.',
    author: 'Mark Rivera',
    role: 'Founder, Voltra',
    rating: 5,
  },
  {
    quote: 'Rama really got what we wanted. They transformed our rough ideas into a brand that feels clear and confident.',
    author: 'Lisa Tanaka',
    role: 'CMO, Aura',
    rating: 5,
  },
  {
    quote: 'Working with Rama was super easy. They listened closely and turned our vision into a brand that feels strong and unique.',
    author: 'James Cole',
    role: 'Director, Prism',
    rating: 5,
  },
  {
    quote: 'The whole experience exceeded our expectations. Professional, creative, and always on time. Would recommend them 10/10!',
    author: 'Emily Park',
    role: 'Head of Design, Lume',
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card mx-2 flex-shrink-0">
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, j) => (
          <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#c8ff00" className="opacity-80">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-text-secondary font-body leading-relaxed mb-6">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-bg-hover border border-border flex items-center justify-center">
          <span className="text-xs font-heading font-semibold text-text-primary">
            {t.author.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary font-heading">{t.author}</p>
          <p className="text-xs text-text-muted font-body">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-80px' });
  const row1Ref = useRef(null);
  const row1InView = useInView(row1Ref, { once: false, margin: '-60px' });
  const row2Ref = useRef(null);
  const row2InView = useInView(row2Ref, { once: false, margin: '-60px' });

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      {/* Section Title */}
      <div ref={titleRef} className="px-4 md:px-6 max-w-[1500px] mx-auto mb-16">
        <div className="overflow-hidden">
          <motion.h2
            animate={titleInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
            transition={{ duration: 0.85, ease }}
            className="font-heading text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-text-primary lowercase"
          >
            <span className="italic font-light text-text-secondary">words</span>{' '}
            <span>from</span>{' '}
            <span className="italic font-light text-text-secondary">our</span>{' '}
            <span>happy</span>{' '}
            <span>clients</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <motion.div
        ref={row1Ref}
        animate={row1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        className="mb-4"
      >
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </motion.div>

      {/* Marquee Row 2 (reverse) */}
      <motion.div
        ref={row2Ref}
        animate={row2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
      >
        <div
          className="flex animate-marquee-slow"
          style={{ width: 'max-content', animationDirection: 'reverse' }}
        >
          {[...testimonials.slice(2), ...testimonials.slice(0, 2), ...testimonials.slice(2), ...testimonials.slice(0, 2)].map(
            (t, i) => (
              <TestimonialCard key={i} t={t} />
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
