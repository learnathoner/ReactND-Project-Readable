import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class PostPage extends Component {
  render () {
    const { postByID } = this.props;

    if (!postByID) {
      return (
        <div>No Match Found</div>
      )
    }

    return (
      <div>
        <Post post={postByID} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    postByID: state.postsByID[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(PostPage)