import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkeletonList } from '.'

describe('<SkeletonList />', () => {
  it('should be able to render correctly teste', () => {
    const container = render(<SkeletonList />)

    const svgElement = container.getAllByRole('img', {
      name: /imagem de carregamento/i,
    })

    expect(svgElement.length).toEqual(8)
  })
})
