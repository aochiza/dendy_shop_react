// components/Categories/Categories.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { useCatalogStore } from '../../store/catalogStore'
import type { CatalogCategory } from '../../store/catalogStore'

interface Category {
  id: string;
  label: string;
}

const categories: Category[] = [
  { id: 'all', label: 'Главная'},
  { id: 'consoles', label: 'Консоли' },
  { id: 'cartridges', label: 'Картриджи' },
  { id: 'controllers', label: 'Джойстики' },
  { id: 'about', label: 'О нас'},
]

export function Categories() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeCategory = useCatalogStore((s) => s.activeCategory)
  const setActiveCategory = useCatalogStore((s) => s.setActiveCategory)

  const isActive = (categoryId: string) => {
    if (categoryId === 'about') {
      return location.pathname === '/about'
    }
    // Для категорий каталога
    return location.pathname === '/' && activeCategory === categoryId
  }

  const handleClick = (categoryId: string) => {
    if (categoryId === 'about') {
      navigate('/about')
    } else {
      setActiveCategory(categoryId as CatalogCategory)
      if (location.pathname !== '/') {
        navigate('/')
      }
    }
  }

  return (
    <div className="catalogToolbar">
      <div className="container">
        <div className="tabs" role="tablist" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`tab ${isActive(c.id) ? 'tabActive' : ''} ${''}`}
              onClick={() => handleClick(c.id)}
              role="tab"
              aria-selected={isActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}