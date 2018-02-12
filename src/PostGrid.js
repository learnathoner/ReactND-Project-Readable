import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { selectCategory } from './actions/actions'

class PostGrid extends Component {

  componentWillMount() {
    const { selectedCategory, category = 'All', changeCategory } = this.props;

    if (selectedCategory !== category) {
      changeCategory(category);
    }
  }

  render() {
    const { posts } = this.props

    return (<div className="posts-container">
        <ul className="posts">
          {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
          {posts &&
            posts.map(post => (
              <li className="post" key={post.id}>
                <Post post={post} />
              </li>
            ))}
        </ul>
      </div>
    )
  }

} 

const mapStateToProps = (state, ownProps) => {
  // Maps post IDs from state.postsByCategory to post in state.postsById
  const postIDs = state.postsByCategory[state.selectedCategory].items;
  const posts = postIDs && postIDs.map((id) => state.postsByID[id]);

  return {
    selectedCategory: state.selectedCategory,
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => { dispatch(selectCategory(category)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid)