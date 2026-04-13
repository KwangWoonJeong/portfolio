import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import posts from '../data/posts'
import Badge from '../components/ui/Badge'
import GlowButton from '../components/ui/GlowButton'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="mb-4">404</h1>
        <p className="text-text-muted font-sans mb-6">포스트를 찾을 수 없습니다.</p>
        <Link to="/#blog">
          <GlowButton>$ cd ~/blog/</GlowButton>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 py-20"
    >
      <Link
        to="/#blog"
        className="inline-block font-mono text-sm text-accent-green hover:underline mb-6"
      >
        $ cd ..
      </Link>

      <h1 className="mb-3">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-sm text-text-muted">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {post.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="rounded-lg border border-border bg-surface p-12 text-center">
        <p className="font-mono text-accent-yellow text-lg mb-2">Coming Soon</p>
        <p className="font-sans text-text-muted">이 포스트는 아직 작성 중입니다.</p>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <Link
          to="/#blog"
          className="font-mono text-sm text-accent-green hover:underline"
        >
          $ cd ~/blog/
        </Link>
      </div>
    </motion.div>
  )
}
