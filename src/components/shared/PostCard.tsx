import { timeAgo } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

type PostCardProps = {
  post: Models.Document
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[200px]">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {timeAgo(post.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link to={`/update-post/${post.$id}`}>
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
    </div>
  )
}
