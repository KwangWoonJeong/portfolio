import type { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({ title = 'bash', children, className = '' }: Props) {
  return (
    <div className={`rounded-lg border border-border bg-surface overflow-hidden shadow-lg ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-hover">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-yellow" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 text-xs font-mono text-text-muted">{title}</span>
      </div>
      <div className="p-6 font-mono text-sm">{children}</div>
    </div>
  )
}
