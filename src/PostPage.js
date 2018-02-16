import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchComments, addCommentAction } from './actions/actions'
import Post from './Post'
import { addComment } from './FeedsAPI'
import uuid from 'uuid'

class PostPage extends Component {

  componentDidMount() {
    this.props.clearCategory();
    this.props.getComments(this.props.match.params.id);
  }

  submitComment = () => {
    const id = uuid();
    const parentId = this.props.postByID.id
    const author = document.getElementById('comment-author').value
    const body = document.getElementById('comment-box').value
    const timestamp = Date.now()
    const voteScore = 1;
    
    if (!author || !body) {
      alert('Must have username and comment text')
    } else {
      const newComment = {
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore
      }

      addComment(newComment);
      this.props.addNewComment(newComment);

      document.getElementById('comment-author').value = ''
      document.getElementById('comment-box').value = ''

    }
  }

  render () {
    const { postByID, commentsByID } = this.props;

    if (!postByID) {
      return (
        <div>No Match Found</div>
      )
    }

    return (
      <div>
        <div className="post-page-title">
          <h3>Now Viewing Post:</h3>
        </div>

        <div className="post">
          <Post post={postByID} />
        </div>

        <div className="comment-input">
          <div className="comment-username-input">
            User: <input type="text" id="comment-author" placeholder="user name"/>
          </div>
          <textarea name="comment" id="comment-box" placeholder="Leave Comments Here" />
          <div className="comment-submit-button-container">
            <button 
              className="comment-submit-button"
              onClick={this.submitComment}
            >Submit</button>
          </div>
        </div>

        <div className="comments">
          {commentsByID && commentsByID.map((comment) => (
            <div key={comment.id}>Comment: {comment.body}</div>
          ))}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postByID: state.postsByID[ownProps.match.params.id],
    commentsByID: state.commentsByPost[ownProps.match.params.id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCategory: () => { dispatch(selectCategory('')) },
    getComments: (id) => { dispatch(fetchComments(id)) },
    addNewComment: (comment) => { dispatch(addCommentAction(comment)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)