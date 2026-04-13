import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import Badge from './Badge'

interface Props {
  project: Project
  featured?: boolean
}

const gradients: Record<string, string> = {
  vision: 'from-accent/20 to-accent-green/10',
  robotics: 'from-accent/20 to-accent-yellow/10',
  edge: 'from-accent-green/20 to-accent/10',
  control: 'from-accent-yellow/20 to-accent/10',
}

export default function ProjectCard({ project, featured }: Props) {
  const navigate = useNavigate()
  const go = () => navigate(`/projects/${project.slug}`)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group rounded-lg border border-border bg-surface overflow-hidden shadow-lg cursor-pointer transition-colors hover:border-accent ${
        featured ? 'md:col-span-2' : ''
      }`}
      onClick={go}
    >
      {/* terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-hover">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-yellow" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 text-xs font-mono text-text-muted">{project.slug}</span>
      </div>

      {/* thumbnail placeholder */}
      <div
        className={`aspect-video bg-gradient-to-br ${gradients[project.category] ?? gradients.vision} flex items-center justify-center`}
      >
        <span className="text-4xl font-mono text-text-muted opacity-40 select-none">
          {project.category === 'vision' && '👁'}
          {project.category === 'robotics' && '🤖'}
          {project.category === 'edge' && '🔲'}
          {project.category === 'control' && '🎛'}
        </span>
      </div>

      {/* content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg">{project.title}</h3>
        <p className="text-sm font-sans text-text-muted leading-relaxed">{project.subtitle}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          {project.tags.map((t) => (
            <Badge key={t} className="text-[10px] px-1.5 py-0.5">
              {t}
            </Badge>
          ))}
        </div>

        {/* impact */}
        <p className="text-sm font-mono font-bold text-accent-green">{project.impact}</p>

        {/* footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            className="text-sm font-mono text-accent hover:underline"
            onClick={(e) => {
              e.stopPropagation()
              go()
            }}
          >
            View Detail →
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
