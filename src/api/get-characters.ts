import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { generateParams } from '@/utils/generateParams'

export interface getCharactersQuery {
  pageIndex: number
  limit: number
}

export async function getCharacters({ pageIndex, limit }: getCharactersQuery) {
  const { ts, hash, publicKey } = generateParams()

  const response = await api.get<CharactersMetaData>('/v1/public/characters', {
    params: {
      ts,
      apikey: publicKey,
      hash,
      limit,
      offset: pageIndex * limit,
    },
  })

  return response.data
}
