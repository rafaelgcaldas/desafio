import { getCharacters } from '@/api/get-characters'
import { Banner } from '@/components/banner'
import { Card } from '@/components/card'
import { SkeletonList } from '@/components/loading/skeleton-list'
import { Pagination } from '@/components/pagination'
import { Wrapper } from '@/components/wrapper'
import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function Home() {
  const {
    characters,
    favoritesList,
    setCharacters,
    addFavoriteCharacter,
    addRecentlyVisitedCharacter,
    recentlyVisitedCharactersList,
  } = useStore()

  const navigate = useNavigate()

  const AllCharactersIsTop =
    favoritesList.length === 0 && recentlyVisitedCharactersList?.length === 0
  const recentlyVisited = favoritesList.length === 0

  const [searchParams, setSearchParams] = useSearchParams()
  const limit = 20

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const {
    data: charactersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['characters', pageIndex],
    queryFn: () => getCharacters({ pageIndex, limit }),
    staleTime: 5 * 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })

  useEffect(() => {
    if (charactersData) {
      setCharacters(charactersData)
    }
  }, [charactersData, setCharacters])

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  function handleCharacterNavigation(characterVisited: Characters) {
    addRecentlyVisitedCharacter(characterVisited)
    navigate(`/details/${characterVisited.id.toString()}`)
  }

  function handleAddFavoriteCharacter(character: Characters) {
    const favoriteCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(favoriteCharacter)
  }

  if (isError) {
    return (
      <>
        <Banner title="Sua coleção de personagens" />

        <div className="mx-auto max-w-[1200px] p-4">
          <div className="flex items-center gap-4 rounded-lg bg-red-100 px-4 py-8">
            <Info className="size-5" />
            <p>
              Ocorreu um erro ao carregar a lista de personagens. Atualize a
              página e tente novamente.
            </p>
          </div>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Banner hasLogo={true} title="Seja bem vindo ao universo" />

        <Wrapper title=" Todos os personagens" isTop={AllCharactersIsTop}>
          <SkeletonList />

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
        </Wrapper>
      </>
    )
  }

  return (
    <>
      <Banner hasLogo={true} title="Seja bem vindo ao universo" />

      {favoritesList.length > 0 && (
        <Wrapper title="Personagens favoritos">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoritesList.map((character) => (
              <Card
                key={character.id}
                character={character}
                onCharacterNavigation={handleCharacterNavigation}
                onFavoriteNavigation={handleAddFavoriteCharacter}
              />
            ))}
          </div>
        </Wrapper>
      )}

      {recentlyVisitedCharactersList?.length > 0 && (
        <Wrapper title="Visualizados recentemente" isTop={recentlyVisited}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recentlyVisitedCharactersList.map((character) => (
              <Card
                key={character.id}
                character={character}
                onCharacterNavigation={handleCharacterNavigation}
                onFavoriteNavigation={handleAddFavoriteCharacter}
              />
            ))}
          </div>
        </Wrapper>
      )}

      <Wrapper title=" Todos os personagens" isTop={AllCharactersIsTop}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters?.data?.results?.map((character) => (
            <Card
              key={character.id}
              character={character}
              onCharacterNavigation={handleCharacterNavigation}
              onFavoriteNavigation={handleAddFavoriteCharacter}
            />
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
      </Wrapper>
    </>
  )
}
