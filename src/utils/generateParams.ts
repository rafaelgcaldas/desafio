import { env } from '@/env'
import { md5 } from 'js-md5'

export function generateParams() {
  const ts = Date.now()
  const privateKey = env.VITE_API_MARVEL_PRIVATE_KEY
  const publicKey = env.VITE_API_MARVEL_PUBLIC_KEY

  return {
    limit: 20,
    offset: 0,
    ts: Date.now(),
    publicKey: env.VITE_API_MARVEL_PUBLIC_KEY,
    hash: md5(ts + privateKey + publicKey),
  }
}
