import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchComments, addNewComment } from './actions/actions'
import Post from './Post'
import SortBar from './SortBar'
import Comment from './Comment'
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
    
    if (!author || !body) {
      alert('Must have username and comment text')
    } else {
      
      const newComment = {
        id,
        parentId,
        timestamp,
        body,
        author,
      }

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

        <SortBar sortType="comments" />

        <div className="comments">
          {commentsByID && commentsByID.map((comment) => (
            < Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let comments;

  // If commentsByPost loaded in state, assigns a copy of them to "comments"
  if (state.commentsByPost[ownProps.match.params.id]) {
    comments = state.commentsByPost[ownProps.match.params.id].filter(comment => {
      return !comment.deleted
    })
    ;
  }

  // If comments loaded and sorterType "comments", sorts comments using sorter
  if (comments && state.sorter.sortType === 'comments') {
    const { criteria, order } = state.sorter;

    comments = comments.sort((comment1, comment2) => {
      return order === 'ascending'
        ? comment1[criteria] - comment2[criteria]
        : comment2[criteria] - comment1[criteria]
    })
  }

  return {
    postByID: state.postsByID[ownProps.match.params.id],
    commentsByID: comments,
    sorter: state.sorter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCategory: () => { dispatch(selectCategory('')) },
    getComments: (id) => { dispatch(fetchComments(id)) },
    addNewComment: (comment) => { dispatch(addNewComment(comment)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)