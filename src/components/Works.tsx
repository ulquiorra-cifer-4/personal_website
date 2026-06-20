import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const projects = [
  {
    title: 'Nexus Brand Identity',
    category: 'Branding',
    year: '2025',
    color: 'from-[#1a1a2e] to-[#0f3460]',
    accent: '#4a9eff',
    image: '/images/3.jpg',
  },
  {
    title: 'Voltra Website',
    category: 'Website',
    year: '2025',
    color: 'from-[#2d1b36] to-[#1a0a2e]',
    accent: '#b44aff',
    image: '/images/4.jpg',
  },
  {
    title: 'Aura Social Campaign',
    category: 'Social Media',
    year: '2024',
    color: 'from-[#1b2d1e] to-[#0a2e12]',
    accent: '#4aff7a',
    image: '/images/5.jpg',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease,
      }}
    >
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-4 img-hover-zoom">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: project.accent }}
          />
        </div>

        {/* Project Info */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <h3 className="font-heading text-xl md:text-2xl font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs text-text-muted font-body px-3 py-1 rounded-full border border-border">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-text-secondary group-hover:text-accent transition-colors">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });

  return (
    <section id="works" className="py-20 md:py-32 px-4 md:px-6 max-w-[1500px] mx-auto">
      {/* Section Header */}
      <div ref={headerRef} className="flex items-end justify-between mb-16 border-b border-border pb-8">
        <div className="overflow-hidden">
          <motion.h2
            animate={headerInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
            transition={{ duration: 0.85, ease }}
            className="font-heading text-[clamp(3rem,8vw,7rem)] font-semibold leading-[1] tracking-tight text-text-primary"
          >
            Works
          </motion.h2>
        </div>
        <motion.span
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-sm text-text-secondary font-body mb-2"
        >
          ({String(projects.length).padStart(2, '0')})
        </motion.span>
      </div>

      {/* Project Cards - each one reveals individually */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
