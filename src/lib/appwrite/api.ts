import { ID, Query } from 'appwrite'
import { INewUser } from '@/types'
import {
  account,
  appwriteConfig,
  avatars,
  database,
} from '@/lib/appwrite/config'

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    if (!newAccount) throw new Error()

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })

    return newUser
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function saveUserToDB(user: {
  accountId: string
  name: string
  email: string
  imageUrl: URL
  username?: string
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )

    if (!newUser) throw new Error()

    return newUser
  } catch (error) {
    console.error(error)
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password)

    return session
  } catch (error) {
    console.error(error)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw new Error()

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!currentUser) throw new Error()

    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}
