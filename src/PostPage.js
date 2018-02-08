import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory } from './actions/actions'
import Post from './Post'

class PostPage extends Component {
  render () {
    const { postByID, clearCategory } = this.props;

    clearCategory();

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
          <input type="text" name="comment" id="commentBox" />
        </div>

        <div className="comments">
          Comments here
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postByID: state.postsByID[ownProps.match.params.id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCategory: () => { dispatch(selectCategory('')) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)