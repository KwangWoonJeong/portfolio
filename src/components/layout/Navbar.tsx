import { useEffect, useState } from 'react'
import ThemeToggle from '../ui/ThemeToggle'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'blog', 'contact'] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('about')

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (els.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-primary/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#about" className="font-mono text-accent-green text-sm">
          <span className="text-text-muted">$</span> ~/manbo
        </a>
        <ul className="hidden md:flex gap-6 font-mono text-sm">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={`transition-colors ${
                  active === s ? 'text-accent' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="menu"
            className="md:hidden text-text-primary font-mono"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-3 px-6 py-4 font-mono text-sm border-t border-border bg-surface">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className={active === s ? 'text-accent' : 'text-text-muted'}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
