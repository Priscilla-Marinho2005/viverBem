import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

function ogImageAbsoluteOrigin() {
  const placeholder = '__OG_IMAGE_ABSOLUTE__'
  return {
    name: 'og-image-absolute',
    transformIndexHtml(html: string, ctx: { server?: unknown }) {
      if (ctx.server) {
        return html.replaceAll(placeholder, '/logoComFundo.jpg')
      }
      const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
      const env = loadEnv(mode, process.cwd(), '')
      const origin = env.VITE_SITE_ORIGIN?.replace(/\/$/, '')
      const image = origin
        ? `${origin}/logoComFundo.jpg`
        : '/logoComFundo.jpg'
      return html.replaceAll(placeholder, image)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ogImageAbsoluteOrigin()],
})
