import { motion } from 'framer-motion'
import useTypingEffect from '../../hooks/useTypingEffect'
import GlowButton from '../ui/GlowButton'

const keywords = [
  'ROS2 Robotics Developer',
  'Edge AI Deployment',
  'Control Systems Engineer',
  'Computer Vision Specialist',
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero() {
  const { displayText, showCursor } = useTypingEffect({ strings: keywords })

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center',
      }}
    >
      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 45%, var(--accent), transparent)',
          opacity: 0.05,
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* terminal prompt */}
        <motion.p variants={fadeUp} className="font-mono text-sm text-accent-green mb-4">
          visitor@manbo:~$
        </motion.p>

        {/* whoami result */}
        <motion.h1 variants={fadeUp} className="text-text-bright mb-2">
          만보
        </motion.h1>

        {/* subtitle */}
        <motion.p variants={fadeUp} className="text-text-primary text-lg font-sans mb-6">
          Computer Vision &amp; Physical AI Engineer
        </motion.p>

        {/* typing effect */}
        <motion.p variants={fadeUp} className="font-mono text-accent text-base h-7 mb-10">
          {displayText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            |
          </span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex justify-center gap-4 flex-wrap">
          <GlowButton onClick={() => scrollTo('projects')}>cat projects.md</GlowButton>
          <GlowButton
            onClick={() => {
              const a = document.createElement('a')
              a.href = '/resume.pdf'
              a.download = 'resume.pdf'
              a.click()
            }}
          >
            wget resume.pdf
          </GlowButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
