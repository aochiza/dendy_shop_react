import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'

type Props = {
  title?: string
  items: Product[]
  autoPlayInterval?: number
}

export function NewArrivalsCarousel({ 
  title = 'New arrivals', 
  items, 
  autoPlayInterval = 5000 
}: Props) {
  const addToCart = useCartStore((s) => s.addToCart)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const lastGestureX = useRef<number | null>(null)
  const lastSwitchTime = useRef<number>(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  
  const sliderItems = items.slice(0, 4)
  const currentItem = sliderItems[currentIndex]

  // Автоматическое переключение
  useEffect(() => {
    if (!isAutoPlaying || sliderItems.length <= 1 || isTransitioning) return
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % sliderItems.length)
      }
    }, autoPlayInterval)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, sliderItems.length, autoPlayInterval, isTransitioning])

  // Функции переключения с блокировкой во время анимации
  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % sliderItems.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 500)
  }

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + sliderItems.length) % sliderItems.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 500)
  }

  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Проверяем, используется ли тачпад (ctrlKey для зума, но лучше проверять наличие двух пальцев)
    // Браузеры передают wheelEvent с разными свойствами для тачпада
    const isTrackpad = e.ctrlKey || Math.abs(e.deltaY) < 30
    
    // Для двухпальцевых жестов на тачпаде горизонтальный свайп даёт большой deltaX
    const horizontalSwipe = Math.abs(e.deltaX) > 30
    const diagonalSwipe = Math.abs(e.deltaX) > 15 && Math.abs(e.deltaY) < 20
    
    if ((horizontalSwipe || diagonalSwipe) && !isTransitioning) {
      const now = Date.now()
      if (now - lastSwitchTime.current > 500) {
        if (e.deltaX > 0) {
          // Два пальца влево -> следующий товар
          goToNext()
        } else if (e.deltaX < 0) {
          // Два пальца вправо -> предыдущий товар
          goToPrevious()
        }
        lastSwitchTime.current = now
      }
      e.preventDefault()
    }
  }

  // Альтернативный метод через TouchEvent для сенсорных экранов
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    
    // Горизонтальный свайп (игнорируем вертикальные)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && !isTransitioning) {
      if (deltaX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
  }

  // Дополнительная поддержка: движение мыши (для десктопов без тачпада)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lastGestureX.current === null) {
      lastGestureX.current = e.clientX
      return
    }
    
    const deltaX = e.clientX - lastGestureX.current
    const now = Date.now()
    const timeSinceLastSwitch = now - lastSwitchTime.current
    
    const threshold = 50
    const debounceTime = 600
    
    if (Math.abs(deltaX) > threshold && timeSinceLastSwitch > debounceTime && !isTransitioning) {
      if (deltaX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
      lastSwitchTime.current = now
      lastGestureX.current = null
    }
  }

  const handleMouseLeave = () => {
    lastGestureX.current = null
  }

  if (sliderItems.length === 0) return null

  return (
    <motion.section
      className="arrivals"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 6, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="arrivalsHeader">
        <h2 className="arrivalsTitle">{title}</h2>
        
        {/* Точки навигации */}
        <div className="arrivalsDots">
          {sliderItems.map((_, idx) => (
            <button
              key={idx}
              className={`arrivalsDot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isTransitioning) {
                  setDirection(idx > currentIndex ? 1 : -1)
                  setCurrentIndex(idx)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="arrivalsSliderContainer"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            initial={{ opacity: 0, x: direction === 1 ? 400 : -400, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction === 1 ? -400 : 400, scale: 0.95 }}
            transition={{ 
              duration: 0.55, 
              ease: [0.32, 0.72, 0, 1], // кастомная кривая для очень плавного движения
              type: "tween"
            }}
            className="arrivalsSliderCard"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75)), url(${currentItem.imageUrl})`,
            }}
          >
            <div className="arrivalsSliderContent">
              <motion.h3 
                className="arrivalsSliderTitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {currentItem.title}
              </motion.h3>
              
              <motion.p 
                className="arrivalsSliderDesc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {currentItem.description}
              </motion.p>
              
              <motion.div 
                className="arrivalsSliderPrice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {currentItem.price.toLocaleString('ru-RU')} ₽
              </motion.div>
              
              <motion.div 
                className="arrivalsSliderActions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link to={`/product/${currentItem.id}`} className="btn arrivalsDetailsBtn">
                  Узнать подробнее →
                </Link>
                <button 
                  className="btn arrivalsCartBtn" 
                  onClick={() => addToCart(currentItem)}
                >
                  + В корзину
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Декоративные элементы для плавности */}
        <div className="arrivalsGradientLeft" />
        <div className="arrivalsGradientRight" />
      </div>
    </motion.section>
  )
}