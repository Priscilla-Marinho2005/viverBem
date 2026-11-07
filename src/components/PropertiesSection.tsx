import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PROPERTIES } from '../data/properties'
import { useItemsPerPage } from '../hooks/useItemsPerPage'
import PropertyCard from './PropertyCard'

export default function PropertiesSection() {
  const itemsPerPage = useItemsPerPage()
  const totalPages = Math.max(1, Math.ceil(PROPERTIES.length / itemsPerPage))
  const [page, setPage] = useState(0)

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

  return (
    <section
      id="imoveis"
      className="bg-surface py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-355 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-end min-[480px]:justify-between sm:mb-10">
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
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
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
      </div>
    </section>
  )
}
