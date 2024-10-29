import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { generateParams } from '@/utils/generateParams'

export interface getCharactersQuery {
  searchTerm: string
}

export async function searchCharacters({ searchTerm }: getCharactersQuery) {
  const { ts, hash, publicKey } = generateParams()

  const response = await api.get<CharactersMetaData>('/v1/public/characters', {
    params: {
      nameStartsWith: searchTerm,
      ts,
      hash,
      apikey: publicKey,
    },
  })

  const character = response.data

  return character.data.results
}
