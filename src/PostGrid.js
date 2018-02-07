import React from 'react'
import Post from './Post'

const PostGrid = ({ posts }) => (
  <div className="posts-container">
      <ul className="posts">
        {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
        {posts.length > 0 &&
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
      </ul>
    </div>
)

export default PostGrid