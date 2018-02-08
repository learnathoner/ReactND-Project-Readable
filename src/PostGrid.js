import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'

class PostGrid extends Component {
  render() {
    const { posts } = this.props

    return (<div className="posts-container">
        <ul className="posts">
          {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
          {posts &&
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
        </ul>
      </div>
    )
  }

} 

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.postsByCategory[state.selectedCategory].items
  }
}

export default connect(mapStateToProps)(PostGrid)