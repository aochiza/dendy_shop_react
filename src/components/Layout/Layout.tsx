import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Categories } from '../Categories/Categories'
import { Footer } from '../Footer' // ← импорт футера

export function Layout() {
  return (
    <div className="crt">
      <div className="sticky-header-group">
        <Header />
        <Categories />
      </div>
      <div className="container">
        <Outlet />
      </div>
      <Footer /> 
    </div>
  )
}