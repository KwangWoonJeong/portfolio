import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-primary text-text-primary flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-surface focus:text-accent focus:border focus:border-accent focus:rounded focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
