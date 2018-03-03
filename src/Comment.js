import React, { Component } from 'react'
import VoteArrows from './VoteArrows'
import EditComment from './EditComment'
import moment from 'moment'

class Comment extends Component {
  // PropTypes = comment

  render () {
    const { comment } = this.props

    return (
      <div className="comment-container">
        <VoteArrows voteObj="comment" elem={comment} />
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
            <EditComment comment={comment} />
          </div>
        </div>
      </div>
    )
    

  }

}

export default Comment