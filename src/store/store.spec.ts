import { character } from '@/test/mocks/character'
import { charactersMetaData } from '@/test/mocks/characters'
import { beforeEach, describe, expect, it } from 'vitest'
import { useStore as store } from '.'

const initialState = store.getState()

describe('Store', () => {
  beforeEach(() => {
    store.setState(initialState)
  })

  it('should be able set characters data', () => {
    const { setCharacters } = store.getState()

    setCharacters(charactersMetaData)

    const { characters } = store.getState()

    expect(characters).toEqual(charactersMetaData)
    expect(characters?.data.results.length).toEqual(2)
  })

  it('should be able add character in favorite list', () => {
    const { addFavoriteCharacter } = store.getState()

    const newCharacter = {
      ...character,
      favorite: true,
    }
    addFavoriteCharacter(newCharacter)

    const { favoritesList } = store.getState()

    expect(favoritesList[0].name).toEqual(character.name)
    expect(favoritesList.length).toEqual(1)
  })

  it('should be able to remove the character from the favorites list if it already exists', () => {
    const { addFavoriteCharacter } = store.getState()

    addFavoriteCharacter(character)
    addFavoriteCharacter(character)

    const { favoritesList } = store.getState()

    expect(favoritesList.length).toEqual(0)
  })

  it('should be able add character in recently visited characters list', () => {
    const { addRecentlyVisitedCharacter } = store.getState()

    addRecentlyVisitedCharacter(character)

    const { recentlyVisitedCharactersList } = store.getState()

    expect(recentlyVisitedCharactersList[0].name).toEqual(character.name)
    expect(recentlyVisitedCharactersList.length).toEqual(1)
  })

  it('should be able to not add duplicate character in recently visited characters list', () => {
    const { addRecentlyVisitedCharacter } = store.getState()

    addRecentlyVisitedCharacter(character)
    addRecentlyVisitedCharacter(character)

    const { recentlyVisitedCharactersList } = store.getState()

    expect(recentlyVisitedCharactersList[0].name).toEqual(character.name)
    expect(recentlyVisitedCharactersList.length).toEqual(1)
  })

  it('should be able set favorite property with true value', () => {
    const { addRecentlyVisitedCharacter, addFavoriteCharacter } =
      store.getState()

    const newCharacter = {
      ...character,
      favorite: true,
    }

    addFavoriteCharacter(newCharacter)
    addRecentlyVisitedCharacter(character)

    const { recentlyVisitedCharactersList, favoritesList } = store.getState()

    expect(recentlyVisitedCharactersList[0].favorite).toBeTruthy()
    expect(favoritesList[0].favorite).toBeTruthy()
  })
})
