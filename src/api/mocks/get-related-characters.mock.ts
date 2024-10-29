import { relatedCharactersData } from '@/test/mocks/related-characters-data'
import { http, HttpResponse } from 'msw'

interface Param {
  characterId: string
}

export const getRelatedCharacterMock = http.get<Param, never>(
  '/v1/public/characters/:characterId/comics',
  async () => {
    return HttpResponse.json(relatedCharactersData)
  }
)
