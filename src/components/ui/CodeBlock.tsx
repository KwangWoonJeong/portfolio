interface Props {
  code: string
  language: string
  title: string
}

export default function CodeBlock({ code, title }: Props) {
  const lines = code.split('\n')

  return (
    <div className="rounded-lg border border-border overflow-hidden shadow-lg">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-hover">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-yellow" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 text-xs font-mono text-text-muted">{title}</span>
      </div>

      {/* code */}
      <div className="overflow-x-auto bg-[#010409] p-4">
        <table className="border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="leading-relaxed">
                <td className="pr-4 text-right text-xs font-mono text-text-muted select-none align-top w-8 opacity-50">
                  {i + 1}
                </td>
                <td className="text-sm font-mono whitespace-pre text-text-primary">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
