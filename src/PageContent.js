import React from 'react'
import PostGrid from './PostGrid'
const PageContent = ({ posts }) => (
  <div className="page-content">
          <div className="posts-bar">
            <p className="posts-bar-text">Sort By:</p>
          </div>
          <PostGrid posts={posts}/>
        </div>
)

export default PageContent