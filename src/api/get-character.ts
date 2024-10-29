import { api } from '@/lib/axios'
import type { CharactersMetaData } from '@/types/types'
import { generateParams } from '@/utils/generateParams'

export async function getCharacter(characterId: string) {
  const { ts, hash, limit, offset, publicKey } = generateParams()

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

  return character.data.results[0]
}
