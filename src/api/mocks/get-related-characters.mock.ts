import { relatedCharactersData } from '@/test/mocks/related-characters-data'
import { http, HttpResponse } from 'msw'

interface Param {
  characterId: string
}

export const getCharactersMock = http.get<Param, never>(
  '/v1/public/characters/:characterId/comics',
  async () => {
    const relatedCharacters = {
      ...relatedCharactersData,
      data: {
        ...relatedCharactersData.data,
      },
    }
    return HttpResponse.json(relatedCharacters)
  }
)
