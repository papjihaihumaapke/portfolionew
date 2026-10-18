import type { ReactNode } from 'react'
import {
  DemoGrid,
  DemoStage,
  AuraOrbs,
  ContentCardHover,
  CurtainReveal,
  DragDropDemo,
  ErrorShakeDemo,
  ExpandableCardDemo,
  FloatingInputDemo,
  LoaderDemo,
  MagneticButton,
  ModalDemo,
  ModeShareChart,
  StaggeredEntry,
  SuccessDemo,
  ToggleDemo,
} from '../demos/MotionDemos'

/* -------------------------------------------------------------------------- */
/*  Registry of live demos per study                                         */
/* -------------------------------------------------------------------------- */

type DemoEntry = {
  label: string
  caption: string
  dark?: boolean
  tall?: boolean
  render: () => ReactNode
}

const musifyDemos: DemoEntry[] = [
  { label: 'Ambient life · repeat -1', caption: 'Aura orbs breathe continuously so the interface is never dead.', dark: true, tall: true, render: () => <AuraOrbs /> },
  { label: 'Affordance · magnetic', caption: 'The button tracks the cursor (×0.35), tactile before the click.', dark: true, tall: true, render: () => <MagneticButton /> },
  { label: 'Curtain reveal · preloader', caption: 'A stage curtain masks load, then slides up on power4.inOut.', dark: true, tall: true, render: () => <CurtainReveal /> },
  { label: 'Staggered entry · 0.1s', caption: '“The soundcheck”, elements enter in sequence, never at once.', dark: true, tall: true, render: () => <StaggeredEntry /> },
  { label: 'Content card · choreography', caption: 'Hover: image scales, overlay fades, play icon springs (back.out).', dark: true, tall: true, render: () => <ContentCardHover /> },
]

const dashboardDemos: DemoEntry[] = [
  { label: 'Accessible data-viz · Chart', caption: 'Animated, keyboard-focusable bars with year toggle and labels.', tall: true, render: () => <ModeShareChart /> },
]

const libraryDemos: DemoEntry[] = [
  { label: 'Loader · 1s linear loop', caption: 'Signals a background task is running.', render: () => <LoaderDemo /> },
  { label: 'Success · 0.3 + 0.3 + 1s', caption: 'Circle → check → confetti. Celebrates completion.', render: () => <SuccessDemo /> },
  { label: 'Error · 0.5s shake', caption: 'Draws the eye to invalid input instantly.', render: () => <ErrorShakeDemo /> },
  { label: 'Toggle · 0.3s slide', caption: 'Smooth, legible ON / OFF state change.', render: () => <ToggleDemo /> },
  { label: 'Floating input · 0.3s', caption: 'Label lifts on focus, context stays visible while typing.', render: () => <FloatingInputDemo /> },
  { label: 'Expandable card · 0.4s', caption: 'Reveals hidden detail without losing place.', render: () => <ExpandableCardDemo /> },
  { label: 'Modal · 0.5s fade/scale', caption: 'Fade + scale focuses attention; scrim traps it.', render: () => <ModalDemo /> },
  { label: 'Drag & drop · spring', caption: 'Reorder with smooth transforms, try dragging.', render: () => <DragDropDemo /> },
]

const demoRegistry = {
  musify: musifyDemos,
  library: libraryDemos,
  dashboard: dashboardDemos,
}


export default function Demos({ which }: { which: keyof typeof demoRegistry }) {
  return (
    <DemoGrid>
      {demoRegistry[which].map((d) => (
        <DemoStage key={d.label} label={d.label} caption={d.caption} dark={d.dark} tall={d.tall}>
          {d.render()}
        </DemoStage>
      ))}
    </DemoGrid>
  )
}
