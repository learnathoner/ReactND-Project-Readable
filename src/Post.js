import React from 'react'

const Post = ({ post }) => (
  <div className="post-container">
    <span className="post-rank">Rank</span>
    <div className="post-vote">
      <span>Vote:</span> {post.voteScore}
    </div>
    <div className="post-content">
      <p className="post-title">
        <span>{post.title}</span>
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