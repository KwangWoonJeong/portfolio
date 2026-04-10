import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1>Project: {slug}</h1>
    </div>
  )
}
