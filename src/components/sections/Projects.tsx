import { useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import ProjectCard from '../ui/ProjectCard'
import projects from '../../data/projects'
import type { Project } from '../../data/projects'

type Category = Project['category'] | 'all'

const tabs: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'vision', label: 'Vision' },
  { key: 'robotics', label: 'Robotics' },
  { key: 'edge', label: 'Edge AI' },
  { key: 'control', label: 'Control' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  const [active, setActive] = useState<Category>('all')
  const { ref, isVisible } = useScrollReveal()

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)
  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-20" ref={ref}>
      <motion.h2
        className="mb-8"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <span className="text-accent-green">##</span> ls ~/projects/
      </motion.h2>

      {/* tabs */}
      <motion.div
        className="flex flex-wrap gap-1 mb-8 border-b border-border"
        role="tablist"
        aria-label="Project categories"
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
              active === t.key ? 'text-accent' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {t.label}
            {active === t.key && (
              <motion.div
                layoutId="project-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {featured.map((p) => (
          <motion.div key={p.slug} variants={fadeUp} className="md:col-span-2">
            <ProjectCard project={p} featured />
          </motion.div>
        ))}
        {rest.map((p) => (
          <motion.div key={p.slug} variants={fadeUp}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
