import { charactersMetaData } from '@/test/mocks/characters'
import type { CharactersMetaData } from '@/types/types'
import { http, HttpResponse } from 'msw'

interface PathParam {
  characterId: string
}

interface QueryParams {
  characterId: string
  nameStartsWith: string
  ts: string
  hash: string
  apikey: string
}

export const searchCharacterMock = http.get<
  PathParam,
  QueryParams,
  CharactersMetaData
>('/v1/public/characters/:characterId', async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const nameStartsWith = searchParams.get('nameStartsWith') || ''

  const charactersFilter = charactersMetaData.data.results.filter((character) =>
    character.name.includes(nameStartsWith)
  )

  const newCharatersMetaData = {
    ...charactersMetaData,
    data: {
      ...charactersMetaData.data,
      results: charactersFilter,
    },
  }

  return HttpResponse.json(newCharatersMetaData)
})
