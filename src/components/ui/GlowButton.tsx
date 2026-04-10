import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function GlowButton({ children, className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`px-5 py-2 font-mono text-sm text-accent border border-accent rounded bg-transparent transition-all hover:bg-accent/10 hover:shadow-[0_0_16px_var(--accent)] ${className}`}
    >
      {children}
    </button>
  )
}
