import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'

type Props = {
  title?: string
  items: Product[]
}

export function NewArrivalsCarousel({ title = 'New arrivals', items }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const addToCart = useCartStore((s) => s.addToCart)

  const [isDragging, setIsDragging] = useState(false)
  const drag = useRef<{ startX: number; startScrollLeft: number } | null>(null)

  const canRender = items.length > 0

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.7))
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    setIsDragging(true)
    drag.current = { startX: e.clientX, startScrollLeft: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    const d = drag.current
    if (!el || !d) return
    const dx = e.clientX - d.startX
    el.scrollLeft = d.startScrollLeft - dx
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    setIsDragging(false)
    drag.current = null
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  // Prevent text selection during drag
  useEffect(() => {
    if (!isDragging) return
    const prev = document.body.style.userSelect
    document.body.style.userSelect = 'none'
    return () => {
      document.body.style.userSelect = prev
    }
  }, [isDragging])

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 6, scale: 0.98 },
      show: { opacity: 1, y: 0, scale: 1 },
    }),
    [],
  )

  if (!canRender) return null

  return (
    <motion.section
      className="arrivals"
      initial="hidden"
      animate="show"
      variants={cardVariants}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="arrivalsHeader">
        <div className="arrivalsTitle glow">{title}</div>
        
        <div className="arrivalsControls"></div>
      </div>

      <div
        ref={scrollerRef}
        className={isDragging ? 'arrivalsScroller dragging' : 'arrivalsScroller'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {items.map((p) => (
          <motion.div
            key={p.id}
            className="arrivalCard"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <Link to={`/product/${p.id}`} style={{ borderBottom: 0, display: 'block' }}>
              <div className="arrivalImgWrap">
                <img src={p.imageUrl} alt={p.title} loading="lazy" />
              </div>
              <div className="arrivalName">{p.title}</div>
            </Link>
            <div className="arrivalBottom">
              <div className="arrivalPrice">{p.price.toLocaleString('ru-RU')} ₽</div>
              <button className="btn arrivalsAdd" type="button" onClick={() => addToCart(p)}>
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

