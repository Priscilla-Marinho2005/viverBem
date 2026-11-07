import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FloatingChatButton from '../components/FloatingChatButton'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return null
}

export default function SiteLayout() {
  return (
    <>
      <ScrollToHash />
      <Nav />
      <Outlet />
      <Footer />
      <FloatingChatButton />
    </>
  )
}
