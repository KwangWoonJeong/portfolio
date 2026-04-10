import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1>Blog: {slug}</h1>
    </div>
  )
}
