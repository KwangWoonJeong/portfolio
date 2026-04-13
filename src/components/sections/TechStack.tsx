import { useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import SkillBar from '../ui/SkillBar'
import skills from '../../data/skills'
import type { Skill } from '../../data/skills'

type Category = Skill['category'] | 'all'

const tabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'vision', label: 'Vision' },
  { key: 'robotics', label: 'Robotics' },
  { key: 'edge', label: 'Edge AI' },
  { key: 'infra', label: 'Infra' },
  { key: 'languages', label: 'Languages' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TechStack() {
  const [active, setActive] = useState<Category>('all')
  const { ref, isVisible } = useScrollReveal()

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active)

  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-20" ref={ref}>
      <motion.h2
        className="mb-8"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <span className="text-accent-green">##</span> tech_stack.yml
      </motion.h2>

      {/* tabs */}
      <motion.div
        className="flex flex-wrap gap-1 mb-8 border-b border-border"
        role="tablist"
        aria-label="Tech stack categories"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 font-mono text-sm transition-colors relative ${
              active === t.key
                ? 'text-accent'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {t.label}
            {active === t.key && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* skills grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-x-8 gap-y-2"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {filtered.map((skill) => (
          <motion.div key={`${skill.category}-${skill.name}`} variants={fadeUp}>
            <SkillBar
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
              description={skill.description}
              animate={isVisible}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
