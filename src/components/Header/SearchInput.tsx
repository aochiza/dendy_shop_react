// components/Header/SearchInput.tsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCatalogStore } from '../../store/catalogStore'

export function SearchInput() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSearchQuery = useCatalogStore((s) => s.setSearchQuery)
  const [value, setValue] = useState('')

  useEffect(() => {
    const t = window.setTimeout(() => {
      setSearchQuery(value.trim())

      // И только если есть текст поиска (чтобы не срабатывало при пустом вводе)
      if (value.trim().length > 0 && !location.pathname.startsWith('/product') && location.pathname !== '/cart' && location.pathname !== '/favorites') {
        if (location.pathname !== '/') navigate('/')
      }
    }, 300)
    return () => window.clearTimeout(t)
  }, [value, setSearchQuery, location.pathname, navigate])

  return (
    <div className="headerSearch">
      <input
        className="headerSearchInput"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
      />
    </div>
  )
}