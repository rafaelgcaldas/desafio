import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Banner } from '.'

describe('<Menu />', () => {
  it('should render the banner correctly', () => {
    const title = 'Banner title'
    render(<Banner hasLogo={true} title={title} />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(
      screen.getByRole('img', { name: /marvel logo/i })
    ).toBeInTheDocument()

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(title)
  })

  it('should not render logo in the banner', () => {
    const title = 'Banner title'
    render(<Banner title={title} />)

    expect(
      screen.queryByRole('img', { name: /marvel logo/i })
    ).not.toBeInTheDocument()
  })
})
