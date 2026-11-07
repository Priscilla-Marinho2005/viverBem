const PRINCIPLES = ['Transparência', 'Curadoria', 'Atendimento próximo'] as const

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="bg-primary py-16 text-white sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-355 px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Sobre nós
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
          Imobiliária com foco em pessoas e no mercado de Pernambuco
        </h2>
        <div className="mt-6 h-px w-10 bg-accent" aria-hidden />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
          A Viver Bem acompanha compras com clareza e cuidado —
          do primeiro contato à entrega das chaves.
        </p>
        <ul className="mt-10 flex flex-col gap-2 text-sm text-white/50 sm:hidden">
          {PRINCIPLES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-10 hidden text-sm tracking-wide text-white/50 sm:block">
          {PRINCIPLES.join('  ·  ')}
        </p>
      </div>
    </section>
  )
}
