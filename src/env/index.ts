import { z } from 'zod'

const envSchema = z.object({
  VITE_APPWRITE_URL: z.string().default('https://cloud.appwrite.io/v1'),
  VITE_APPWRITE_PROJECT_ID: z.string(),
  VITE_APPWRITE_STORAGE_ID: z.string(),
  VITE_APPWRITE_DATABASE_ID: z.string(),
  VITE_APPWRITE_SAVES_COLLECTION_ID: z.string(),
  VITE_APPWRITE_POSTS_COLLECTION_ID: z.string(),
  VITE_APPWRITE_USERS_COLLECTION_ID: z.string(),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  console.log(`⚠️ Invalid environment variables! ${_env.error}`)

  process.exit(1)
}

export const env = _env.data
