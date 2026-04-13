export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-sm text-text-muted">
        <div>
          <span className="text-accent-green" aria-hidden="true">$</span> exit 0 — © {new Date().getFullYear()} 만보
        </div>
        <nav aria-label="Footer links" className="flex gap-4">
          <a href="https://github.com/manbo" target="_blank" rel="noopener noreferrer">
            GitHub
            <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href="https://linkedin.com/in/manbo" target="_blank" rel="noopener noreferrer">
            LinkedIn
            <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href="mailto:manbo@dev.com">
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
