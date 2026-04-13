export default function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="font-mono text-sm text-accent-green animate-pulse">
        Loading...
      </p>
    </div>
  )
}
