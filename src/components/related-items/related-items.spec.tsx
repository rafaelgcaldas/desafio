import '@testing-library/jest-dom'

import { relatedCharacter } from '@/test/mocks/related-characters'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RelatedItems } from '.'

const onRelatedCharacterFn = vi.fn()

describe('<ItemWrapper />', () => {
  it('should be able to render correctly', () => {
    const container = render(
      <RelatedItems
        onNavigateToCharacter={onRelatedCharacterFn}
        relatedItemsList={relatedCharacter}
      />
    )

    expect(container.getByText('3-D Man')).toBeVisible()
    expect(container.getByText('Avengers')).toBeVisible()
  })

  it('should be able click in navigate button', async () => {
    const event = userEvent.setup()
    const urlMock = 'http://gateway.marvel.com/v1/public/characters/1011334'

    const container = render(
      <RelatedItems
        onNavigateToCharacter={onRelatedCharacterFn}
        relatedItemsList={relatedCharacter}
      />
    )

    const linkButton = container.getByRole('button', { name: '3-D Man' })

    await event.click(linkButton)

    expect(onRelatedCharacterFn).toHaveBeenCalled()
    expect(onRelatedCharacterFn).toHaveBeenCalledWith(urlMock)
  })
})
