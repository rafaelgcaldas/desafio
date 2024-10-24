import { env } from '@/env'
import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { md5 } from 'js-md5'

export async function getCharacter(characterId: number) {
  const limit = 20
  const offset = 0
  const ts = Date.now()
  const privateKey = env.VITE_API_MARVEL_PRIVATE_KEY
  const publicKey = env.VITE_API_MARVEL_PUBLIC_KEY

  const hash = md5(ts + privateKey + publicKey)

  const response = await api.get<CharactersMetaData>(
    `/v1/public/characters/${characterId}`,
    {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
      },
    }
  )

  const character = response.data

  console.log(character.data.results)
  return character.data.results[0]
}
