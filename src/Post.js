import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FaArrowCircleUp, FaArrowCircleDown} from 'react-icons/lib/fa'

const Post = ({ post, editPost }) => (

  <div className="post-container">
    <div className="post-rank">
      <div className="post-rank-up">
        <FaArrowCircleUp style={{
          width: "25px", 
          height: "25px", 
          fill: "blue"
        }} />
        </div>
      <div className="post-rank-down">
        <FaArrowCircleDown style={{
          width: "25px",
          height: "25px", 
          fill: "blue"
        }} />
      </div>
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
          <span>Posted in:</span> 
          <Link 
            to={`/r/${post.category}`}
            style={{
              textDecoration: 'none'
            }}
          >
            {post.category}
          </Link>
        </p>
        <p className="post-comment-count">
          <Link 
            to={`/post/${post.id}`}
            style={{
              textDecoration: 'none'
            }}
          >
            <span>Comments:</span> {post.commentCount}
          </Link>
        </p>
        <p className="post-time-stamp">
          <span>Posted On: </span> 
          {moment.utc(post.timestamp).format('l')}
        </p>
        <p>
          <a href="#" onClick={() => editPost(post.id)}>Edit</a>
        </p>
      </div>
    </div>
  </div>
)

export default Post