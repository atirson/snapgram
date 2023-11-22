import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PostValidation } from '@/lib/validation'
import { Textarea } from '@/components/ui/textarea'
import { FileUploader } from '@/components/shared/FileUploader'
import { Models } from 'appwrite'
import { useCreatePost } from '@/lib/react-query/queriesAndMutation'
import { useUserContext } from '@/context/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@/components/shared/Loader'

type PostFormProps = {
  post?: Models.Document
}

export const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost()
  const { user } = useUserContext()
  const { toast } = useToast()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags : '',
    },
  })

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log('Post Submited', values)
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if (!newPost) {
      toast({
        title: 'Please try again',
      })
    }

    navigate('/')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Expression, React, NextJS, Vite, etc"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            className="shad-button_primary whitespace-nowrap"
            type="submit"
          >
            {isLoadingCreate ? (
              <div className="flex-center gap-2">
                <Loader />
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
