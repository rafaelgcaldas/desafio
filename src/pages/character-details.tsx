import { getCharacter } from '@/api/get-character'
import { getRelatedCharacter } from '@/api/get-related-characters'
import { Banner } from '@/components/banner'
import { ItemWrapper } from '@/components/item-wrapper'
import { DetailsSkeleton } from '@/components/loading/details-skeleton'
import { RelatedItems } from '@/components/related-items'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Info, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function CharacterDetails() {
  const navigate = useNavigate()
  const { characterId } = useParams()
  const {
    favoritesList,
    addFavoriteCharacter,
    recentlyVisitedCharactersList,
    addRecentlyVisitedCharacter,
  } = useStore()
  const [character, setCharacter] = useState<Characters>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', Number(characterId)],
    queryFn: () => getCharacter(characterId!),
  })

  const { data: relatedCharacters } = useQuery({
    queryKey: ['relatedCharacter', Number(characterId)],
    queryFn: () => getRelatedCharacter(characterId!),
  })

  useEffect(() => {
    const isfavorite = favoritesList.some(
      (favorite) => favorite.id === data?.id
    )

    if (isfavorite && data) {
      const newCharacter = {
        ...data,
        favorite: true,
      }

      setCharacter(newCharacter)
    } else {
      setCharacter(data)
    }
  }, [data, favoritesList, characterId])

  useEffect(() => {
    const isRecentlyVisited = recentlyVisitedCharactersList.some(
      (favorite) => favorite.id === data?.id
    )

    if (!isRecentlyVisited && data) {
      addRecentlyVisitedCharacter(data)
    }
  }, [recentlyVisitedCharactersList, data, addRecentlyVisitedCharacter])

  function handleFavoriteCharacter(character: Characters) {
    const favoriteCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(favoriteCharacter)
  }

  function getCharacterId(url: string) {
    return url.split('/').pop()
  }

  function navigateToCharacter(link: string) {
    const characterId = getCharacterId(link)
    navigate(`/details/${characterId}`)
  }

  if (isLoading) {
    return (
      <>
        <Banner title="" />
        <DetailsSkeleton />
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Banner title="Sua coleção de personagens" />
        <div className="mx-auto max-w-[1200px] p-4">
          <div className="flex items-center gap-4 rounded-lg bg-red-100 px-4 py-8">
            <Info className="size-5" />
            <p>
              Ocorreu um erro ao carregar os dados do persoangem. Atualiza a
              página e tente novamente.
            </p>
          </div>
        </div>
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
                    <ItemWrapper
                      label={item.name}
                      key={index}
                      color="bg-blue-100"
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-gray-200 p-4">
                  Não possui
                </p>
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
                    <ItemWrapper
                      label={item.name}
                      key={index}
                      color="bg-yellow-100"
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-gray-200 p-4">
                  Não possui
                </p>
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
                    <ItemWrapper
                      label={item.name}
                      key={index}
                      color="bg-green-100"
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-gray-200 p-4">
                  Não possui
                </p>
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
                    <ItemWrapper
                      label={item.name}
                      key={index}
                      color="bg-red-100"
                    />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-gray-200 p-4">
                  Não possui
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {relatedCharacters && (
        <RelatedItems
          relatedItemsList={relatedCharacters}
          onNavigateToCharacter={navigateToCharacter}
        />
      )}
    </>
  )
}
