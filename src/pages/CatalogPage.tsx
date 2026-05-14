// pages/CatalogPage.tsx
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import { NewArrivalsCarousel } from '../components/NewArrivalsCarousel'
import { ProductCard } from "../components/ProductCard"
import { useCatalogStore, type CatalogCategory } from '../store/catalogStore'

export function CatalogPage() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const searchQuery = useCatalogStore((s) => s.searchQuery)
  const activeCategory = useCatalogStore((s) => s.activeCategory)
  const setActiveCategory = useCatalogStore((s) => s.setActiveCategory)

  // Синхронизируем категорию с URL при загрузке
  useEffect(() => {
    const categoryParam = searchParams.get('category') as CatalogCategory | null
    if (categoryParam && ['all', 'consoles', 'cartridges', 'controllers'].includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [searchParams, setActiveCategory])

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      }
    },
  }

  return (
    <section>
      <NewArrivalsCarousel title="Новинки" items={newArrivals} />

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <h1
          style={{ fontFamily: 'var(--pixel)', fontSize: 16, margin: '30px 0 20px' }}
          className="glow"
        >
          КАТАЛОГ
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
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