import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Experience } from '../../data/experience'
import Badge from './Badge'

interface Props {
  items: Experience[]
}

function TimelineItem({ item }: { item: Experience }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* branch line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-accent opacity-30" />
      {/* commit dot */}
      <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-accent bg-primary" />

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left group"
      >
        {/* commit summary line */}
        <div className="flex flex-wrap items-baseline gap-2 font-mono text-sm">
          <span className="text-accent-yellow">{item.hash}</span>
          <span className="text-text-muted">—</span>
          <span className="text-text-bright group-hover:text-accent transition-colors">
            {item.title}
          </span>
          <span className="text-text-muted text-xs">({item.period})</span>
          <span className="text-text-muted text-xs ml-auto">{open ? '▾' : '▸'}</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-1 pl-4 border-l border-border space-y-2 font-mono text-sm">
              <p className="text-text-muted">
                Author: 만보 &lt;manbo@dev&gt;
              </p>
              <p className="text-text-muted">
                Role: <span className="text-text-primary">{item.role}</span>
              </p>

              <p className="font-sans text-text-primary text-sm mt-3 leading-relaxed">
                {item.description}
              </p>

              <ul className="space-y-1 mt-3">
                {item.achievements.map((a, i) => (
                  <li key={i} className="flex gap-2 font-sans text-text-primary text-sm">
                    <span className="text-accent-green shrink-0">▸</span>
                    {a}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                {item.tags.map((t) => (
                  <Badge key={t} className="text-[10px] px-1.5 py-0.5">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GitTimeline({ items }: Props) {
  return (
    <div className="relative">
      {items.map((item) => (
        <TimelineItem key={item.hash} item={item} />
      ))}
    </div>
  )
}
