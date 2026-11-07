import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade'
type RevealWhen = 'scroll' | 'mount'

const HIDDEN_OFFSET: Record<Exclude<RevealVariant, 'fade'>, string> = {
  up: 'translate-y-7',
  down: '-translate-y-7',
  left: 'translate-x-7',
  right: '-translate-x-7',
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  when?: RevealWhen
  variant?: RevealVariant
  threshold?: number
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  when = 'scroll',
  variant = 'up',
  threshold = 0.14,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisible(true)
      return
    }

    if (when === 'mount') {
      const t = window.setTimeout(() => setVisible(true), delay)
      return () => window.clearTimeout(t)
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [when, delay, threshold])

  const offset = variant === 'fade' ? '' : HIDDEN_OFFSET[variant]
  const motion = visible
    ? 'opacity-100 translate-x-0 translate-y-0'
    : `opacity-0 ${offset}`

  const style: CSSProperties | undefined =
    visible && delay > 0 && when === 'scroll'
      ? { transitionDelay: `${delay}ms` }
      : undefined

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:transition-none ${motion} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
