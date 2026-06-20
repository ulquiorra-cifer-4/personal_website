import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-[1500px] px-4 md:px-6">
          <div
            className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
              scrolled ? 'glass' : ''
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center">
                <span className="text-bg font-heading font-bold text-sm">R</span>
              </div>
              <span className="font-heading font-semibold text-lg tracking-tight text-text-primary">
                Rama
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 link-hover font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Menu */}
            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden md:inline-block btn-primary text-sm">
                Contact us
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-border transition-colors hover:border-border-light"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="block w-4 h-[1.5px] bg-text-primary transition-transform"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  className="block w-4 h-[1.5px] bg-text-primary transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl pt-28 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-heading font-semibold text-text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-center mt-6 text-base"
              >
                Contact us
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
