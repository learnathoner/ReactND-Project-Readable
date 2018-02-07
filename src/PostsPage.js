import React from 'react'
import PostGrid from './PostGrid'

const PostsPage = ({ posts, category }) => {

  return (
    <div className="page-content">
            <div className="posts-bar">
              <p className="posts-bar-text">Sort By: </p>
            </div>
            <PostGrid posts={posts} category={category} />
          </div>
  )
}

export default PostsPage