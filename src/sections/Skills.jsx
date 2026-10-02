import { useRef, useState } from 'react';
import SkillCard from '../components/SkillCard.jsx';
import { skills } from '../data/skills.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Skills() {
  const sectionRef = useRef(null);
  const [revealedId, setRevealedId] = useState(null);
  useScrollReveal(sectionRef, '[data-skill-card]', { y: 24, stagger: 0.04 });

  return (
    <section ref={sectionRef} id="skills" aria-label="Skills" className="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
      <p className="font-mono text-eyebrow uppercase tracking-widest text-muted">03 // Skills</p>
      <h2 className="mt-4 max-w-2xl font-display text-display-1 text-paper">Technologies I build with.</h2>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isRevealed={revealedId === skill.id}
            onTap={() => setRevealedId((prev) => (prev === skill.id ? null : skill.id))}
          />
        ))}
      </div>
    </section>
  );
}
