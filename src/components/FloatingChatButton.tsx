import { WHATSAPP_URL, PHONE_DISPLAY } from '../constants/contact'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'

export default function FloatingChatButton() {
  return (
    <Reveal
      when="mount"
      delay={700}
      variant="up"
      className="fixed right-4 z-30 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-8"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-primary shadow-xl transition hover:bg-primary/90 hover:scale-105"
        aria-label={`Conversar no WhatsApp — ${PHONE_DISPLAY}`}
      >
        <FaWhatsapp className="size-6 text-accent" aria-hidden />
      </a>
    </Reveal>
  )
}
