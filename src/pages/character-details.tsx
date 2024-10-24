import { getCharacter } from '@/api/get-character'
import { Banner } from '@/components/banner'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { useParams } from 'react-router-dom'

export function CharacterDetails() {
  const { characterId } = useParams()

  const { data: character } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter(Number(characterId!)),
    staleTime: 5 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  console.log('aaaa', character)

  console.log(characterId)
  return (
    <>
      <Banner title={character?.name ?? ''} />
      <div className="mx-auto -mt-32 max-w-[1200px] p-4">
        <div className="space-y-10">
          <div className="flex flex-1 justify-center">
            <img
              className="aspect-square size-48 rounded-lg"
              src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
              alt={character?.name}
            />
          </div>

          <p className="text-lg">{character?.description}</p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Séries ({character?.series.available})
              </h2>
              {character?.series?.items &&
              character?.series?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.series?.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-lg bg-blue-100 p-4"
                    >
                      <BookOpen />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não possui</p>
              )}
            </div>

            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Eventos ({character?.events.available})
              </h2>
              {character?.events?.items &&
              character?.events?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.events?.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-lg bg-yellow-100 p-4"
                    >
                      <BookOpen />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não possui</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Histórias em quadrinhos ({character?.comics.available})
              </h2>

              {character?.comics?.items &&
              character?.comics?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.comics?.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-lg bg-green-100 p-4"
                    >
                      <BookOpen />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não possui</p>
              )}
            </div>

            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Histórias ({character?.stories.available})
              </h2>

              {character?.stories?.items &&
              character?.stories?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.stories?.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-lg bg-red-100 p-4"
                    >
                      <BookOpen />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não possui</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
