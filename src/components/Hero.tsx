import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HERO_BG_IMAGE } from '../constants/background'
import {
  AREA_OPTIONS,
  BEDROOM_OPTIONS,
  CITY_OPTIONS,
} from '../constants/heroFilters'
import FullBleedImage from './FullBleedImage'
import HeroFilterSelect from './HeroFilterSelect'
import Reveal from './Reveal'

type FilterId = 'cidade' | 'metragem' | 'quartos'

export default function Hero() {
  const [openFilter, setOpenFilter] = useState<FilterId | null>(null)
  const [cidade, setCidade] = useState('')
  const [metragem, setMetragem] = useState('')
  const [quartos, setQuartos] = useState('')

  function toggleFilter(id: FilterId, open: boolean) {
    setOpenFilter(open ? id : null)
  }

  return (
    <section className="relative flex min-h-svh flex-col overflow-x-hidden text-white">
      <FullBleedImage src={HERO_BG_IMAGE} priority />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/85 via-primary/40 to-primary/80"
        aria-hidden
      />

      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col items-center justify-center px-4 py-6 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-8 sm:px-6 sm:py-8 sm:pt-28">
        <div className="w-full min-w-0 max-w-4xl">
          <Reveal when="mount" delay={120} variant="up">
          <div className="overflow-hidden rounded-xl bg-primary shadow-2xl shadow-black/25 sm:rounded-2xl lg:rounded-full">
            <div className="flex flex-col lg:flex-row lg:items-stretch">
              <div className="relative z-20 flex min-w-0 flex-col divide-y divide-neutral-200 bg-white lg:flex-1 lg:flex-row lg:divide-x lg:divide-y-0 lg:border-r lg:border-neutral-200/80">
                <HeroFilterSelect
                  label="Cidade"
                  placeholder="Selecione a cidade"
                  options={CITY_OPTIONS}
                  value={cidade}
                  onChange={setCidade}
                  open={openFilter === 'cidade'}
                  onOpenChange={(open) => toggleFilter('cidade', open)}
                />
                <HeroFilterSelect
                  label="Metragem"
                  placeholder="Qualquer metragem"
                  options={AREA_OPTIONS}
                  value={metragem}
                  onChange={setMetragem}
                  open={openFilter === 'metragem'}
                  onOpenChange={(open) => toggleFilter('metragem', open)}
                />
                <HeroFilterSelect
                  label="Quartos"
                  placeholder="Qualquer quantidade"
                  options={BEDROOM_OPTIONS}
                  value={quartos}
                  onChange={setQuartos}
                  open={openFilter === 'quartos'}
                  onOpenChange={(open) => toggleFilter('quartos', open)}
                />
              </div>
              <button
                type="button"
                className="relative z-30 flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none border-0 bg-primary px-6 py-4 text-sm font-bold tracking-wider text-white uppercase outline-none transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary lg:w-auto lg:px-8 lg:py-0"
              >
                <FiSearch className="size-5 shrink-0" aria-hidden />
                Buscar
              </button>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
