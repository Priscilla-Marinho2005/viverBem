import { FiChevronDown, FiSearch } from 'react-icons/fi'
import { HERO_BG_IMAGE } from '../constants/background'

function SearchField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <button
      type="button"
      className="group flex w-full min-w-0 flex-col items-start gap-0.5 px-4 py-3.5 text-left lg:flex-1 lg:px-5 lg:py-4"
    >
      <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase sm:text-xs">
        {label}
      </span>
      <span className="flex w-full items-center justify-between gap-2 text-sm font-medium text-primary sm:text-base">
        <span className="truncate">{value}</span>
        <FiChevronDown className="size-4 shrink-0 text-neutral-400 transition group-hover:text-primary" />
      </span>
    </button>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-x-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/85 via-primary/40 to-primary/80"
        aria-hidden
      />

      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col items-center justify-center px-4 py-6 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-8 sm:px-6 sm:py-8 sm:pt-28">
        <div className="w-full min-w-0 max-w-4xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/25 sm:rounded-2xl lg:rounded-full">
            <div className="flex flex-col lg:flex-row lg:items-stretch">
              <div className="flex min-w-0 flex-col divide-y divide-neutral-200 lg:flex-1 lg:flex-row lg:divide-x lg:divide-y-0">
                <SearchField label="Cidade" value="Selecione a cidade" />
                <SearchField label="Metragem" value="Qualquer metragem" />
                <SearchField label="Quartos" value="Qualquer quantidade" />
              </div>
              <button
                type="button"
                className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-primary/90 lg:w-auto lg:rounded-r-full lg:px-8 lg:py-0"
              >
                <FiSearch className="size-5 shrink-0" aria-hidden />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
