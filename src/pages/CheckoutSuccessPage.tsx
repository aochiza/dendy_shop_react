// pages/CheckoutSuccessPage.tsx
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export function CheckoutSuccessPage() {
  const location = useLocation()
  const orderNumber = location.state?.orderNumber || Math.floor(Math.random() * 1000000)

  return (
    <motion.section
      className="contentPanel checkoutSuccessPage"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="successContent">
        <h1 className="successTitle">ЗАКАЗ ОФОРМЛЕН!</h1>
        
        <div className="successMessage">
          <p>Спасибо за ваш заказ!</p>
          <p>Номер заказа: <strong>#{orderNumber}</strong></p>
          <p>Наш менеджер свяжется с вами в ближайшее время.</p>
        </div>

        <div className="successActions">
          <Link to="/" className="btn successBtn">
            ПРОДОЛЖИТЬ ПОКУПКИ
          </Link>
          <Link to="/catalog" className="btn successBtnSecondary">
             ВЕРНУТЬСЯ В КАТАЛОГ
          </Link>
        </div>
      </div>
    </motion.section>
  )
}