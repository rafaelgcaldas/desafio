import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_MARVEL_PUBLIC_KEY: z.string(),
  VITE_API_MARVEL_PRIVATE_KEY: z.string(),
})

export const env = envSchema.parse(import.meta.env)
