import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiMapPin } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtub, PiCar, PiCornersOut } from 'react-icons/pi'
import { getPropertyById } from '../data/properties'
import { whatsAppUrlWithText } from '../constants/contact'

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const property = id ? getPropertyById(id) : undefined
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    setActiveImage(0)
  }, [id])

  if (!property) {
    return (
      <main className="bg-surface px-4 pb-16 pt-28 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-primary">Imóvel não encontrado</h1>
        <Link
          to="/#imoveis"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
        >
          <FiArrowLeft className="size-4" />
          Voltar aos imóveis
        </Link>
      </main>
    )
  }

  const whatsappMessage = [
    'Olá! Tenho interesse no imóvel do site:',
    '',
    property.title,
    property.city,
    `A partir de ${property.price}`,
  ].join('\n')

  return (
    <main className="bg-surface pb-16 pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-28">
      <div className="mx-auto w-full max-w-355 px-4 sm:px-6 lg:px-8">
        <Link
          to="/#imoveis"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-accent"
        >
          <FiArrowLeft className="size-4" aria-hidden />
          Voltar aos imóveis
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="min-w-0 lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80">
              <img
                src={property.images[activeImage] ?? property.image}
                alt={`${property.title} — foto ${activeImage + 1}`}
                className="aspect-4/3 w-full object-cover sm:aspect-16/10"
              />
            </div>
            {property.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {property.images.map((src, index) => (
                  <button
                    key={src + index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`size-16 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:size-20 ${
                      activeImage === index
                        ? 'ring-accent'
                        : 'ring-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0 lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Imóvel em destaque
            </p>
            <h1 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
              <FiMapPin className="size-4 shrink-0 text-accent" aria-hidden />
              {property.city}
            </p>
            <p className="mt-6 text-sm text-neutral-500">Valor a partir de</p>
            <p className="text-2xl font-bold text-primary sm:text-3xl">
              {property.price}
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <li className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm ring-1 ring-neutral-200/80">
                <IoBedOutline className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-xs text-neutral-500">Quartos</span>
                  {property.bedrooms}
                </span>
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm ring-1 ring-neutral-200/80">
                <PiBathtub className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-xs text-neutral-500">
                    Banheiros
                  </span>
                  {property.bathrooms}
                </span>
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm ring-1 ring-neutral-200/80">
                <PiCar className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-xs text-neutral-500">Vagas</span>
                  {property.parking}
                </span>
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm ring-1 ring-neutral-200/80">
                <PiCornersOut className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-xs text-neutral-500">
                    Metragem
                  </span>
                  {property.areaSqm} m²
                </span>
              </li>
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
              {property.description}
            </p>

            <a
              href={whatsAppUrlWithText(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-primary/90 sm:w-auto"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <section className="mt-14 sm:mt-16" aria-labelledby="ficha-tecnica">
          <h2
            id="ficha-tecnica"
            className="text-xl font-bold text-primary sm:text-2xl"
          >
            Ficha técnica
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/80">
            <dl className="divide-y divide-neutral-100">
              {property.technicalSheet.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-4 py-3.5 sm:grid-cols-2 sm:gap-4 sm:px-6"
                >
                  <dt className="text-sm font-semibold text-primary">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-neutral-700">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-14 sm:mt-16" aria-labelledby="plantas">
          <h2
            id="plantas"
            className="text-xl font-bold text-primary sm:text-2xl"
          >
            Plantas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {property.floorPlans.map((plan) => (
              <figure
                key={plan.label}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/80"
              >
                <img
                  src={plan.image}
                  alt={plan.label}
                  className="aspect-4/3 w-full bg-neutral-100 object-cover"
                  loading="lazy"
                />
                <figcaption className="border-t border-neutral-100 px-4 py-3 text-sm font-medium text-primary">
                  {plan.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
