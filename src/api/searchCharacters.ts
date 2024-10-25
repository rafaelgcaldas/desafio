import { env } from '@/env'
import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { md5 } from 'js-md5'

export interface getCharactersQuery {
  searchTerm: string
}

export async function searchCharacters({ searchTerm }: getCharactersQuery) {
  const ts = Date.now()
  const apikey = env.VITE_API_MARVEL_PUBLIC_KEY
  const privateKey = env.VITE_API_MARVEL_PRIVATE_KEY

  const hash = md5(ts + privateKey + apikey)

  const response = await api.get<CharactersMetaData>('/v1/public/characters', {
    params: {
      nameStartsWith: searchTerm,
      ts,
      hash,
      apikey,
    },
  })

  const character = response.data

  return character.data.results
}
