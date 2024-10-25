import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import userEvent from '@testing-library/user-event'
import { SearchDialog } from '.'

const searchCharacters = vi.fn() // Mocka o módulo de API

vi.mock('../path/to/api', () => ({
  searchCharacters,
}))

describe('<SearchDialog />', () => {
  it('should be able render open modal button', () => {
    const container = render(<SearchDialog />)

    expect(container.getByLabelText(/Open search/i)).toBeInTheDocument()
  })

  it('should be able open modal', async () => {
    const event = userEvent.setup()
    const container = render(<SearchDialog />)

    const nextPageButton = container.getByLabelText(/Open search/i)
    await event.click(nextPageButton)

    expect(container.getByText('Pesquisar personagens')).toBeVisible()
  })

  it('should be able to search for the search term correctly', async () => {
    const event = userEvent.setup()
    const container = render(<SearchDialog />)

    const opeModalButton = container.getByLabelText(/Open search/i)
    await event.click(opeModalButton)
    expect(container.getByText('Pesquisar personagens')).toBeVisible()

    const input = container.getByPlaceholderText(
      'Pesquise personagens pelo nome...'
    )
    expect(input).toBeVisible()

    await event.type(input, 'spider-man')

    expect(input).toHaveValue('spider-man')
  })
})
