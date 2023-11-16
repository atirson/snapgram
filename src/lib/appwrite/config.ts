import { Client, Account, Databases, Storage, Avatars } from 'appwrite'
import { env } from '@/env'

export const appwriteConfig = {
  url: env.VITE_APPWRITE_URL,
  projectId: env.VITE_APPWRITE_PROJECT_ID,
  databaseId: env.VITE_APPWRITE_DATABASE_ID,
  storageId: env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postsCollectionId: env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savesCollectionId: env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
