import { Banner } from '@/components/banner'
import { Card } from '@/components/card'
import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Favorites() {
  const navigate = useNavigate()

  const { favoritesList, addRecentlyVisitedCharacter } = useStore()

  function handleCharacterNavigation(characterVisited: Characters) {
    addRecentlyVisitedCharacter(characterVisited)
    navigate(`/details/${characterVisited.id}`)
  }

  if (favoritesList.length === 0) {
    return (
      <>
        <Banner title="Sua coleção de personagens" />
        <div className="mx-auto max-w-[1200px] p-4">
          <div className="flex items-center gap-4 rounded-lg bg-blue-100 px-4 py-8">
            <Info size-5 />
            <p>Você não possui nenhum personagem favorito.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Banner title="Sua coleção de personagens" />

      {favoritesList.length > 0 && (
        <div className="mx-auto -mt-16 mb-32 max-w-[1200px] p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoritesList.map((character) => (
              <Card
                key={character.id}
                character={character}
                onCharacterNavigation={handleCharacterNavigation}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
