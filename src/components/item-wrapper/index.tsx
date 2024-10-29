import { BookOpen } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type ItemWrapperProps = {
  label: string
  color: string
}

export function ItemWrapper({ label, color }: ItemWrapperProps) {
  return (
    <div
      data-testid="item-wrapper"
      className={twMerge(
        'flex items-center gap-4 rounded-lg bg-blue-100 p-4',
        color
      )}
    >
      <BookOpen />
      <p>{label}</p>
    </div>
  )
}
