import type { Characters, CharactersMetaData } from '@/types/types'
import { create } from 'zustand'

export interface AppState {
  characters: CharactersMetaData | undefined
  favoritesList: Characters[]
  recentlyVisitedCharactersList: Characters[]
  setCharacters: (characters: CharactersMetaData) => void
  addFavoriteCharacter: (favoriteCharacter: Characters) => void
  addRecentlyVisitedCharacter: (favoriteCharacter: Characters) => void
}

export const useStore = create<AppState>((set, get) => {
  return {
    characters: undefined,
    favoritesList: [],
    recentlyVisitedCharactersList: [],

    setCharacters: (characters: CharactersMetaData) => {
      const { favoritesList } = get()

      const charactersMetaData = updateFavoritesInCharacters(
        characters,
        favoritesList
      )

      set({ characters: charactersMetaData })
    },

    addFavoriteCharacter: (favoriteCharacter: Characters) => {
      const { favoritesList, characters, recentlyVisitedCharactersList } = get()

      let newCharacters

      if (characters) {
        newCharacters = updateCharacterFavoriteStatus(
          characters,
          favoriteCharacter.id
        )
      }

      const isFavorite = isCharacterInList(favoritesList, favoriteCharacter.id)

      if (isFavorite) {
        const newFavoritesList = favoritesList.filter(
          (character) => character.id !== favoriteCharacter.id
        )

        const newRecentlyVisitedList = recentlyVisitedCharactersList.map(
          (character) => {
            const isFavorite = newFavoritesList.some(
              (favorite) => favorite.id === character.id
            )

            return {
              ...character,
              favorite: isFavorite ? true : false,
            }
          }
        )

        set({
          characters: newCharacters,
          favoritesList: newFavoritesList,
          recentlyVisitedCharactersList: newRecentlyVisitedList,
        })

        return
      }

      const isVisited = isCharacterInList(
        recentlyVisitedCharactersList,
        favoriteCharacter.id
      )

      let newVisitedCharacters = recentlyVisitedCharactersList

      if (isVisited) {
        newVisitedCharacters = updateVisitedCharacterFavoriteStatus(
          recentlyVisitedCharactersList,
          favoriteCharacter.id
        )
      }

      set({
        characters: newCharacters,
        favoritesList: [...favoritesList, favoriteCharacter],
        recentlyVisitedCharactersList: newVisitedCharacters,
      })
    },

    addRecentlyVisitedCharacter: (characterVisited: Characters) => {
      const { recentlyVisitedCharactersList, favoritesList } = get()

      const selectedCharacter = recentlyVisitedCharactersList.find(
        (character) => character.id === characterVisited.id
      )

      if (selectedCharacter) {
        return
      }

      const isFavorite = isCharacterInList(favoritesList, characterVisited.id)

      const newCharacter = {
        ...characterVisited,
        favorite: isFavorite,
      }

      set({
        recentlyVisitedCharactersList: [
          ...recentlyVisitedCharactersList,
          newCharacter,
        ],
      })
    },
  }
})

function isCharacterInList(list: Characters[], characterId: number): boolean {
  return list.some((character) => character.id === characterId)
}

function updateVisitedCharacterFavoriteStatus(
  visitedList: Characters[],
  favoriteCharacterId: number
) {
  return visitedList.map((character) => {
    if (character.id === favoriteCharacterId) {
      return {
        ...character,
        favorite: true,
      }
    }

    return character
  })
}

function updateCharacterFavoriteStatus(
  characters: CharactersMetaData,
  favoriteCharacterId: number
) {
  return {
    ...characters,
    data: {
      ...characters?.data,
      results: characters?.data.results.map((character) => {
        if (character.id === favoriteCharacterId) {
          return {
            ...character,
            favorite: !character.favorite,
          }
        }
        return character
      }),
    },
  }
}

function updateFavoritesInCharacters(
  characters: CharactersMetaData,
  favoritesList: Characters[]
): CharactersMetaData {
  const updatedResults = characters.data.results.map((character) => {
    const isFavorite = favoritesList.some(
      (favorite) => favorite.id === character.id
    )
    return {
      ...character,
      favorite: isFavorite ? true : character.favorite || false,
    }
  })

  return {
    ...characters,
    data: {
      ...characters.data,
      results: updatedResults,
    },
  }
}
