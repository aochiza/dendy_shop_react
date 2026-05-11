import { NavLink } from 'react-router-dom'

export function Navigation() {
  return (
    <nav className="headerNav">
      <NavLink className="headerLink" to="/catalog">
        Catalog
      </NavLink>
      <NavLink className="headerLink" to="/cart">
        Cart
      </NavLink>
    </nav>
  )
}