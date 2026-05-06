import { useMemo } from 'react'
import { products } from '../data/products'
import { NewArrivalsCarousel } from '../components/NewArrivalsCarousel'
import { ProductCard } from "../components/ProductCard";
import { useCatalogStore, type CatalogCategory } from '../store/catalogStore'

export function CatalogPage() {
  const searchQuery = useCatalogStore((s) => s.searchQuery)
  const activeCategory = useCatalogStore((s) => s.activeCategory)
  const setActiveCategory = useCatalogStore((s) => s.setActiveCategory)
  const clearFilters = useCatalogStore((s) => s.clearFilters)

  const categories: { id: CatalogCategory; label: string }[] = useMemo(
    () => [
      { id: 'all', label: 'All' },
      { id: 'consoles', label: 'Consoles' },
      { id: 'cartridges', label: 'Cartridges' },
      { id: 'controllers', label: 'Controllers' },
    ],
    [],
  )

  const newArrivals = useMemo(() => products.slice(0, 5), [])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products.filter((p) => {
      const byCategory =
        activeCategory === 'all' ||
        (activeCategory === 'consoles' && p.category === 'console') ||
        (activeCategory === 'cartridges' && p.category === 'cartridge') ||
        (activeCategory === 'controllers' && p.category === 'gamepad')

      const byQuery = q.length === 0 || p.title.toLowerCase().includes(q)

      return byCategory && byQuery
    })
  }, [activeCategory, searchQuery])

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <h1
          style={{ fontFamily: 'var(--pixel)', fontSize: 16, margin: '0 0 14px' }}
          className="glow"
        >
          DENDY SHOP — CATALOG
        </h1>
      </div>

      
      <div className="catalogToolbar">
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
          
           <div className="muted" style={{ fontSize: 20, marginBottom: 14 }}>
          {filtered.length} items
        </div>
        </div>
      </div>
          
      <NewArrivalsCarousel title="New arrivals" items={newArrivals} />

      {filtered.length === 0 ? (
        <div className="emptyState">
          <div className="title glow">Ничего не найдено</div>
          <div className="muted" style={{ fontSize: 20 }}>
            Попробуй изменить запрос или категорию.
          </div>
        </div>
      ) : (
        <div className="productGrid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      
    </section>
  )
}

