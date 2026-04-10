import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-mono border border-border rounded text-text-muted transition-all hover:text-accent hover:border-accent hover:shadow-[0_0_8px_var(--accent)] ${className}`}
    >
      {children}
    </span>
  )
}
