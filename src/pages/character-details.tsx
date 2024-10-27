import { getCharacter } from '@/api/get-character'
import { Banner } from '@/components/banner'
import { DetailsSkeleton } from '@/components/loading/details-skeleton'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function CharacterDetails() {
  const { characterId } = useParams()
  const { favoritesList, addFavoriteCharacter } = useStore()
  const [character, setCharacter] = useState<Characters>()

  const { data, isLoading } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter(Number(characterId!)),
    staleTime: 5 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    const isfavorite = favoritesList.some(
      (favorite) => favorite.id === data?.id
    )

    if (data) {
      if (isfavorite) {
        const newCharacter = {
          ...data,
          favorite: true,
        }

        setCharacter(newCharacter)
      } else {
        setCharacter(data)
      }
    }
  }, [data, favoritesList])

  function handleFavoriteCharacter(character: Characters) {
    const favoriteCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(favoriteCharacter)
  }

  if (isLoading) {
    return (
      <>
        <Banner title="" />
        <DetailsSkeleton />
      </>
    )
  }

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

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => handleFavoriteCharacter(character!)}
            >
              <Star className="size-12" />
              {character?.favorite ? (
                <span>Remover favorito</span>
              ) : (
                <span>Favoritar personagem</span>
              )}
            </Button>
          </div>

          <p className="text-lg">{character?.description}</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Séries ({character?.series.available})
              </h2>
              {character?.series?.items &&
              character?.series?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.series?.items.map((item, index) => (
                    <div
                      key={index}
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
                  {character?.events?.items.map((item, index) => (
                    <div
                      key={index}
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Histórias em quadrinhos ({character?.comics.available})
              </h2>

              {character?.comics?.items &&
              character?.comics?.items.length > 0 ? (
                <div className="space-y-2">
                  {character?.comics?.items.map((item, index) => (
                    <div
                      key={index}
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
                  {character?.stories?.items.map((item, index) => (
                    <div
                      key={index}
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
