import { api } from '@/lib/axios'
import type { RelatedCharacter } from '@/types/types'
import { generateParams } from '@/utils/generateParams'

export async function getRelatedCharacter(
  characterId: string
): Promise<RelatedCharacter[]> {
  const { ts, hash, limit, offset, publicKey } = generateParams()

  const response = await api.get(
    `/v1/public/characters/${characterId}/comics`,
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

  const characters = response.data

  return characters.data.results[0].characters.items
}
