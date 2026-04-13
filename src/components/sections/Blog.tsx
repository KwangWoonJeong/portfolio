import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import Badge from '../ui/Badge'
import SkillBar from '../ui/SkillBar'
import posts from '../../data/posts'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function BlogCard({ post }: { post: (typeof posts)[number] }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="w-full text-left group rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent hover:translate-x-1"
    >
      {/* ls -l style header */}
      <p className="font-mono text-xs text-text-muted mb-2">
        -rw-r--r-- 1 manbo {post.date} {post.readTime}
      </p>
      <p className="font-mono text-sm text-accent-green mb-1">
        {post.slug}.md
      </p>
      <h3 className="text-base font-mono text-text-bright group-hover:text-accent transition-colors mb-2">
        {post.title}
      </h3>
      <p className="font-sans text-sm text-text-muted leading-relaxed mb-3 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <Badge key={t} className="text-[10px] px-1.5 py-0.5">
            {t}
          </Badge>
        ))}
      </div>
    </button>
  )
}

const curriculum = [
  { name: 'Phase 1: Linux Systems', level: 80, description: '시스템 관리, 네트워크, 서비스 운영', active: true },
  { name: 'Phase 2: CV & Deep Learning', level: 0, description: '컴퓨터 비전, 딥러닝 모델 설계 및 트레이닝', active: false },
  { name: 'Phase 3: ROS2 & Physical AI', level: 0, description: '로봇 시스템, 자율주행, 센서 퓨전', active: false },
  { name: 'Phase 4: Edge AI Deployment', level: 0, description: '엣지 배포, 모델 최적화, CI/CD', active: false },
]

export default function Blog() {
  const { ref, isVisible } = useScrollReveal()
  const { ref: ref2, isVisible: isVisible2 } = useScrollReveal()

  return (
    <section id="blog" className="max-w-4xl mx-auto px-6 py-20">
      <div ref={ref}>
        <motion.h2
          className="mb-8"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <span className="text-accent-green">##</span> cat ~/blog/recent.md
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Learning Curriculum Progress */}
      <div ref={ref2} className="mt-16">
        <motion.h3
          className="mb-6"
          initial="hidden"
          animate={isVisible2 ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <span className="text-accent-green">##</span> Learning Curriculum Progress
        </motion.h3>

        <motion.div
          className="space-y-1"
          initial="hidden"
          animate={isVisible2 ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {curriculum.map((phase) => (
            <motion.div
              key={phase.name}
              variants={fadeUp}
              className={phase.active ? '' : 'opacity-50'}
            >
              <SkillBar
                name={phase.active ? `${phase.name}  ← 현재` : phase.name}
                level={phase.level}
                description={phase.description}
                animate={isVisible2}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
