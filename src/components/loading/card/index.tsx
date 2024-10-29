import { Image } from 'lucide-react'

export function SkeletonCard() {
  return (
    <div className="group w-full animate-smooth-animation-pulse rounded-lg border border-gray-200 bg-white">
      <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-500">
        <Image role="img" aria-label="Imagem de carregamento" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="mb-4 h-5 w-48 rounded-full bg-gray-200" />
          <div className="mb-4 size-8 rounded-full bg-gray-200" />
        </div>

        <div className="divide-y">
          <div className="mb-4 h-3 w-full rounded-full bg-gray-200" />
          <div className="mb-4 h-3 w-full rounded-full bg-gray-200" />
          <div className="mb-4 h-3 w-full rounded-full bg-gray-200" />
          <div className="mb-4 h-3 w-full rounded-full bg-gray-200" />
        </div>

        <div className="mb-4 h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  )
}
