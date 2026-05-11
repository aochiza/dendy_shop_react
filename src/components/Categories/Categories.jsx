// components/Categories/Categories.jsx
import { useCatalogStore } from '../../store/catalogStore'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'consoles', label: 'Consoles' },
  { id: 'cartridges', label: 'Cartridges' },
  { id: 'controllers', label: 'Controllers' },
]

export function Categories() {
  const activeCategory = useCatalogStore((s) => s.activeCategory)
  const setActiveCategory = useCatalogStore((s) => s.setActiveCategory)

  return (
    <div className="catalogToolbar">
      <div className="container"> {/* ← ДОБАВИТЬ ЭТОТ ОБЁРТЫВАЮЩИЙ ДИВ */}
        <div className="tabs" role="tablist" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={c.id === activeCategory ? 'tab tabActive' : 'tab'}
              onClick={() => setActiveCategory(c.id)}
              role="tab"
              aria-selected={c.id === activeCategory}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}