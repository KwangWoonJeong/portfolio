import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import GitTimeline from '../ui/GitTimeline'
import experiences from '../../data/experience'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Experience() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-20" ref={ref}>
      <motion.h2
        className="mb-8"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <span className="text-accent-green">##</span> git log --oneline --career
      </motion.h2>

      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <GitTimeline items={experiences} />
      </motion.div>
    </section>
  )
}
