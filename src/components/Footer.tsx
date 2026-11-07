import { Link } from 'react-router-dom'
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from '../constants/contact'
import { FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'

const NAV_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/#imoveis' },
  { label: 'Sobre nós', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
] as const

const EMAIL = 'contato@viverbemimobiliaria.com.br'

const SOCIAL = [
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    Icon: FaWhatsapp,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/imobiliaria.viverbem/',
    Icon: FiInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61572077554202&locale=pt_BR',
    Icon: FaFacebookF,
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-primary text-white">
      <div className="mx-auto w-full max-w-355 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <Reveal className="sm:col-span-2 lg:col-span-4">
          <div>
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Imobiliária Viver Bem"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Compra e venda de imóveis em Pernambuco com transparência,
              curadoria e atendimento próximo em cada etapa.
            </p>
            <p className="mt-4 text-xs tracking-wide text-white/45">
              CRECI: 19286-J
            </p>
          </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2 lg:col-start-6">
          <nav aria-label="Links do site">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Navegação
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/75 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Contato
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-start gap-2.5 transition hover:text-accent"
                >
                  <FiPhone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-w-0 items-start gap-2.5 break-all transition hover:text-accent"
                >
                  <FiMail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {EMAIL}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <FiMapPin
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span>
                  Recife, PE
                  <span className="block text-xs text-white/50">
                    Atendimento presencial com hora marcada
                  </span>
                </span>
              </li>
            </ul>
          </div>
          </Reveal>

          <Reveal delay={240} className="lg:col-span-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Redes
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-sm border border-white/15 text-white/80 transition hover:border-accent hover:text-accent"
                  aria-label={label}
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-355 flex-col gap-3 px-4 py-5 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-6 sm:text-left lg:px-8">
          <p className="text-pretty">
            © {year} Viver Bem Imobiliária. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/28">
            Criado por{' '}
            <a
              href="https://www.zoneconnection.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 transition hover:text-white/50"
            >
              Zone Connection
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
