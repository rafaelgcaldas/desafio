import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { getCharacterMock } from './get-character-mock'
import { getCharactersMock } from './get-characters-mock'
import { searchCharacterMock } from './search-characters-mock'
import { getRelatedCharacterMock } from './get-related-characters.mock'

export const worker = setupWorker(
  getCharacterMock,
  getCharactersMock,
  searchCharacterMock,
  getRelatedCharacterMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
