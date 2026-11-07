const DEFAULT_DURATION_MS = 780

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function headerScrollOffset(): number {
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 0
}

let activeScroll = 0

export function smoothScrollToY(targetY: number, durationMs = DEFAULT_DURATION_MS) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 2) return

  const runId = ++activeScroll
  const startTime = performance.now()

  function frame(now: number) {
    if (runId !== activeScroll) return
    const elapsed = now - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}

export function scrollToTop(durationMs?: number) {
  smoothScrollToY(0, durationMs)
}

export function scrollToElementById(id: string, durationMs?: number) {
  const el = document.getElementById(id)
  if (!el) return false
  const y =
    el.getBoundingClientRect().top + window.scrollY - headerScrollOffset()
  smoothScrollToY(Math.max(0, y), durationMs)
  return true
}

export function scrollToHashWhenReady(
  id: string,
  maxFrames = 48,
  durationMs?: number,
) {
  let frames = 0
  const attempt = () => {
    if (scrollToElementById(id, durationMs)) return
    if (++frames < maxFrames) requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}
