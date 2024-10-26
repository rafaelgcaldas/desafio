import { useStore } from '@/store'
import type { Characters } from '@/types/types'
import { MoveUpRight, Star } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export interface CardProps {
  character: Characters
  onCharacterNavigation: (character: Characters) => void
}

export function Card({ character, onCharacterNavigation }: CardProps) {
  const { addFavoriteCharacter } = useStore()
  function handleAddFavoriteCharacter(character: Characters) {
    const favoriteCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(favoriteCharacter)
  }

  return (
    <div className="group w-full rounded-lg border border-gray-200 bg-white hover:shadow-xl">
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
            aria-label="Favorite character"
            onClick={() => handleAddFavoriteCharacter(character)}
            className={twMerge(
              'size-5 cursor-pointer',
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
              {character.comics.available}
            </div>
          </div>

          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                Séries
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {character.series.available}
            </div>
          </div>

          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                Histórias
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {character.stories.available}
            </div>
          </div>

          <div className="flex items-center">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                Eventos
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {character.events.available}
            </div>
          </div>
        </div>

        <button
          onClick={() => onCharacterNavigation(character)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          VER MAIS
          <MoveUpRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
