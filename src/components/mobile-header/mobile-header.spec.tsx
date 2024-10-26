import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Header } from '../header'

describe('<MobileMenu />', () => {
  it('should handle the open/close mobile menu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const menuElement = screen.getByTestId('menu-mobile')

    expect(menuElement.getAttribute('aria-hidden')).toBe('true')
    expect(menuElement).toHaveClass('opacity-0')

    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(menuElement.getAttribute('aria-hidden')).toBe('false')
    expect(menuElement).toHaveClass('opacity-100')

    fireEvent.click(screen.getByLabelText(/close menu/i))
    expect(menuElement.getAttribute('aria-hidden')).toBe('true')
    expect(menuElement).toHaveClass('opacity-0')
  })
})
