import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const posts = [
  {
    title: 'Why Your Brand Needs a Design System in 2025',
    category: 'Branding',
    date: 'Dec 15, 2025',
    color: 'from-[#1a1a2e] to-[#0f3460]',
    accent: '#4a9eff',
    image: '/images/19.jpg',
  },
  {
    title: 'The Role of Motion Design in Modern Websites',
    category: 'Motion',
    date: 'Nov 28, 2025',
    color: 'from-[#2d1b36] to-[#1a0a2e]',
    accent: '#b44aff',
    image: '/images/20.jpg',
  },
  {
    title: '5 Tips to Create Scroll-Stopping Social Content',
    category: 'Social Media',
    date: 'Nov 10, 2025',
    color: 'from-[#1b2d1e] to-[#0a2e12]',
    accent: '#4aff7a',
    image: '/images/21.jpg',
  },
];

function BlogCard({ post, index }: { post: typeof posts[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-70px' });

  return (
    <motion.article
      ref={ref}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.93 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
      className="blog-card group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 img-hover-zoom">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: post.accent }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-text-muted">
          {post.category}
        </span>
        <span className="text-xs text-text-muted font-body">{post.date}</span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-medium text-text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
        {post.title}
      </h3>
    </motion.article>
  );
}

export default function Blog() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-80px' });

  return (
    <section id="blog" className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto border-t border-border">
      {/* Section Title */}
      <div ref={titleRef} className="mb-16">
        <div className="overflow-hidden">
          <motion.h2
            animate={titleInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
            transition={{ duration: 0.85, ease }}
            className="font-heading text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-text-primary lowercase"
          >
            <span className="italic font-light text-text-secondary">latest</span>{' '}
            <span>news</span>
          </motion.h2>
        </div>
      </div>

      {/* Blog Grid — each card reveals individually */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
