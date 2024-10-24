import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from '.'

import userEvent from '@testing-library/user-event'

const onPageChangeFn = vi.fn()

describe('<Pagination />', () => {
  it('should show the right amount of pages', () => {
    const container = render(
      <Pagination
        pageIndex={0}
        totalCount={100}
        perPage={10}
        onPageChange={() => {}}
      />
    )

    expect(container.getByText('Página 1 de 10')).toBeInTheDocument()
    expect(container.getByText('Total: 100 personagens')).toBeInTheDocument()
  })

  it('should be able to change to first page', async () => {
    const event = userEvent.setup()

    const container = render(
      <Pagination
        pageIndex={2}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeFn}
      />
    )

    const nextPageButton = container.getByRole('button', {
      name: 'Primeira página',
    })

    await event.click(nextPageButton)

    expect(onPageChangeFn).toHaveBeenCalledWith(0)
  })

  it('should be able to change to previous page', async () => {
    const event = userEvent.setup()

    const container = render(
      <Pagination
        pageIndex={5}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeFn}
      />
    )

    const nextPageButton = container.getByRole('button', {
      name: 'Página anterior',
    })

    await event.click(nextPageButton)

    expect(onPageChangeFn).toHaveBeenCalledWith(4)
  })

  it('should be able to change to next page', async () => {
    const event = userEvent.setup()

    const container = render(
      <Pagination
        pageIndex={0}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeFn}
      />
    )

    const nextPageButton = container.getByRole('button', {
      name: 'Próxima página',
    })

    await event.click(nextPageButton)

    expect(onPageChangeFn).toHaveBeenCalledWith(1)
  })

  it('should be able to change to last page', async () => {
    const event = userEvent.setup()

    const container = render(
      <Pagination
        pageIndex={5}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeFn}
      />
    )

    const nextPageButton = container.getByRole('button', {
      name: 'Última página',
    })

    await event.click(nextPageButton)

    expect(onPageChangeFn).toHaveBeenCalledWith(9)
  })
})
