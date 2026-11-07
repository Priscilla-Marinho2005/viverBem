import { Link } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtub, PiCar, PiCornersOut } from 'react-icons/pi'
import type { IconType } from 'react-icons'
import type { Property } from '../data/properties'

function PropertyStat({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType
  label: string
  value: string | number
}) {
  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-center gap-0.5 px-0.5 py-2.5 text-neutral-700 sm:gap-1.5 sm:px-1 sm:py-3.5"
      title={label}
    >
      <Icon
        className="size-4 shrink-0 text-primary/85 sm:size-5"
        aria-hidden
      />
      <span className="text-[11px] font-medium tabular-nums sm:text-sm">
        {value}
      </span>
    </div>
  )
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-primary/5 ring-1 ring-neutral-200/80">
      <Link
        to={`/imovel/${property.id}`}
        className="relative block aspect-4/3 overflow-hidden bg-neutral-100"
      >
        <img
          src={property.image}
          alt={property.title}
          className="size-full object-cover object-center transition duration-300 hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs text-neutral-500 sm:text-sm">A partir de</p>
          <p className="text-lg font-semibold text-primary">{property.price}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-neutral-800">
            {property.title}
          </h3>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <FiMapPin className="size-4 shrink-0 text-accent" aria-hidden />
          {property.city}
        </p>
      </div>
      <div className="mt-auto flex w-full shrink-0 flex-col">
        <div
          className="flex divide-x divide-neutral-200 border-y border-neutral-200"
          aria-label="Características do imóvel"
        >
          <PropertyStat
            icon={IoBedOutline}
            label="Quartos"
            value={property.bedrooms}
          />
          <PropertyStat
            icon={PiBathtub}
            label="Banheiros"
            value={property.bathrooms}
          />
          <PropertyStat icon={PiCar} label="Vagas" value={property.parking} />
          <PropertyStat
            icon={PiCornersOut}
            label="Área"
            value={`${property.areaSqm} m²`}
          />
        </div>
        <div className="border-t border-neutral-100 p-4 sm:p-5">
          <Link
            to={`/imovel/${property.id}`}
            className="block w-full rounded-sm border border-primary/20 bg-white py-2.5 text-center text-xs font-bold tracking-wider text-primary uppercase transition hover:border-primary hover:bg-primary hover:text-white sm:text-sm"
          >
            Ver mais
          </Link>
        </div>
      </div>
    </article>
  )
}
