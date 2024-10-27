import marvelLogo from '@/assets/marvel-logo.svg'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MobileHeader } from '../mobile-header'
import { SearchDialog } from '../search-dialog'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full border-b border-b-white bg-foreground">
      <header className="mx-auto flex max-w-[1200px] items-center justify-between p-4 text-white">
        <img src={marvelLogo} alt="Marvel logo" />

        <div className="flex items-center justify-center gap-2 md:gap-6">
          <nav className="hidden md:block" data-testid="desktop-menu">
            <ul className="flex items-center gap-8">
              <li className="text-lg font-medium hover:opacity-90">
                <Link to="/">Home</Link>
              </li>
              <li className="text-lg font-medium hover:opacity-90">
                <Link to="/favorites">Favoritos</Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-4">
            <Menu
              className="opacity-1 block size-5 md:invisible md:hidden"
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
            />
            <SearchDialog />
          </div>
        </div>
      </header>

      <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
