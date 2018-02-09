import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchComments } from './actions/actions'
import Post from './Post'

class PostPage extends Component {
  componentDidMount() {
    this.props.clearCategory();
    this.props.getComments(this.props.match.params.id);
  }

  render () {
    const { postByID, clearCategory, commentsByID } = this.props;

    if (!postByID) {
      return (
        <div>No Match Found</div>
      )
    }

    return (
      <div>
        <div className="post">
          <Post post={postByID} />
        </div>

        <div className="comment-input">
          <textarea name="comment" id="comment-box" placeholder="Leave Comments Here" />
        </div>

        <div className="comments">
          {commentsByID && commentsByID.map((comment) => (
            <div>Comment: {comment.body}</div>
          ))}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postByID: state.postsByID[ownProps.match.params.id],
    commentsByID: state.commentsByID[ownProps.match.params.id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCategory: () => { dispatch(selectCategory('')) },
    getComments: (id) => { dispatch(fetchComments(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)