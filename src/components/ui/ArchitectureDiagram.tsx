interface Node {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

interface Edge {
  from: string
  to: string
}

interface Props {
  mermaid: string
}

/**
 * Parses a simplified Mermaid graph (LR or TB) and renders as SVG.
 */
function parseMermaid(code: string): { nodes: Node[]; edges: Edge[]; direction: 'LR' | 'TB' } {
  const dir = code.includes('graph TB') ? 'TB' : 'LR'
  const lines = code
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.includes('-->'))

  const nodeMap = new Map<string, string>()
  const edges: Edge[] = []

  for (const line of lines) {
    // handle decision nodes: D{Controller}
    const parts = line.split('-->')
    for (const part of parts) {
      const p = part.trim()
      // Match: A[Label], A(Label), A{Label}, or plain A
      const m = p.match(/^([A-Za-z0-9_]+)[\[({](.+?)[\])}]$/)
      if (m) {
        nodeMap.set(m[1], m[2])
      } else {
        const plain = p.match(/^([A-Za-z0-9_]+)$/)
        if (plain && !nodeMap.has(plain[1])) {
          nodeMap.set(plain[1], plain[1])
        }
      }
    }

    // edges between consecutive parts
    for (let i = 0; i < parts.length - 1; i++) {
      const fromId = parts[i].trim().match(/^([A-Za-z0-9_]+)/)?.[1]
      const toId = parts[i + 1].trim().match(/^([A-Za-z0-9_]+)/)?.[1]
      if (fromId && toId) {
        edges.push({ from: fromId, to: toId })
      }
    }
  }

  // deduplicate edges
  const edgeSet = new Set(edges.map((e) => `${e.from}-${e.to}`))
  const uniqueEdges = [...edgeSet].map((s) => {
    const [from, to] = s.split('-')
    return { from, to }
  })

  // layout nodes
  const ids = [...nodeMap.keys()]
  const nodeW = 160
  const nodeH = 44
  const gapX = dir === 'LR' ? 50 : 0
  const gapY = dir === 'TB' ? 40 : 0

  // Build levels via BFS
  const levels = new Map<string, number>()
  const children = new Map<string, string[]>()
  for (const id of ids) children.set(id, [])
  for (const e of uniqueEdges) children.get(e.from)?.push(e.to)

  // find roots (no incoming edges)
  const hasIncoming = new Set(uniqueEdges.map((e) => e.to))
  const roots = ids.filter((id) => !hasIncoming.has(id))
  if (roots.length === 0 && ids.length > 0) roots.push(ids[0])

  const queue = [...roots]
  for (const r of roots) levels.set(r, 0)
  while (queue.length > 0) {
    const cur = queue.shift()!
    const lvl = levels.get(cur) ?? 0
    for (const c of children.get(cur) ?? []) {
      if (!levels.has(c) || levels.get(c)! < lvl + 1) {
        levels.set(c, lvl + 1)
        queue.push(c)
      }
    }
  }
  // ensure all nodes have a level
  for (const id of ids) {
    if (!levels.has(id)) levels.set(id, 0)
  }

  // group by level
  const maxLevel = Math.max(...[...levels.values()], 0)
  const levelGroups: string[][] = Array.from({ length: maxLevel + 1 }, () => [])
  for (const id of ids) levelGroups[levels.get(id)!].push(id)

  const nodes: Node[] = []
  for (let lvl = 0; lvl <= maxLevel; lvl++) {
    const group = levelGroups[lvl]
    for (let i = 0; i < group.length; i++) {
      const id = group[i]
      let x: number, y: number
      if (dir === 'LR') {
        x = lvl * (nodeW + gapX)
        y = i * (nodeH + 24) + (levelGroups[lvl].length === 1 ? 40 : 0)
      } else {
        x = i * (nodeW + 24) - ((group.length - 1) * (nodeW + 24)) / 2 + 300
        y = lvl * (nodeH + gapY)
      }
      nodes.push({ id, label: nodeMap.get(id) ?? id, x, y, w: nodeW, h: nodeH })
    }
  }

  return { nodes, edges: uniqueEdges, direction: dir }
}

export default function ArchitectureDiagram({ mermaid }: Props) {
  const { nodes, edges } = parseMermaid(mermaid)

  if (nodes.length === 0) return null

  const padding = 32
  const maxX = Math.max(...nodes.map((n) => n.x + n.w)) + padding
  const maxY = Math.max(...nodes.map((n) => n.y + n.h)) + padding

  const nodeById = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface p-4">
      <svg
        viewBox={`-${padding} -${padding} ${maxX + padding} ${maxY + padding}`}
        className="w-full"
        style={{ minHeight: 160, maxHeight: 400 }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--accent)" />
          </marker>
        </defs>

        {/* edges */}
        {edges.map((e) => {
          const from = nodeById.get(e.from)
          const to = nodeById.get(e.to)
          if (!from || !to) return null
          const x1 = from.x + from.w
          const y1 = from.y + from.h / 2
          const x2 = to.x
          const y2 = to.y + to.h / 2
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--accent)"
              strokeWidth={1.5}
              markerEnd="url(#arrowhead)"
              opacity={0.6}
            />
          )
        })}

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={6}
              fill="var(--bg-surface-hover)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--text-primary)"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
