import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PHONE_DISPLAY, WHATSAPP_URL } from '../constants/contact'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

const NAV_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/#imoveis' },
  { label: 'Sobre nós', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
] as const

export default function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  const headerShell =
    isHome && atTop && !menuOpen
      ? 'bg-transparent shadow-none'
      : 'bg-primary/95 shadow-md shadow-black/15 backdrop-blur-md'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full text-white transition-[background-color,box-shadow,backdrop-filter] duration-300 ${headerShell}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8 xl:px-12">
        <Link to="/" className="min-w-0 shrink-0" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="Imobiliária Viver Bem"
            className="h-11 w-auto max-w-[min(100%,11rem)] object-contain sm:h-14 lg:h-16"
          />
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-10"
          aria-label="Principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="whitespace-nowrap transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-w-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wide transition hover:text-accent min-[400px]:flex xl:text-sm"
        >
          <FiPhone className="size-3.5 shrink-0 text-accent" aria-hidden />
          <span className="truncate max-xl:max-w-38 xl:max-w-none">
            {PHONE_DISPLAY}
          </span>
        </a>

        <button
          type="button"
          className="ml-1 shrink-0 rounded-lg p-2 text-white lg:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <HiOutlineMenuAlt3 className="size-7" />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-white/10 px-4 pb-5 pt-2 lg:hidden sm:px-6"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-sm font-medium tracking-wide transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-accent/15 px-4 py-3 text-sm font-semibold text-accent"
          >
            <FiPhone className="size-4" aria-hidden />
            WhatsApp — {PHONE_DISPLAY}
          </a>
        </nav>
      )}
    </header>
  )
}
