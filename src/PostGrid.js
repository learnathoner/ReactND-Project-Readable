import React from 'react'
import Post from './Post'

const PostGrid = ({ posts, category }) => {
  let visiblePosts = [...posts];

  if (category) {
    visiblePosts = posts.filter(post => post.category === category);
  }

  return (<div className="posts-container">
      <ul className="posts">
        {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
        {visiblePosts.length > 0 &&
          visiblePosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
      </ul>
    </div>
)

}

export default PostGrid