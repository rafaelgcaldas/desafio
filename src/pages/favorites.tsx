import { Banner } from '@/components/banner'
import { Card } from '@/components/card'
import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { useNavigate } from 'react-router-dom'

export function Favorites() {
  const navigate = useNavigate()

  const { favoritesList, addRecentlyVisitedCharacter } = useStore()

  function handleCharacterNavigation(characterVisited: Characters) {
    addRecentlyVisitedCharacter(characterVisited)
    navigate(`/details/${characterVisited.id}`)
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
