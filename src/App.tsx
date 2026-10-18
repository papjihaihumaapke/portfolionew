import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'

// Home ships in the main bundle (it is the usual landing page); every other route is its own chunk.
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })))
const CaseStudy = lazy(() => import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudy })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Resume = lazy(() => import('./pages/Resume').then((m) => ({ default: m.Resume })))
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
