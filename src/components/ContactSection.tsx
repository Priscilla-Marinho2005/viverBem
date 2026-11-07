import { type FormEvent, useState } from 'react'
import { HERO_BG_IMAGE } from '../constants/background'
import FullBleedImage from './FullBleedImage'
import Reveal from './Reveal'
import { whatsAppUrlWithText } from '../constants/contact'
import {
  digitsOnlyPhone,
  formatBrazilPhone,
} from '../utils/formatBrazilPhone'

const inputBase =
  'mt-1.5 w-full border-0 border-b-2 border-neutral-300 bg-transparent px-0 py-2.5 text-sm text-primary outline-none transition-colors placeholder:font-light placeholder:text-neutral-400 focus:border-primary'

export default function ContactSection() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  function handleTelefoneChange(value: string) {
    setTelefone(formatBrazilPhone(digitsOnlyPhone(value)))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const lines = [
      'Olá! Vim pelo site da Viver Bem Imobiliária.',
      '',
      `*Nome:* ${nome.trim() || '—'}`,
      `*Telefone:* ${telefone.trim() || '—'}`,
      `*E-mail:* ${email.trim() || '—'}`,
      '',
      `*Mensagem:*`,
      mensagem.trim() || '—',
    ]

    window.open(whatsAppUrlWithText(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden py-12 text-white sm:py-14 lg:py-16"
    >
      <FullBleedImage src={HERO_BG_IMAGE} fixedOnDesktop />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-primary/30 via-primary/55 to-primary/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-345 gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <Reveal variant="left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-3xl">
            Entre em contato conosco
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            Fale com um de nossos consultores e descubra o imóvel ideal para
            você
          </p>
        </div>
        </Reveal>

        <Reveal delay={120} variant="right">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full min-w-0 max-w-lg rounded-sm bg-white p-5 shadow-xl shadow-black/20 sm:p-8 lg:mx-0 lg:ml-auto"
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="nome" className="block text-sm font-semibold text-primary">
              Nome
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputBase}
                placeholder="Nome"
                autoComplete="name"
              />
            </label>

            <label
              htmlFor="telefone"
              className="block text-sm font-semibold text-primary"
            >
              Telefone
              <input
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="numeric"
                required
                value={telefone}
                onChange={(e) => handleTelefoneChange(e.target.value)}
                className={inputBase}
                placeholder="(81) 99999-9999"
                autoComplete="tel"
                pattern="^\(\d{2}\) \d{4,5}-\d{4}$"
                title="Informe DDD + número: (81) 99999-9999"
              />
            </label>

            <label htmlFor="email" className="block text-sm font-semibold text-primary">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputBase}
                placeholder="E-mail"
                autoComplete="email"
              />
            </label>

            <label
              htmlFor="mensagem"
              className="block text-sm font-semibold text-primary"
            >
              Mensagem
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                required
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className={`${inputBase} resize-y min-h-28`}
                placeholder="Mensagem"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-sm bg-primary px-6 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-primary/90"
          >
            Enviar mensagem
          </button>
        </form>
        </Reveal>
      </div>
    </section>
  )
}
