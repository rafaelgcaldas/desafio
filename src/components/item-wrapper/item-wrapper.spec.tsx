import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { ItemWrapper } from '.'
import { render } from '@testing-library/react'

describe('<ItemWrapper />', () => {
  it('should be able to render correctly', () => {
    const container = render(
      <ItemWrapper label="Example text" color="bg-blue-100" />
    )

    container.debug()

    expect(container.getByText('Example text')).toBeVisible()
    expect(container.getByTestId('item-wrapper')).toHaveClass('bg-blue-100')
  })
})
