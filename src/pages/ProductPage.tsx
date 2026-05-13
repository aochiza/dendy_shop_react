import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCartStore } from '../store/cartStore'

export function ProductPage() {
  const { id } = useParams()
  const addToCart = useCartStore((s) => s.addToCart)

  const product = id ? getProductById(id) : undefined
  const images = useMemo(() => {
    if (!product) return []
    const arr = product.images && product.images.length > 0 ? product.images : [product.imageUrl]
    return Array.from(new Set(arr))
  }, [product])
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const mainImage = activeImage ?? images[0]

  if (!product) {
    return (
      <section className="card">
        <div className="title glow">НЕ НАЙДЕНО</div>
        <p className="muted" style={{ fontSize: 20, margin: '0 0 12px' }}>
          Продукт не найден
        </p>
        <Link className="btn" style={{ borderBottom: 0 }} to="/">
          Перейти к каталогу
        </Link>
      </section>
    )
  }

  return (
    <motion.section
      className="contentPanel productPage"
      initial={{ opacity: 0, scale: 0.985, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="productLayout">
        <div>
          <div className="productHero">
            <img className="productHeroImg" src={mainImage} alt={product.title} />
          </div>

          {images.length > 1 ? (
            <div className="productThumbs" aria-label="Gallery">
              {images.map((src) => {
                const isActive = src === mainImage
                return (
                  <button
                    key={src}
                    type="button"
                    className={isActive ? 'thumb thumbActive' : 'thumb'}
                    onClick={() => setActiveImage(src)}
                    aria-pressed={isActive}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="productInfo">
          <h1 className="productH1 glow">{product.title}</h1>
          <div className="productPrice">{product.price.toLocaleString('ru-RU')} ₽</div>
          <p className="productDesc">{product.description}</p>

          <div className="productActions">
            <motion.button
              className="btn"
              type="button"
              whileHover={{ y: -1, boxShadow: '0 0 18px rgba(57, 255, 20, 0.16)' }}
              whileTap={{ y: 0 }}
              onClick={() => addToCart(product)}
            >
              ДОБАВИТЬ В КОРЗИНУ
            </motion.button>
            <Link className="btn" style={{ borderBottom: 0 }} to="/cart">
              В КОРЗИНУ →
            </Link>
          </div>

          <div className="muted" style={{ marginTop: 10, fontSize: 20 }}>
            Category: {product.category}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

