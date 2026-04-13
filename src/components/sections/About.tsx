import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

interface CounterProps {
  target: number
  suffix?: string
  label: string
  trigger: boolean
}

function Counter({ target, suffix = '', label, trigger }: CounterProps) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!trigger) return
    const duration = 1500
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [trigger, target])

  return (
    <div className="text-center">
      <span className="text-2xl font-mono font-bold text-accent">
        {count}
        {suffix}
      </span>
      <p className="text-sm text-text-muted mt-1 font-sans">{label}</p>
    </div>
  )
}

const stats = [
  { target: 4, suffix: '+', label: 'Projects' },
  { target: 500, suffix: '+', label: 'GitHub Commits' },
  { target: 10, suffix: '+', label: 'Tech Skills' },
  { target: 2, suffix: '+', label: 'Years Experience' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-20" ref={ref}>
      <motion.h2
        className="mb-10"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <span className="text-accent-green">##</span> about.md
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-[200px_1fr] gap-10 items-start"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* profile placeholder */}
        <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
          <div className="w-[200px] h-[200px] rounded-xl border-2 border-accent flex items-center justify-center bg-surface text-4xl font-mono font-bold text-accent select-none">
            MB
          </div>
        </motion.div>

        {/* bio */}
        <motion.div variants={fadeUp} className="font-sans text-text-primary space-y-4">
          <p>
            안녕하세요, <strong className="text-text-bright">만보</strong>입니다.
            ROS2 기반 로봇 시스템과 Computer Vision 파이프라인을 설계하고,
            Edge 디바이스에서 실시간으로 동작하는 AI 추론 환경을 구축하는 엔지니어입니다.
          </p>
          <p>
            축산 AI 분석 프로젝트에서 <span className="text-accent">실시간 객체 감지 파이프라인</span>을 구축하며,
            YOLOv8과 TensorRT를 활용한 추론 최적화를 경험했습니다.
            Linux 시스템 위에서 <span className="text-accent">Docker 컨테이너화된 AI 추론 환경</span>을 설계하고
            운영한 경험이 있습니다.
          </p>
          <p className="text-text-muted">
            현재는 Edge AI와 Physical AI 분야를 깊이 학습하며,
            로봇이 실제 환경에서 지능적으로 동작할 수 있는 시스템을 만드는 데 집중하고 있습니다.
          </p>
        </motion.div>
      </motion.div>

      {/* stats counters */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 py-8 border-t border-b border-border"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        {stats.map((s) => (
          <Counter key={s.label} {...s} trigger={isVisible} />
        ))}
      </motion.div>
    </section>
  )
}
