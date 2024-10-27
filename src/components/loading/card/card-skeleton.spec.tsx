import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkeletonCard } from '.'

describe('<SkeletonCard />', () => {
  it('should be able to render correctly', () => {
    const container = render(<SkeletonCard />)

    const svgElement = container.getByRole('img', {
      name: /imagem de carregamento/i,
    })

    expect(svgElement).toBeInTheDocument()
  })
})
