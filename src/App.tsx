import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import LoadingFallback from './components/ui/LoadingFallback'
import Home from './pages/Home'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <BlogPost />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
