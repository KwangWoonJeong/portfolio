import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import projects from '../data/projects'
import Badge from '../components/ui/Badge'
import GlowButton from '../components/ui/GlowButton'
import TerminalWindow from '../components/ui/TerminalWindow'
import ArchitectureDiagram from '../components/ui/ArchitectureDiagram'
import CodeBlock from '../components/ui/CodeBlock'
import PageTransition from '../components/animations/PageTransition'
import useScrollReveal from '../hooks/useScrollReveal'
import { creativeWorkSchema } from '../utils/structuredData'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function RevealSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="mb-4">404</h1>
        <p className="text-text-muted font-sans mb-6">프로젝트를 찾을 수 없습니다.</p>
        <GlowButton onClick={() => navigate('/')}>$ cd ~</GlowButton>
      </div>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | 만보 Portfolio</title>
        <meta name="description" content={project.subtitle} />
        <meta property="og:title" content={`${project.title} | 만보 Portfolio`} />
        <meta property="og:description" content={project.subtitle} />
        <link rel="canonical" href={`https://manbo.dev/projects/${project.slug}`} />
        <script type="application/ld+json">{JSON.stringify(creativeWorkSchema(project))}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        {/* Hero */}
        <section>
          <Link
            to="/"
            state={{ scrollTo: 'projects' }}
            className="inline-block font-mono text-sm text-accent-green hover:underline mb-6"
          >
            $ cd ..
          </Link>

          <h1 className="mb-2">{project.title}</h1>
          <p className="text-lg font-sans text-text-muted mb-4">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <GlowButton>GitHub</GlowButton>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <GlowButton>Demo</GlowButton>
              </a>
            )}
          </div>
        </section>

        {/* Problem */}
        <RevealSection>
          <h2 className="mb-4">
            <span className="text-accent-green">##</span> Problem Statement
          </h2>
          <TerminalWindow title="problem.md">
            <p className="font-sans text-text-primary leading-relaxed">{project.problem}</p>
          </TerminalWindow>
        </RevealSection>

        {/* Architecture */}
        <RevealSection>
          <h2 className="mb-4">
            <span className="text-accent-green">##</span> System Architecture
          </h2>
          <ArchitectureDiagram mermaid={project.architecture} />
        </RevealSection>

        {/* Approach */}
        <RevealSection className="space-y-6">
          <h2>
            <span className="text-accent-green">##</span> Technical Approach
          </h2>
          <p className="font-sans text-text-primary leading-relaxed">{project.approach}</p>
          {project.codeSnippet && (
            <CodeBlock
              code={project.codeSnippet.code}
              language={project.codeSnippet.language}
              title={project.codeSnippet.title}
            />
          )}
        </RevealSection>

        {/* Results */}
        <RevealSection>
          <h2 className="mb-6">
            <span className="text-accent-green">##</span> Results — before vs after
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {project.results.map((r) => (
              <div
                key={r.metric}
                className="group rounded-lg border border-border bg-surface p-5 text-center transition-all hover:border-accent hover:shadow-[0_0_16px_var(--accent-green)]"
              >
                <p className="text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">
                  {r.metric}
                </p>
                <p className="text-sm text-text-muted line-through mb-1">{r.before}</p>
                <p className="text-xl font-mono font-bold text-accent-green">{r.after}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Learnings */}
        <RevealSection>
          <h2 className="mb-4">
            <span className="text-accent-green">##</span> git log --lessons
          </h2>
          <ul className="space-y-3">
            {project.learnings.map((l, i) => (
              <li key={i} className="flex gap-3 font-sans text-text-primary text-sm leading-relaxed">
                <span className="text-accent-green mt-0.5 shrink-0">▸</span>
                {l}
              </li>
            ))}
          </ul>
        </RevealSection>

        {/* back */}
        <div className="pt-8 border-t border-border">
          <Link
            to="/"
            state={{ scrollTo: 'projects' }}
            className="font-mono text-sm text-accent-green hover:underline"
          >
            $ cd ~/projects/
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
