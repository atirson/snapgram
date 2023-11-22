import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createPost,
  createUserAccount,
  getRecentPosts,
  signInAccount,
  signOutAccount,
} from '@/lib/appwrite/api'
import { INewPost, INewUser } from '@/types'
import { queryClient } from '@/lib/react-query/QueryProvider'
import { QUERY_KEYS } from '@/lib/react-query/queryKeys'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
    onError: (error) => {
      console.error('useCreateUserAccount', error)
    },
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  })
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
    },
  })
}

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  })
}
