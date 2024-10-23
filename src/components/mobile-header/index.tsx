import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type MobileHeaderProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export function MobileHeader({ isOpen, setIsOpen }: MobileHeaderProps) {
  return (
    <nav
      data-testid="menu-mobile"
      aria-hidden={!isOpen}
      className={twMerge(
        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-screen overflow-hidden bg-white transition ease-in-out',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      )}
    >
      <X
        aria-label="Close menu"
        className="absolute right-0 top-0 z-10 m-4 size-8 font-semibold"
        onClick={() => setIsOpen(false)}
      />

      <ul
        className={twMerge(
          'flex h-screen flex-1 flex-col items-center justify-center gap-8 transition',
          isOpen ? 'translate-y-0' : 'translate-y-2'
        )}
      >
        <li className="text-2xl font-semibold hover:opacity-90">
          <a href="#">Home</a>
        </li>
        <li className="text-2xl font-semibold hover:opacity-90">
          <a href="#">Favoritos</a>
        </li>
      </ul>
    </nav>
  )
}
