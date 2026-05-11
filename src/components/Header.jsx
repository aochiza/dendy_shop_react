import { Logo } from './Header/Logo'
import { SearchInput } from './Header/SearchInput'
import { Navigation } from './Header/Navigation'

export function Header() {
  return (
    <header className="headerCRT">
      <div className="container headerInner">
        <Logo />
        <div className="headerRight">
          <SearchInput />
          <Navigation />
        </div>
      </div>
    </header>
  )
}