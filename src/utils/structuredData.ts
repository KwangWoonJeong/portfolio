export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '만보',
    jobTitle: 'Computer Vision & Physical AI Engineer',
    url: 'https://manbo.dev',
    sameAs: ['https://github.com/manbo', 'https://linkedin.com/in/manbo'],
  }
}

export function creativeWorkSchema(project: {
  title: string
  subtitle: string
  slug: string
  tags: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.subtitle,
    url: `https://manbo.dev/projects/${project.slug}`,
    keywords: project.tags.join(', '),
    author: { '@type': 'Person', name: '만보' },
  }
}
