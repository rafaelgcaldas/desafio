import { charactersMetaData as charactersData } from '@/test/mocks/characters'
import type { CharactersMetaData } from '@/types/types'
import { http, HttpResponse } from 'msw'

export const getCharactersMock = http.get<never, never, CharactersMetaData>(
  '/v1/public/characters',
  () => {
    return HttpResponse.json(charactersData)
  }
)
