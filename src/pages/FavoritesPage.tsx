// pages/FavoritesPage.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useFavoritesStore } from '../store/favoritesStore'

export function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites)

  if (favorites.length === 0) {
    return (
      <motion.section
        className="contentPanel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="productH1 glow" style={{ marginBottom: 14 }}>❤️ ИЗБРАННОЕ</h1>
        <div className="cartEmpty">
          <div className="title glow">Пусто</div>
          <Link className="btn" style={{ borderBottom: 0 }} to="/">
             ПЕРЕЙТИ В КАТАЛОГ
          </Link>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="productH1 glow" style={{ marginBottom: 20 }}>
        ❤️ ИЗБРАННОЕ ({favorites.length})
      </h1>

      <div className="productGrid">
        <AnimatePresence>
          {favorites.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}