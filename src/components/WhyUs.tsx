import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '12', label: 'Awards Won' },
];

const reasons = [
  {
    title: 'Strategic Thinking',
    desc: 'Every design decision is backed by research and a clear understanding of your business goals.',
  },
  {
    title: 'Pixel Perfect',
    desc: 'We obsess over the details so your brand looks flawless across every touchpoint.',
  },
  {
    title: 'Fast Delivery',
    desc: 'We respect your time. Expect clear timelines and on-time delivery, always.',
  },
  {
    title: 'Ongoing Support',
    desc: "Our relationship doesn't end at launch. We're here to help you grow.",
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between"
    >
      <span className="text-[clamp(2rem,4vw,3.5rem)] font-heading font-bold text-text-primary leading-none">
        {stat.number}
      </span>
      <span className="text-xs text-text-secondary font-body mt-4 uppercase tracking-wider">
        {stat.label}
      </span>
    </motion.div>
  );
}

function ReasonItem({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease }}
      className="group"
    >
      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-bg-hover transition-colors duration-300">
        <div className="w-8 h-8 rounded-full bg-bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-accent/30 transition-colors duration-300">
          <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium text-text-primary mb-1">
            {reason.title}
          </h4>
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            {reason.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const imgTopRef = useRef(null);
  const imgTopInView = useInView(imgTopRef, { once: false, margin: '-80px' });
  const imgBotRef = useRef(null);
  const imgBotInView = useInView(imgBotRef, { once: false, margin: '-80px' });
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-60px' });

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto">
      {/* Top Row - Image + Stats */}
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Image */}
        <motion.div
          ref={imgTopRef}
          animate={imgTopInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.9, ease }}
          className="lg:w-1/2"
        >
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-card">
            <img
              src="/images/11.jpg"
              alt="Why work with us"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom Row - Image + Reasons */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Big Image */}
        <motion.div
          ref={imgBotRef}
          animate={imgBotInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="lg:w-1/2"
        >
          <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden bg-bg-card">
            <img
              src="/images/12.jpg"
              alt="Our work in detail"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Reasons */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.h3
            ref={titleRef}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease }}
            className="font-heading text-2xl md:text-3xl font-semibold text-text-primary mb-8 tracking-tight"
          >
            Why work with us?
          </motion.h3>

          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <ReasonItem key={i} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
