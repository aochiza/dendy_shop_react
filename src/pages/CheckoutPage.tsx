// pages/CheckoutPage.tsx
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  })

  const total = totalPrice()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Симуляция отправки заказа
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Очищаем корзину
    clearCart()
    
    // Перенаправляем на страницу успеха
    navigate('/checkout/success', { 
      state: { orderNumber: Math.floor(Math.random() * 1000000) }
    })
  }

  if (items.length === 0) {
    return (
      <motion.section
        className="contentPanel checkoutPage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="cartEmpty">
          <div className="title glow">Корзина пуста</div>
          <p className="muted" style={{ fontSize: 20, margin: '0 0 12px' }}>
            Нельзя оформить пустой заказ.
          </p>
          <Link className="btn" to="/">ВЕРНУТЬСЯ В КАТАЛОГ</Link>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="contentPanel checkoutPage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="productH1 glow" style={{ marginBottom: 20 }}>
         ОФОРМЛЕНИЕ ЗАКАЗА
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="checkoutLayout">
          <div className="checkoutForm">
            <div className="formGroup">
              <label>Ваше имя *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
              />
            </div>

            <div className="formGroup">
              <label>Телефон *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ivan@example.com"
              />
            </div>

            <div className="formGroup">
              <label>Адрес доставки *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="г. Москва, ул. Примерная, д. 1"
              />
            </div>

            <div className="formGroup">
              <label>Комментарий к заказу</label>
              <textarea
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительная информация..."
              />
            </div>
          </div>

          <div className="checkoutSummary">
            <h3>Ваш заказ</h3>
            
            <div className="checkoutItems">
              {items.map((item) => (
                <div key={item.id} className="checkoutItem">
                  <div className="checkoutItemInfo">
                    <span className="checkoutItemName">{item.title}</span>
                    <span className="checkoutItemQty">x{item.quantity}</span>
                  </div>
                  <div className="checkoutItemPrice">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ))}
            </div>

            <div className="checkoutTotal">
              <span>ИТОГО:</span>
              <span className="checkoutTotalPrice">{total.toLocaleString('ru-RU')} ₽</span>
            </div>

            <button 
              type="submit" 
              className="btn checkoutSubmit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'ОФОРМЛЯЕМ...' : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
            </button>
          </div>
        </div>
      </form>
    </motion.section>
  )
}