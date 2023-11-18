import { Routes, Route } from 'react-router-dom'

import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  People,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from './_root/pages'

import { AuthLayout } from './_auth/AuthLayout'
import { RootLayout } from './_root/RootLayout'
import { SigninForm } from './_auth/forms/SigninForm'
import { SignupForm } from './_auth/forms/SignupForm'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/people" element={<People />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/updata-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}
