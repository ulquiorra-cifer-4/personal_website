import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const faqs = [
  {
    question: "What's your typical process for a new project?",
    answer:
      "We start with a discovery phase to understand your goals, audience, and competitors. From there, we move into strategy, design, and development - keeping you in the loop at every stage.",
  },
  {
    question: 'How long does a project usually take?',
    answer:
      "It depends on the scope. A simple website or branding project can take 2 to 3 weeks. Larger projects with multiple pages, motion, or strategy may take 4 to 6 weeks. We will always set a clear timeline before we begin.",
  },
  {
    question: 'Do you offer packages or custom quotes?',
    answer:
      "Both. We have a few starter packages to keep things simple, but we also offer custom quotes for projects with unique needs. Just tell us what you are planning and we will work around it.",
  },
  {
    question: "What's included in a branding package?",
    answer:
      'Our branding package covers the essentials: logo design, color palette, font pairing, and a mini style guide. We can also include social templates or creative direction if needed.',
  },
  {
    question: 'Can you work with our existing dev or marketing team?',
    answer:
      "Yes, absolutely. We are happy to collaborate with your team - whether it is development, content, or marketing. Clear communication and teamwork always lead to better results.",
  },
];

function FAQItem({
  faq,
  index,
  openIndex,
  setOpenIndex,
}: {
  faq: typeof faqs[0];
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group cursor-pointer"
      >
        <span className="font-heading text-base md:text-lg font-medium text-text-primary group-hover:text-accent transition-colors duration-300 pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: openIndex === index ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent/30 transition-colors duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-text-secondary group-hover:text-accent transition-colors duration-300"
          >
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary font-body leading-relaxed pb-6 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-80px' });
  const wrapperRef = useRef(null);
  const wrapperInView = useInView(wrapperRef, { once: false, margin: '-60px' });

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto">
      <motion.div
        ref={wrapperRef}
        animate={wrapperInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.9, ease }}
        className="flex flex-col lg:flex-row gap-12 lg:gap-20 border border-border rounded-3xl p-6 md:p-10 lg:p-16"
      >
        {/* Left - Title */}
        <div className="lg:w-[35%]">
          <div ref={titleRef} className="lg:sticky lg:top-32">
            <motion.h2
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease }}
              className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-text-primary lowercase mb-4"
            >
              <span className="italic font-light text-text-secondary">frequently</span>
              <br />
              <span>asked</span>
              <br />
              <span className="italic font-light text-text-secondary">questions</span>
            </motion.h2>
            <motion.p
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="text-sm text-text-secondary font-body"
            >
              Have more questions?{' '}
              <a href="#contact" className="text-accent hover:underline">
                Get in touch
              </a>
            </motion.p>
          </div>
        </div>

        {/* Right - Accordion — each question reveals individually */}
        <div className="lg:w-[65%]">
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
