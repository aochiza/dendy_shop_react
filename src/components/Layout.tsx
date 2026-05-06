import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ParticlesBackground } from './ParticlesBackground'

export function Layout() {
  return (
    <div className="crt">
      <ParticlesBackground />
      <Header />
      <main className="container" style={{ padding: '6px 0 28px', position: 'relative' }}>
        <div className="contentPanel">
        <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

