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
      if (location.pathname !== '/') navigate('/', { replace: false })
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