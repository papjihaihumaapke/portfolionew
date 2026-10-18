import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import { Writable } from 'node:stream'
import App from './App'
import { projects } from './data/projects'

/** Every URL that gets its own pre-rendered HTML file. */
export const routes = ['/', '/work', '/graphic-design', '/gallery', '/about', '/resume', '/contact', ...projects.map((p) => `/work/${p.slug}`)]
export { projects }

/** Renders a route to HTML, waiting for lazy routes so the output is the full page, not a shell. */
export function render(url: string): Promise<{ html: string; head: string }> {
  const helmetContext: { helmet?: HelmetServerState } = {}
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
      final(cb) {
        const h = helmetContext.helmet!
        const head = [h.title, h.priority, h.meta, h.link, h.script].map((x) => x.toString()).join('\n    ')
        resolve({ html, head: head })
        cb()
      },
    })
    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink)
        },
        onShellError: reject,
        onError(err) {
          console.error(`render ${url}:`, err)
        },
      },
    )
  })
}
