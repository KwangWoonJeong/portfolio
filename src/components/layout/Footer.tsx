export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-sm text-text-muted">
        <div>
          <span className="text-accent-green">$</span> exit 0 — © 2026 만보
        </div>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="mailto:hello@example.com" aria-label="Email">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
