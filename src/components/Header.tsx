import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCatalogStore } from '../store/catalogStore'

export function Header() {
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
    <header className="headerCRT">
      <div className="container headerInner">
        <div className="stars" aria-hidden="true" />
        <NavLink to="/" className="headerLogo" style={{ borderBottom: 0 }}>
          <span className="headerLogoText">Dendy Shop</span>
          <span className="headerLogoInvaders" aria-hidden="true">
            <span className="invader" />
            <span className="invader invader--alt" />
            <span className="invader" />
          </span>
        </NavLink>

        <div className="headerRight">
          <div className="headerSearch">
            <input
              className="headerSearchInput"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
            />
          </div>

          <nav className="headerNav">
            <NavLink className="headerLink" to="/catalog">
              Catalog
            </NavLink>
            <NavLink className="headerLink" to="/cart">
              Cart
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

