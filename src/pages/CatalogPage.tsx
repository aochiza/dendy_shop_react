import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // ← добавить
import { products } from '../data/products'
import { NewArrivalsCarousel } from '../components/NewArrivalsCarousel'
import { ProductCard } from "../components/ProductCard"
import { useCatalogStore } from '../store/catalogStore'

export function CatalogPage() {
  const searchQuery = useCatalogStore((s) => s.searchQuery)
  const activeCategory = useCatalogStore((s) => s.activeCategory)

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

  // Варианты анимации для карточек
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // задержка между карточками
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      }
    },
  }

  return (
    <section>
      <NewArrivalsCarousel title="New arrivals" items={newArrivals} />

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <h1
          style={{ fontFamily: 'var(--pixel)', fontSize: 16, margin: '30px 0 20px' }}
          className="glow"
        >
          DENDY SHOP — CATALOG
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery} // меняется при смене категории или поиска
          className="productGrid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {filtered.length === 0 ? (
            <div className="emptyState" style={{ gridColumn: '1/-1' }}>
              <div className="title glow">Ничего не найдено</div>
              <div className="muted" style={{ fontSize: 20 }}>
                Попробуй изменить запрос или категорию.
              </div>
            </div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                layout
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}