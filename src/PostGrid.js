import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { selectCategory, fetchPostsIfNeeded} from './actions/actions'

class PostGrid extends Component {

  render() {
    const { posts } = this.props
    const currentCategory = this.props.match.params.category || 'all';
    const { categories,
      selectedCategory, 
      changeCategory,
      fetchPostsIfNeeded } = this.props;

      
    // If URL is different than currently selected category
    if (selectedCategory !== currentCategory) {
        
      // Change selectedCategory to current slug /r/:category
      changeCategory(currentCategory);

      // If current slug is in categories, load posts for it
      if (categories && selectedCategory in categories) {
        fetchPostsIfNeeded(currentCategory);
      }
    }

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
  // Checks state.selectedCategory is loaded to collect postIDs
  const postIDs = state.postsByCategory[state.selectedCategory]
  ? state.postsByCategory[state.selectedCategory].items
  : [];
  
  // Maps post IDs from state.postsByCategory to post in state.postsById
  let posts = postIDs && postIDs.map((id) => state.postsByID[id]);

  // If sorter active, sort posts based on criteria and order
  if (state.sorter.criteria) {
    const { criteria, order } = state.sorter;

    posts = posts.sort((post1, post2) => {
      return order === 'ascending'
        ? post1[criteria] - post2[criteria]
        : post2[criteria] - post1[criteria]
    })
  }

  return {
    categories: state.categories.byName,
    selectedCategory: state.selectedCategory,
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => { dispatch(selectCategory(category)) },
    fetchPostsIfNeeded: (category) => dispatch(fetchPostsIfNeeded(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid)