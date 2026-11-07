import { useEffect, useState } from 'react'

const BREAKPOINTS = [
  { query: '(min-width: 1280px)', items: 4 },
  { query: '(min-width: 640px)', items: 2 },
] as const

export function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const media = BREAKPOINTS.map(({ query, items }) => ({
      mql: window.matchMedia(query),
      items,
    }))

    const update = () => {
      for (const { mql, items } of media) {
        if (mql.matches) {
          setItemsPerPage(items)
          return
        }
      }
      setItemsPerPage(1)
    }

    update()
    for (const { mql } of media) {
      mql.addEventListener('change', update)
    }
    return () => {
      for (const { mql } of media) {
        mql.removeEventListener('change', update)
      }
    }
  }, [])

  return itemsPerPage
}
