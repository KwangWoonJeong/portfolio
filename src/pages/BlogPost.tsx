import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import posts from '../data/posts'
import Badge from '../components/ui/Badge'
import GlowButton from '../components/ui/GlowButton'
import PageTransition from '../components/animations/PageTransition'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="mb-4">404</h1>
        <p className="text-text-muted font-sans mb-6">포스트를 찾을 수 없습니다.</p>
        <GlowButton onClick={() => navigate('/', { state: { scrollTo: 'blog' } })}>
          $ cd ~/blog/
        </GlowButton>
      </div>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | 만보 Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | 만보 Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <link rel="canonical" href={`https://manbo.dev/blog/${post.slug}`} />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          to="/"
          state={{ scrollTo: 'blog' }}
          className="inline-block font-mono text-sm text-accent-green hover:underline mb-6"
        >
          $ cd ..
        </Link>

        <h1 className="mb-3">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-sm text-text-muted">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Coming Soon */}
        <article className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="font-mono text-accent-yellow text-lg mb-2">Coming Soon</p>
          <p className="font-sans text-text-muted">이 포스트는 아직 작성 중입니다.</p>
        </article>

        <div className="mt-10 pt-6 border-t border-border">
          <Link
            to="/"
            state={{ scrollTo: 'blog' }}
            className="font-mono text-sm text-accent-green hover:underline"
          >
            $ cd ~/blog/
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
