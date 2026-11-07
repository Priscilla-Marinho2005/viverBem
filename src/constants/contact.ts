export const WHATSAPP_NUMBER = '5581979125449'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function whatsAppUrlWithText(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`
}

export const PHONE_DISPLAY = '+55 81 97912-5449'
export const PHONE_TEL = '+5581979125449'
