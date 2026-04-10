import type { ReactNode } from 'react'
import TerminalWindow from '../components/ui/TerminalWindow'
import GlowButton from '../components/ui/GlowButton'
import Badge from '../components/ui/Badge'

const Section = ({ id, title, children }: { id: string; title: string; children?: ReactNode }) => (
  <section id={id} className="max-w-4xl mx-auto px-6 py-20">
    <h2 className="mb-6">
      <span className="text-accent-green">$</span> {title}
    </h2>
    {children}
  </section>
)

export default function Home() {
  return (
    <>
      <Section id="about" title="whoami">
        <TerminalWindow title="manbo@portfolio:~">
          <p className="text-accent-green">$ cat about.md</p>
          <h1 className="my-4">안녕하세요, 만보입니다.</h1>
          <p className="text-text-primary font-sans">개발자 포트폴리오에 오신 것을 환영합니다.</p>
          <div className="mt-6 flex gap-3">
            <GlowButton>View Projects</GlowButton>
            <GlowButton>Contact</GlowButton>
          </div>
        </TerminalWindow>
      </Section>
      <Section id="skills" title="ls skills/">
        <div className="flex flex-wrap gap-2">
          {['TypeScript', 'React', 'Node.js', 'Python', 'Go', 'Docker'].map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </Section>
      <Section id="projects" title="ls projects/" />
      <Section id="experience" title="cat experience.log" />
      <Section id="blog" title="ls blog/" />
      <Section id="contact" title="mail -s hello" />
    </>
  )
}
