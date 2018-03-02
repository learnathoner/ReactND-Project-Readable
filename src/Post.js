import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import VoteArrows from './VoteArrows'

class Post extends Component{
  
  render () {
    const { post, editPost } = this.props;

    return (
      <div className="post-container">

        <VoteArrows voteObj='post' elem={post} />

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
  }
}

export default Post;

