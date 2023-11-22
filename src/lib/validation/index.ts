import { z } from 'zod'

export const SignupValidation = z.object({
  name: z.string().min(3, { message: 'Too short' }).max(50).default(''),
  username: z.string().min(3, { message: 'Too short' }).max(20).default(''),
  email: z.string().email().default(''),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50)
    .default(''),
})

export const SigninValidation = z.object({
  email: z.string().email().default(''),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50)
    .default(''),
})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200).default(''),
  file: z.custom<File[]>(),
  location: z.string().min(3).max(100).default(''),
  tags: z.string(),
})
