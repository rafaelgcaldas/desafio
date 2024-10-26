import '@testing-library/jest-dom'

import { character } from '@/test/mocks/character'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Card } from '.'

const onCharacterNavigationFn = vi.fn()

describe('<Card />', () => {
  it('should be able render correctly', () => {
    const container = render(
      <Card
        character={character}
        onCharacterNavigation={onCharacterNavigationFn}
      />
    )

    expect(container.getByText('3-D Man')).toBeVisible()
    expect(container.getByRole('img', { name: /3-D Man/i })).toBeVisible()

    expect(container.getByText('Quadrinhos')).toBeVisible()
    expect(container.getByText('12')).toBeVisible()

    expect(container.getByText('Séries')).toBeVisible()
    expect(container.getByText('3')).toBeVisible()

    expect(container.getByText('Histórias')).toBeVisible()
    expect(container.getByText('21')).toBeVisible()

    expect(container.getByText('Eventos')).toBeVisible()
    expect(container.getByText('1')).toBeVisible()
  })

  it('should be able click navigation button', async () => {
    const event = userEvent.setup()

    const container = render(
      <Card
        character={character}
        onCharacterNavigation={onCharacterNavigationFn}
      />
    )

    const button = container.getByRole('button', { name: /ver mais/i })

    await event.click(button)

    expect(onCharacterNavigationFn).toHaveBeenCalled()
    expect(onCharacterNavigationFn).toHaveBeenCalledWith(character)
  })

  // it('should be able click favorite button', async () => {
  //   const event = userEvent.setup()

  //   const container = render(
  //     <Card
  //       character={character}
  //       onCharacterNavigation={onCharacterNavigationFn}
  //     />
  //   )

  //   const favoriteButton = container.getByLabelText(/favorite character/i)

  //   await event.click(favoriteButton)
  //   expect(favoriteButton).toHaveClass('text-yellow-500')
  // })
})
