import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'

type Props = {
  title?: string
  items: Product[]
  autoPlayInterval?: number
}

export function NewArrivalsCarousel({ 
  title = 'Новинки', 
  items, 
  autoPlayInterval = 5000 
}: Props) {
  const addToCart = useCartStore((s) => s.addToCart)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
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

  // Функции переключения
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
        className="arrivalsSliderContainer"
        style={{ position: 'relative' }}
      >
        {/* Левая область для клика */}
        <div 
          className="arrivalsNavArea left" 
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '15%',
            height: '100%',
            zIndex: 10,
            cursor: 'pointer'
          }}
        />
        
        {/* Правая область для клика */}
        <div 
          className="arrivalsNavArea right" 
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '15%',
            height: '100%',
            zIndex: 10,
            cursor: 'pointer'
          }}
        />
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            initial={{ opacity: 0, x: direction === 1 ? 400 : -400, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction === 1 ? -400 : 400, scale: 0.95 }}
            transition={{ 
              duration: 0.55, 
              ease: [0.32, 0.72, 0, 1],
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
        
        <div className="arrivalsGradientLeft" />
        <div className="arrivalsGradientRight" />
      </div>
    </motion.section>
  )
}