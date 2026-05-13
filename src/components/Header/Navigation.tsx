import { NavLink } from 'react-router-dom'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useCartStore } from '../../store/cartStore'

export function Navigation() {
  const favoritesCount = useFavoritesStore((s) => s.favorites.length)

  return (
    <nav className="headerNav">
      <NavLink className="headerLink" to="/catalog">
        КАТАЛОГ
      </NavLink>

      <NavLink className="headerLink" to="/favorites">
         ИЗБРАННОЕ ❤️
        {favoritesCount > 0 && (
          <span className="nav-badge">{favoritesCount}</span>
        )}
      </NavLink>

      <NavLink className="headerLink" to="/cart">
         КОРЗИНА 🛒
        <CartCounter />
      </NavLink>
    </nav>
  )
}

function CartCounter() {
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))
  if (itemCount === 0) return null
  return <span className="nav-badge">{itemCount}</span>
}