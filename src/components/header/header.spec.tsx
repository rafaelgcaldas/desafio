import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from '.'
import { MemoryRouter } from 'react-router-dom'

describe('<Menu />', () => {
  it('should be able render the menu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByTestId('desktop-menu')).toBeVisible()
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open search/i)).toBeVisible()
    expect(
      screen.getByRole('img', { name: /marvel logo/i })
    ).toBeInTheDocument()
  })
})
