import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface WrapperProps {
  children: ReactNode
  title: string
  isTop?: boolean
}

export function Wrapper({ children, title, isTop = true }: WrapperProps) {
  return (
    <div
      className={twMerge(
        'mx-auto max-w-[1200px] p-4 text-center sm:text-left',
        isTop ? '-mt-32' : ''
      )}
    >
      <h2
        className={twMerge(
          'mb-8 text-3xl font-semibold',
          isTop ? 'text-white' : ''
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
