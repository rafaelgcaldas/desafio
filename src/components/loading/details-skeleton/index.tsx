import { Image } from 'lucide-react'

export function DetailsSkeleton() {
  return (
    <div
      data-testid="details-skeleton"
      className="mx-auto -mt-32 max-w-[1200px] animate-pulse p-4"
    >
      <div className="space-y-10">
        <div className="flex flex-1 justify-center">
          <div className="mb-4 flex size-48 items-center justify-center rounded bg-gray-500">
            <Image />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mb-4 h-10 w-full rounded-lg bg-gray-200 md:w-48" />
        </div>

        <div>
          <div className="mb-2 h-3 w-full rounded-full bg-gray-200" />
          <div className="mb-2 h-3 w-full rounded-full bg-gray-200" />
          <div className="mb-2 h-3 w-full rounded-full bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="mb-2 h-6 w-20 rounded-full bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
          </div>
          <div>
            <div className="mb-2 h-6 w-20 rounded-full bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
            <div className="mb-2 h-14 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
