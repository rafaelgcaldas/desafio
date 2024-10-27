import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { Favorites } from './favorites'

import { character } from '@/test/mocks/character'
import { MemoryRouter } from 'react-router-dom'
import { useStore as store } from '../store'

const initialState = store.getState()

describe('Favorites />', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able to render the page correctly', () => {
    const { addFavoriteCharacter } = store.getState()

    const newCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(newCharacter)

    const container = render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    )

    expect(container.getByText('3-D Man'))
    expect(container.getByRole('button', { name: /ver mais/i })).toBeVisible()
    expect(container.getByRole('img', { name: /3-D Man/i })).toBeVisible()
  })

  it('should be able to show empty state', () => {
    const container = render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    )

    expect(
      container.getByText('Você não possui nenhum personagem favorito.')
    ).toBeVisible()
  })
})
