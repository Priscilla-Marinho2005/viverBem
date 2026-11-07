import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PROPERTIES } from '../data/properties'
import { useItemsPerPage } from '../hooks/useItemsPerPage'
import PropertyCard from './PropertyCard'
import Reveal from './Reveal'

const SWIPE_THRESHOLD_PX = 48

export default function PropertiesSection() {
  const itemsPerPage = useItemsPerPage()
  const totalPages = Math.max(1, Math.ceil(PROPERTIES.length / itemsPerPage))
  const [page, setPage] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const dragOffsetRef = useRef(0)
  const swipeAxis = useRef<'none' | 'x' | 'y'>('none')

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1))
  }, [totalPages])

  const canGoLeft = page > 0
  const canGoRight = page < totalPages - 1

  const goTo = (direction: 'left' | 'right') => {
    setPage((current) => {
      if (direction === 'left') return Math.max(0, current - 1)
      return Math.min(totalPages - 1, current + 1)
    })
  }

  function applyDragOffset(deltaX: number) {
    let offset = deltaX
    if ((page === 0 && deltaX > 0) || (page === totalPages - 1 && deltaX < 0)) {
      offset = deltaX * 0.3
    }
    dragOffsetRef.current = offset
    setDragOffset(offset)
  }

  function endSwipe() {
    const offset = dragOffsetRef.current
    if (offset < -SWIPE_THRESHOLD_PX && canGoRight) goTo('right')
    else if (offset > SWIPE_THRESHOLD_PX && canGoLeft) goTo('left')

    swipeAxis.current = 'none'
    setIsDragging(false)
    dragOffsetRef.current = 0
    setDragOffset(0)
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length !== 1) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    swipeAxis.current = 'none'
    setIsDragging(true)
    dragOffsetRef.current = 0
    setDragOffset(0)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length !== 1) return
    const deltaX = e.touches[0].clientX - touchStartX.current
    const deltaY = e.touches[0].clientY - touchStartY.current

    if (swipeAxis.current === 'none') {
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      if (absX < 8 && absY < 8) return
      swipeAxis.current = absX > absY ? 'x' : 'y'
    }

    if (swipeAxis.current !== 'x') return
    applyDragOffset(deltaX)
  }

  function handleTouchEnd() {
    if (swipeAxis.current === 'x') endSwipe()
    else {
      setIsDragging(false)
      swipeAxis.current = 'none'
    }
  }

  return (
    <section
      id="imoveis"
      className="bg-surface py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-355 px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-end min-[480px]:justify-between sm:mb-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Portfólio
            </p>
            <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
              Imóveis em destaque
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600 sm:text-base">
              Selecionamos as melhores oportunidades para você encontrar o
              imóvel ideal.
            </p>
          </div>
          <div className="flex shrink-0 gap-2 self-start min-[480px]:self-auto">
            <button
              type="button"
              onClick={() => goTo('left')}
              disabled={!canGoLeft}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary transition hover:border-primary/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              aria-label="Imóveis anteriores"
            >
              <FiChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo('right')}
              disabled={!canGoRight}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary transition hover:border-primary/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              aria-label="Próximos imóveis"
            >
              <FiChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={100}>
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div
            className={`flex ease-out ${isDragging ? 'transition-none' : 'transition-transform duration-500'}`}
            style={{
              transform: `translateX(calc(-${page * 100}% + ${dragOffset}px))`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => {
              const items = PROPERTIES.slice(
                pageIndex * itemsPerPage,
                pageIndex * itemsPerPage + itemsPerPage,
              )
              return (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4"
                >
                  {items.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
