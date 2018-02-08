import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => (
  <div className="post-container">
    <div className="post-rank">
      <span>Rank</span>  
    </div>
    <div className="post-vote">
      <span>Vote:</span> {post.voteScore}
    </div>
    <div className="post-content">
      <p className="post-title">
        <Link 
          to={`/post/${post.id}`}
          style={{
            textDecoration: 'none'
          }}
        >
          {post.title}
        </Link>
      </p>
      <p className="post-body">{post.body}</p>
      <div className="post-info">
        <p className="post-author">
          <span>By:</span> {post.author}
        </p>
        <p className="post-category">
          <span>Posted in:</span> {post.category}
        </p>
      </div>
    </div>
  </div>
)

export default Post