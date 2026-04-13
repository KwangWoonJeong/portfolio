import type { ReactNode } from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import TechStack from '../components/sections/TechStack'
import Projects from '../components/sections/Projects'

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
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Section id="experience" title="cat experience.log" />
      <Section id="blog" title="ls blog/" />
      <Section id="contact" title="mail -s hello" />
    </>
  )
}
