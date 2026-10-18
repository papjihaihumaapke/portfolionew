import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import {
  AnimatePresence,
  motion,
  Reorder,
  useAnimate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import {
  Check,
  GripVertical,
  Play,
  RefreshCw,
  X,
} from 'lucide-react'
import { cn } from '../../lib/utils'

/* -------------------------------------------------------------------------- */
/*  Shared stage wrapper                                                       */
/* -------------------------------------------------------------------------- */

export type DemoStageProps = {
  label: string
  caption?: string
  dark?: boolean
  tall?: boolean
  children: ReactNode
}

export function DemoStage({ label, caption, dark, tall, children }: DemoStageProps) {
  return (
    <div className="border border-border overflow-hidden bg-bg">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <span className="font-body text-[11px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-accent" />
        </span>
      </div>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden p-8',
          tall ? 'min-h-[320px]' : 'min-h-[220px]',
          dark ? 'bg-[#0d0d0d]' : 'bg-white',
        )}
      >
        {children}
      </div>
      {caption && (
        <div className="border-t border-border bg-surface px-4 py-2 font-body text-[12px] text-muted">
          {caption}
        </div>
      )}
    </div>
  )
}

export function DemoGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>
}

const MUSIFY_GREEN = '#1DB954'

/* ========================================================================== */
/*  MUSIFY MOTION SYSTEM, signature interactions                             */
/* ========================================================================== */

/* Ambient "breathing" gradient orbs (repeat: -1, yoyo) --------------------- */
export function AuraOrbs() {
  const orbs = [
    { c: MUSIFY_GREEN, x: '-10%', y: '-10%', s: 260, d: 0 },
    { c: '#2de07a', x: '55%', y: '10%', s: 220, d: 1.5 },
    { c: '#0e7a38', x: '25%', y: '45%', s: 300, d: 0.8 },
  ]
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: o.s,
            height: o.s,
            left: o.x,
            top: o.y,
            background: o.c,
            filter: 'blur(70px)',
            opacity: 0.55,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 40, -25, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: o.d,
          }}
        />
      ))}
      <div className="relative z-10 text-center">
        <div className="font-display text-[40px] font-extrabold leading-[0.9] text-white">
          Ambient
          <br />
          Motion
        </div>
      </div>
    </div>
  )
}

/* Magnetic button, physically tracks the cursor (Fitts's Law) ------------- */
export function MagneticButton({ label = 'Get Started' }: { label?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14 })
  const sy = useSpring(y, { stiffness: 220, damping: 14 })

  function onMove(e: ReactMouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, background: MUSIFY_GREEN }}
      className="rounded-full px-10 py-4 font-body text-[15px] font-semibold text-black shadow-[0_0_40px_-8px_rgba(29,185,84,0.7)]"
    >
      {label}
    </motion.button>
  )
}

/* Staggered entry, "the soundcheck" (stagger 0.1) ------------------------- */
export function StaggeredEntry() {
  const [key, setKey] = useState(0)
  const bars = [42, 78, 120, 64, 96, 50, 110]
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        key={key}
        className="flex items-end gap-2"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-4 rounded-t-sm"
            style={{ height: h, background: MUSIFY_GREEN }}
            variants={{
              hidden: { scaleY: 0, opacity: 0, transformOrigin: 'bottom' },
              show: { scaleY: 1, opacity: 1 },
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
          />
        ))}
      </motion.div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.14em] text-white/70 hover:text-white"
      >
        <RefreshCw size={13} /> Replay
      </button>
    </div>
  )
}

/* Content card, hover choreography (scale + overlay + icon spring) -------- */
export function ContentCardHover() {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative h-[240px] w-[200px] cursor-pointer overflow-hidden rounded-xl"
    >
      <motion.img
        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
        alt="Artist"
        className="h-full w-full object-cover"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/40"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="flex h-14 w-14 items-center justify-center rounded-full text-black"
          style={{ background: MUSIFY_GREEN }}
          variants={{ rest: { y: 40, scale: 0.8, opacity: 0 }, hover: { y: 0, scale: 1, opacity: 1 } }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.4, delay: 0.05 }}
        >
          <Play size={20} fill="currentColor" />
        </motion.span>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <div className="font-body text-[13px] font-semibold text-white">Live Set 001</div>
        <div className="font-body text-[11px] text-white/60">Hover to preview</div>
      </div>
    </motion.div>
  )
}

/* Curtain reveal preloader ------------------------------------------------- */
export function CurtainReveal() {
  const [scope, animate] = useAnimate()
  const [busy, setBusy] = useState(false)

  async function play() {
    if (busy) return
    setBusy(true)
    await animate('.curtain', { y: '0%' }, { duration: 0 })
    await animate('.loader-text', { opacity: 1, y: 0 }, { duration: 0.3 })
    await new Promise((r) => setTimeout(r, 900))
    await animate('.loader-text', { opacity: 0, y: -30 }, { duration: 0.4 })
    await animate('.curtain', { y: '-100%' }, { duration: 1.1, ease: [0.76, 0, 0.24, 1] })
    setBusy(false)
  }

  return (
    <div ref={scope} className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-lg">
      <div className="text-center">
        <div className="font-display text-[26px] font-bold text-white/90">Musify</div>
        <div className="font-body text-[12px] text-white/40">The stage is set.</div>
      </div>
      <div
        className="curtain absolute inset-0 flex flex-col items-center justify-center bg-black"
        style={{ transform: 'translateY(0%)' }}
      >
        <div className="flex items-end gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-2 rounded-sm"
              style={{ background: MUSIFY_GREEN }}
              animate={{ height: [8, 26, 8] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="loader-text mt-4 font-body text-[12px] uppercase tracking-[0.2em]" style={{ color: MUSIFY_GREEN }}>
          Tuning in…
        </div>
      </div>
      <button
        onClick={play}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.12em] text-white/70 hover:border-white/50 hover:text-white"
      >
        <RefreshCw size={12} /> Replay
      </button>
    </div>
  )
}

/* ========================================================================== */
/*  PURPOSEFUL MOTION, component library (8 micro-interactions)              */
/* ========================================================================== */

/* 1. Loader to 1s linear loop ----------------------------------------------- */
export function LoaderDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.span
        className="block h-12 w-12 rounded-full border-[3px] border-border border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span className="font-body text-[12px] uppercase tracking-[0.14em] text-muted">Working…</span>
    </div>
  )
}

/* 2. Success, circle + check + confetti (0.3 + 0.3 + 1s) ------------------ */
export function SuccessDemo() {
  const [done, setDone] = useState(false)
  const confetti = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <AnimatePresence>
          {done && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-accent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="text-accent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Check size={40} strokeWidth={3} />
              </motion.span>
              {confetti.map((i) => {
                const angle = (i / confetti.length) * Math.PI * 2
                return (
                  <motion.span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{ background: i % 2 ? '#e8470a' : '#ff9a3d' }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: Math.cos(angle) * 52, y: Math.sin(angle) * 52, opacity: [1, 1, 0] }}
                    transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
                  />
                )
              })}
            </>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setDone(false)
          requestAnimationFrame(() => setDone(true))
        }}
        className="border border-text bg-text px-6 py-2.5 font-body text-[13px] font-medium text-white transition hover:bg-accent hover:border-accent"
      >
        Complete order
      </button>
    </div>
  )
}

/* 3. Error / warning to 0.5s shake ------------------------------------------ */
export function ErrorShakeDemo() {
  const [scope, animate] = useAnimate()
  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)

  function submit() {
    if (value.trim()) {
      setErr(false)
      return
    }
    setErr(true)
    animate(scope.current, { x: [0, -8, 8, -6, 6, 0] }, { duration: 0.5, ease: 'easeInOut' })
  }

  return (
    <div className="w-full max-w-[240px]">
      <div ref={scope}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (e.target.value) setErr(false)
          }}
          placeholder="Password"
          type="password"
          className={cn(
            'w-full border bg-white px-3 py-2.5 font-body text-[14px] outline-none transition-colors',
            err ? 'border-accent' : 'border-border focus:border-text',
          )}
        />
      </div>
      <div className="mt-1 h-4">
        {err && <span className="font-body text-[12px] text-accent">Field can’t be empty.</span>}
      </div>
      <button
        onClick={submit}
        className="mt-1 w-full border border-text bg-text py-2.5 font-body text-[13px] font-medium text-white transition hover:bg-accent hover:border-accent"
      >
        Log in
      </button>
    </div>
  )
}

/* 4. Toggle switch to 0.3s ease slide --------------------------------------- */
export function ToggleDemo() {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setOn((v) => !v)}
        className={cn(
          'flex h-9 w-16 items-center rounded-full p-1 transition-colors duration-300',
          on ? 'bg-accent' : 'bg-border',
        )}
        aria-pressed={on}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className={cn('h-7 w-7 rounded-full bg-white shadow', on ? 'ml-auto' : '')}
        />
      </button>
      <span className="font-body text-[12px] uppercase tracking-[0.14em] text-muted">
        {on ? 'On' : 'Off'}
      </span>
    </div>
  )
}

/* 5. Floating input to 0.3s ease -------------------------------------------- */
export function FloatingInputDemo() {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const float = focus || value.length > 0
  return (
    <div className="relative w-full max-w-[240px]">
      <motion.label
        className="pointer-events-none absolute left-3 origin-left font-body text-muted"
        animate={{
          y: float ? -22 : 0,
          scale: float ? 0.82 : 1,
          color: focus ? '#e8470a' : '#6b6b6b',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: 12 }}
      >
        Email address
      </motion.label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border-b-2 border-border bg-transparent px-3 pb-2 pt-3 font-body text-[14px] outline-none transition-colors focus:border-accent"
      />
    </div>
  )
}

/* 6. Expandable card to 0.4s ease ------------------------------------------- */
export function ExpandableCardDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full max-w-[280px] border border-border bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-body text-[14px] font-medium text-text">Order #2140 · Details</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-muted">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 py-3 font-body text-[13px] leading-relaxed text-muted">
              Shipped via TD Worldline. Deposit hold released on return. Estimated arrival Thu, 2 to 4pm.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* 7. Modal transition to 0.5s fade / scale ---------------------------------- */
export function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="border border-text bg-text px-6 py-2.5 font-body text-[13px] font-medium text-white transition hover:bg-accent hover:border-accent"
      >
        Open modal
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute w-[240px] border border-border bg-white p-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between">
                <div className="font-display text-[18px] text-text">Confirm</div>
                <button onClick={() => setOpen(false)} className="text-muted hover:text-text">
                  <X size={16} />
                </button>
              </div>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-muted">
                Focus is trapped by the scrim. Fade + scale keeps context.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full bg-accent py-2 font-body text-[13px] font-medium text-white"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* 8. Drag & drop, reorderable list ---------------------------------------- */
export function DragDropDemo() {
  const [items, setItems] = useState(['Chest day', 'Back day', 'Leg day', 'Rest'])
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems} className="w-full max-w-[240px] space-y-2">
      {items.map((item) => (
        <Reorder.Item
          key={item}
          value={item}
          whileDrag={{ scale: 1.03, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.25)' }}
          className="flex cursor-grab items-center gap-3 border border-border bg-white px-3 py-2.5 font-body text-[14px] text-text active:cursor-grabbing"
        >
          <GripVertical size={15} className="text-muted" />
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}

/* ========================================================================== */
/*  HEALTHY CITY, accessible data-viz                                        */
/* ========================================================================== */

/* Mode-share chart, animated, keyboard-focusable bars --------------------- */
export function ModeShareChart() {
  const [year, setYear] = useState<2013 | 2023>(2023)
  const data = {
    2013: [
      { mode: 'Drive', v: 58, c: '#c65a3a' },
      { mode: 'Transit', v: 20, c: '#2f6d84' },
      { mode: 'Walk', v: 14, c: '#4a9d6e' },
      { mode: 'Bike', v: 8, c: '#e0a23a' },
    ],
    2023: [
      { mode: 'Drive', v: 44, c: '#c65a3a' },
      { mode: 'Transit', v: 26, c: '#2f6d84' },
      { mode: 'Walk', v: 18, c: '#4a9d6e' },
      { mode: 'Bike', v: 12, c: '#e0a23a' },
    ],
  }
  const rows = data[year]
  const max = 60
  return (
    <div className="w-full max-w-[360px]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-body text-[13px] font-semibold text-text">Mode share</div>
          <div className="font-body text-[11px] text-muted">Trips to work · Vancouver</div>
        </div>
        <div className="flex overflow-hidden rounded-full border border-border" role="group" aria-label="Select year">
          {[2013, 2023].map((y) => (
            <button
              key={y}
              onClick={() => setYear(y as 2013 | 2023)}
              aria-pressed={year === y}
              className={cn(
                'px-3 py-1 font-body text-[12px] transition-colors',
                year === y ? 'bg-text text-white' : 'text-muted hover:text-text',
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.mode} tabIndex={0} className="group outline-none" aria-label={`${r.mode}: ${r.v} percent`}>
            <div className="mb-1 flex justify-between font-body text-[12px]">
              <span className="text-text">{r.mode}</span>
              <span className="text-muted tabular-nums group-focus:text-accent">{r.v}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-surface ring-offset-2 group-focus:ring-2 group-focus:ring-accent">
              <motion.div
                className="h-full rounded-full"
                style={{ background: r.c }}
                animate={{ width: `${(r.v / max) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 font-body text-[11px] text-muted">
        Toggle the year, bars animate. Each bar is keyboard-focusable with an accessible label.
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Registry, used by CaseStudy + Design System pages                        */
/* -------------------------------------------------------------------------- */

export type DemoEntry = {
  label: string
  caption: string
  dark?: boolean
  tall?: boolean
  render: () => ReactNode
}

export const musifyDemos: DemoEntry[] = [
  { label: 'Ambient life · repeat -1', caption: 'Aura orbs breathe continuously so the interface is never dead.', dark: true, tall: true, render: () => <AuraOrbs /> },
  { label: 'Affordance · magnetic', caption: 'The button tracks the cursor (×0.35), tactile before the click.', dark: true, tall: true, render: () => <MagneticButton /> },
  { label: 'Curtain reveal · preloader', caption: 'A stage curtain masks load, then slides up on power4.inOut.', dark: true, tall: true, render: () => <CurtainReveal /> },
  { label: 'Staggered entry · 0.1s', caption: '“The soundcheck”, elements enter in sequence, never at once.', dark: true, tall: true, render: () => <StaggeredEntry /> },
  { label: 'Content card · choreography', caption: 'Hover: image scales, overlay fades, play icon springs (back.out).', dark: true, tall: true, render: () => <ContentCardHover /> },
]

export const dashboardDemos: DemoEntry[] = [
  { label: 'Accessible data-viz · Chart', caption: 'Animated, keyboard-focusable bars with year toggle and labels.', tall: true, render: () => <ModeShareChart /> },
]

export const libraryDemos: DemoEntry[] = [
  { label: 'Loader · 1s linear loop', caption: 'Signals a background task is running.', render: () => <LoaderDemo /> },
  { label: 'Success · 0.3 + 0.3 + 1s', caption: 'Circle → check → confetti. Celebrates completion.', render: () => <SuccessDemo /> },
  { label: 'Error · 0.5s shake', caption: 'Draws the eye to invalid input instantly.', render: () => <ErrorShakeDemo /> },
  { label: 'Toggle · 0.3s slide', caption: 'Smooth, legible ON / OFF state change.', render: () => <ToggleDemo /> },
  { label: 'Floating input · 0.3s', caption: 'Label lifts on focus, context stays visible while typing.', render: () => <FloatingInputDemo /> },
  { label: 'Expandable card · 0.4s', caption: 'Reveals hidden detail without losing place.', render: () => <ExpandableCardDemo /> },
  { label: 'Modal · 0.5s fade/scale', caption: 'Fade + scale focuses attention; scrim traps it.', render: () => <ModalDemo /> },
  { label: 'Drag & drop · spring', caption: 'Reorder with smooth transforms, try dragging.', render: () => <DragDropDemo /> },
]

export const demoRegistry: Record<string, DemoEntry[]> = {
  musify: musifyDemos,
  library: libraryDemos,
  dashboard: dashboardDemos,
}

export type DemoKey = keyof typeof demoRegistry
