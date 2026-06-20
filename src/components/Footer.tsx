import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const footerLinks = [
  {
    title: 'Pages',
    links: ['Home', 'Works', 'Services', 'Pricing', 'Blog'],
  },
  {
    title: 'Social',
    links: ['Twitter / X', 'Instagram', 'Dribbble', 'Behance', 'LinkedIn'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

function FooterLinkColumn({ col, index }: { col: typeof footerLinks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.1, ease }}
    >
      <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-5">
        {col.title}
      </h4>
      <ul className="space-y-3">
        {col.links.map((link, j) => (
          <li key={j}>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 font-body link-hover"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: false, margin: '-100px' });
  const brandRef = useRef(null);
  const brandInView = useInView(brandRef, { once: false, margin: '-40px' });
  const bottomRef = useRef(null);
  const bottomInView = useInView(bottomRef, { once: false, margin: '-20px' });

  const line1 = "Let's work";
  const line2 = 'together.';

  return (
    <footer id="contact" className="pt-20 md:pt-32 pb-8 px-4 md:px-6">
      <div className="max-w-[1500px] mx-auto">
        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mb-20 md:mb-32">
          <motion.p
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease }}
            className="text-xs font-mono text-text-muted uppercase tracking-[0.3em] mb-6"
          >
            Ready to start?
          </motion.p>

          <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1] tracking-tight text-text-primary mb-8">
            {line1.split('').map((char, i) => (
              <span key={`l1-${i}`} className="inline-block overflow-hidden">
                <motion.span
                  animate={ctaInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.03, ease }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              </span>
            ))}
            <br />
            {line2.split('').map((char, i) => (
              <span key={`l2-${i}`} className="inline-block overflow-hidden">
                <motion.span
                  animate={ctaInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.03, ease }}
                  className="inline-block italic font-light text-text-secondary"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="flex items-center justify-center gap-4"
          >
            <a href="mailto:hello@rama.studio" className="btn-primary text-base px-10 py-4">
              Get in touch
            </a>
            <a href="#works" className="btn-outline text-base px-10 py-4">
              View works
            </a>
          </motion.div>
        </div>

        {/* Footer Grid */}
        <div className="border-t border-border pt-12 md:pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            {/* Brand */}
            <motion.div
              ref={brandRef}
              animate={brandInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.65, ease }}
              className="col-span-2 md:col-span-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center">
                  <span className="text-bg font-heading font-bold text-sm">R</span>
                </div>
                <span className="font-heading font-semibold text-lg tracking-tight text-text-primary">
                  Rama
                </span>
              </div>
              <p className="text-sm text-text-secondary font-body leading-relaxed max-w-xs">
                Creative agency for bold companies. We craft brands that stand out.
              </p>
            </motion.div>

            {/* Link columns */}
            {footerLinks.map((col, i) => (
              <FooterLinkColumn key={i} col={col} index={i} />
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            ref={bottomRef}
            animate={bottomInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border-t border-border pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-text-muted font-body">
              &copy; 2025 Rama Studio. All rights reserved.
            </p>
            <p className="text-xs text-text-muted font-body">Crafted with care &#x2764;</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
