import { NavLink } from 'react-router-dom'

export function Logo() {
  return (
    <NavLink to="/" className="headerLogo" style={{ borderBottom: 0 }}>
      <span className="headerLogoText">Денди Shop</span>
      <span className="headerLogoInvaders" aria-hidden="true">
        <span className="invader" />
        <span className="invader invader--alt" />
        <span className="invader" />
      </span>
    </NavLink>
  )
}