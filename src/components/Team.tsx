import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const team = [
  { name: 'Alex Morgan', role: 'Creative Director', initials: 'AM', color: '#4a9eff', image: '/images/13.jpg' },
  { name: 'Sari Putri', role: 'Brand Strategist', initials: 'SP', color: '#b44aff', image: '/images/14.jpg' },
  { name: 'Dani Kurniawan', role: 'Lead Designer', initials: 'DK', color: '#4aff7a', image: '/images/15.jpg' },
  { name: 'Rina Tanaka', role: 'Motion Designer', initials: 'RT', color: '#ff4a6a', image: '/images/16.jpg' },
  { name: 'Budi Santoso', role: '3D Artist', initials: 'BS', color: '#ffcf4a', image: '/images/17.jpg' },
  { name: 'Lena Kim', role: 'Web Developer', initials: 'LK', color: '#4affea', image: '/images/18.jpg' },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-70px' });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.9 }}
      transition={{ duration: 0.75, delay: index * 0.1, ease }}
      className="group"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-card border border-border hover:border-border-light transition-all duration-500 cursor-pointer">
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: member.color }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-bg/80 to-transparent">
          <h4 className="font-heading text-sm md:text-base font-medium text-text-primary">
            {member.name}
          </h4>
          <p className="text-xs text-text-muted font-body mt-0.5">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-100px' });

  const titleWords = ['the', 'chosen', 'ones'];

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-[#0a0a0e] to-bg z-10" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-purple-500/20" />
        </div>
      </div>

      <div className="relative z-20 max-w-[1500px] mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                animate={titleInView ? { y: 0, opacity: 1 } : { y: '120%', opacity: 0 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease }}
                className="font-heading text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight text-text-primary lowercase"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Team Grid — each card reveals individually */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
