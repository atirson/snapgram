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