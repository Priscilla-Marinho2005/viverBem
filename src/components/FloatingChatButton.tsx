import { WHATSAPP_URL, PHONE_DISPLAY } from '../constants/contact'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingChatButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 z-30 flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-primary shadow-xl transition hover:bg-primary/90 sm:right-8 sm:size-14 bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
      aria-label={`Conversar no WhatsApp — ${PHONE_DISPLAY}`}
    >
      <FaWhatsapp className="size-6 text-accent" aria-hidden />
    </a>
  )
}
