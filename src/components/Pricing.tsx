import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const plans = [
  {
    badge: 'Starter',
    title: 'Basic Package',
    price: '$2,500',
    desc: 'Perfect for startups and small businesses looking to establish their brand.',
    features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guide (Mini)', 'Social Media Kit'],
    popular: false,
  },
  {
    badge: 'Popular',
    title: 'Growth Package',
    price: '$5,000',
    desc: 'For growing brands that need a comprehensive design system.',
    features: ['Full Brand Identity', 'Website Design (5 pages)', 'Social Media Templates', 'Motion Graphics', 'Brand Strategy'],
    popular: true,
  },
  {
    badge: 'Bespoke',
    title: 'Custom Project',
    price: 'Custom',
    desc: 'Perfect for specialized needs or early-stage projects.',
    features: ['Everything in Growth', 'Custom Illustrations', '3D Assets', 'Ongoing Support', 'Priority Delivery'],
    popular: false,
  },
];

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.92 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
    >
      <div
        className={`pricing-card p-6 md:p-8 h-full flex flex-col ${
          plan.popular ? 'ring-1 ring-accent/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span
            className={`text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full ${
              plan.popular ? 'bg-accent/10 text-accent' : 'bg-bg-hover text-text-muted'
            }`}
          >
            {plan.badge}
          </span>
          {plan.popular && (
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
              ★ Recommended
            </span>
          )}
        </div>

        <h3 className="font-heading text-xl md:text-2xl font-semibold text-text-primary mb-2 tracking-tight">
          {plan.title}
        </h3>

        <div className="mb-4">
          <span className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
            {plan.price}
          </span>
          {plan.price !== 'Custom' && (
            <span className="text-sm text-text-muted font-body ml-2">/project</span>
          )}
        </div>

        <p className="text-sm text-text-secondary font-body leading-relaxed mb-8">{plan.desc}</p>

        <div className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, j) => (
            <div key={j} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  plan.popular ? 'bg-accent/15' : 'bg-bg-hover'
                }`}
              >
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke={plan.popular ? '#c8ff00' : '#8a8a8a'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-text-secondary font-body">{feature}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full py-3.5 rounded-full font-body text-sm font-medium transition-all duration-300 cursor-pointer ${
            plan.popular
              ? 'bg-accent text-bg hover:bg-accent-dim'
              : 'bg-bg-hover text-text-primary border border-border hover:border-border-light'
          }`}
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-80px' });

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-16">
        <div className="overflow-hidden">
          <motion.h2
            animate={titleInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
            transition={{ duration: 0.85, ease }}
            className="font-heading text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-text-primary"
          >
            <span className="italic font-light text-text-secondary">Pricing</span>
          </motion.h2>
        </div>
      </div>

      {/* Pricing Cards — each reveals individually */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} />
        ))}
      </div>
    </section>
  );
}
