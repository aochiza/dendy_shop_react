// pages/CartPage.tsx
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const increaseQuantity = useCartStore((s) => s.increaseQuantity)
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const total = useCartStore((s) => s.totalPrice())
  const navigate = useNavigate()

  // Если корзина пуста, не рендерим с анимацией ухода
  if (items.length === 0) {
    return (
      <motion.section
        className="contentPanel cartPage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="productH1 glow" style={{ marginBottom: 14 }}>🛒 КОРЗИНА</h1>
        <div className="cartEmpty">
          <div className="title glow">Корзина пуста</div>
          <Link className="btn" style={{ borderBottom: 0 }} to="/">
             ПЕРЕЙТИ В КАТАЛОГ
          </Link>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="contentPanel cartPage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >

      <div className="cartBlock">
        <div className="cartList">
          {items.map((i) => (
            <motion.div 
              key={i.id} 
              className="cartRow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
            >
              <Link to={`/product/${i.id}`} style={{ borderBottom: 0 }}>
                <div className="cartImgWrap">
                  <img src={i.imageUrl} alt={i.title} loading="lazy" />
                </div>
              </Link>

              <div className="cartTitle">
                <div className="cartName glow">{i.title}</div>
                <div className="muted" style={{ fontSize: 20 }}>
                  {i.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>

              <div className="cartQty">
                <button className="btn" type="button" onClick={() => decreaseQuantity(i.id)} aria-label="Decrease">−</button>
                <div className="cartQtyValue">{i.quantity}</div>
                <button className="btn" type="button" onClick={() => increaseQuantity(i.id)} aria-label="Increase">+</button>
              </div>

              <div className="cartRight">
                <div className="cartLineTotal">{(i.price * i.quantity).toLocaleString('ru-RU')} ₽</div>
                <button className="btn" type="button" onClick={() => removeFromCart(i.id)}>🗑 УДАЛИТЬ</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cartSummary">
          <div className="cartTotal">
            Итого: <span className="glow">{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          
          <div className="cartSummaryActions">
            <button className="btn" type="button" onClick={clearCart}>ОЧИСТИТЬ</button>
             <motion.button 
              className="btn" 
              type="button" 
              whileHover={{ y: -2 }} 
              whileTap={{ y: 0 }}
              onClick={() => navigate('/checkout')}
            >
              ОФОРМИТЬ ЗАКАЗ
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}