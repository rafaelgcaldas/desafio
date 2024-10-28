import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { Footer } from '.'
import { render } from '@testing-library/react'

describe('<Footer />', () => {
  it('should be able to render correctly', () => {
    const container = render(<Footer />)

    expect(
      container.getByRole('img', { name: 'Marvel logo footer' })
    ).toBeVisible()
    expect(container.getByText('Data provided by Marvel. © 2024 MARVEL'))
  })
})
