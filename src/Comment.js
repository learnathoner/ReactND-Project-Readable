import React, { Component } from 'react'
import moment from 'moment'

class Comment extends Component {
  // PropTypes = comment

  render () {
    const { comment } = this.props

    return (
      <div className="comment-container">
        <div className="comment-rate-buttons-container">
          Rate
        </div>
        <div className="comment-content-container">
          <div className="comment-header">
            <span className="comment-author">{comment.author} </span>
             {comment.voteScore} points 
             submitted {moment.utc(comment.timestamp).fromNow()}
          </div>
          <div className="comment-body">
            {comment.body}
          </div>
          <div className="comment-footer">
            Edit reply
          </div>
        </div>
      </div>
    )
    

  }

}

export default Comment