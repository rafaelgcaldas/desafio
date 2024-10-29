import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Wrapper } from '.'

describe('<ItemWrapper />', () => {
  it('should be able to render correctly', () => {
    const container = render(
      <Wrapper title="Example text">
        <div>Some element</div>
      </Wrapper>
    )

    expect(container.getByText('Example text')).toBeVisible()
    expect(container.getByText('Some element')).toBeVisible()
  })
})
