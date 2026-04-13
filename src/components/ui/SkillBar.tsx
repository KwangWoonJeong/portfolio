import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  name: string
  level: number
  icon?: string
  description: string
  animate: boolean
}

function barColor(level: number) {
  if (level > 85) return 'var(--accent-green)'
  if (level > 70) return 'var(--accent)'
  return 'var(--accent-yellow)'
}

export default function SkillBar({ name, level, icon, description, animate }: Props) {
  const [hovered, setHovered] = useState(false)

  const filled = Math.round(level / 10)
  const empty = 10 - filled

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1 font-mono text-sm">
        <span className="text-text-primary">
          {icon && <span className="mr-1.5">{icon}</span>}
          {name}
        </span>
        <span className="text-text-muted">{level}%</span>
      </div>

      {/* visual bar */}
      <div className="relative h-5 bg-surface border border-border rounded overflow-hidden font-mono text-xs flex items-center">
        <motion.div
          className="h-full rounded-l"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ backgroundColor: barColor(level), opacity: 0.25 }}
        />
        {/* text overlay */}
        <span className="absolute inset-0 flex items-center px-2 text-text-muted select-none">
          [{'█'.repeat(animate ? filled : 0)}{'░'.repeat(animate ? empty : 10)}]
        </span>
      </div>

      {/* tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 -bottom-9 z-20 bg-surface-hover border border-border rounded px-3 py-1.5 text-xs font-sans text-text-primary shadow-lg"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
