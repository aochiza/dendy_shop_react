import { Logo } from './Logo'
import { SearchInput } from './SearchInput'
import { Navigation } from './Navigation'

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