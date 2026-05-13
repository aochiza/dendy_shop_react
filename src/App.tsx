import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { AboutPage } from './pages/AboutPage'
import { CheckoutPage } from './pages/CheckoutPage' // ← добавить
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/catalog" element={<Navigate to="/" replace />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
         <Route path="/favorites" element={<FavoritesPage />} /> 
         <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> 
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
