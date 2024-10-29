import { charactersMetaData } from '@/test/mocks/characters'
import type { CharactersMetaData } from '@/types/types'
import { http, HttpResponse } from 'msw'

interface Param {
  characterId: string
}

export const getCharacterMock = http.get<Param, never, CharactersMetaData>(
  '/v1/public/characters/:characterId',
  async ({ params }) => {
    if (params.characterId !== '1011334') {
      return HttpResponse.json(null, { status: 404 })
    }

    return HttpResponse.json(charactersMetaData)
  }
)
