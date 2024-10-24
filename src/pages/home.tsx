import { getCharacters } from '@/api/get-characters'
import { Banner } from '@/components/banner'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { MoveUpRight, Star } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = 20

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: characters } = useQuery({
    queryKey: ['characters', pageIndex],
    queryFn: () => getCharacters({ pageIndex, limit }),
    staleTime: 5 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Banner hasLogo={true} title="Seja bem vindo ao universo" />

      <div className="mx-auto -mt-32 max-w-[1200px] p-4">
        <h2 className="mb-8 text-3xl font-semibold text-white">
          Todos os personagens
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {characters?.data?.results?.map((character) => (
            <div
              key={character.id}
              className="group max-w-sm rounded-lg border border-gray-200 bg-white hover:shadow-xl"
            >
              <img
                className="aspect-square w-full rounded-t-lg"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="mb-2 overflow-hidden truncate text-lg font-bold tracking-tight text-gray-900 transition group-hover:text-blue-500">
                    {character.name}
                  </h5>
                  <Star
                    className={twMerge(
                      'size-5',
                      character.favorite ? 'text-yellow-500' : ''
                    )}
                  />
                </div>

                <div className="divide-y">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Quadrinhos
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      12
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Séries
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      8
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Histórias
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      10
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Eventos
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      0
                    </div>
                  </div>
                </div>

                <Link
                  to={`/details/${character.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  VER MAIS
                  <MoveUpRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {characters && (
          <div className="mt-4">
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={pageIndex}
              totalCount={characters.data.total}
              perPage={characters.data.limit}
            />
          </div>
        )}
      </div>
    </>
  )
}
