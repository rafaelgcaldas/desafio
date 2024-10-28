import { env } from '@/env'
import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { md5 } from 'js-md5'

export interface getCharactersQuery {
  pageIndex: number
  limit: number
}

export async function getCharacters({ pageIndex, limit }: getCharactersQuery) {
  const ts = Date.now()
  const privateKey = env.VITE_API_MARVEL_PRIVATE_KEY
  const publicKey = env.VITE_API_MARVEL_PUBLIC_KEY

  const hash = md5(ts + privateKey + publicKey)

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
