import React, { Component } from 'react'
import Post from './Post'
import AddPost from './AddPost'
import SortBar from './SortBar'
import { connect } from 'react-redux'
import { 
  selectCategory, 
  fetchPostsIfNeeded, 
} from './actions/actions'
import Modal from 'react-modal'
import { postsByID } from './reducers/reducers';

class PostGrid extends Component {

  render() {
    const { posts } = this.props
    const currentCategory = this.props.match.params.category || 'all';
    const { categories,
      allCategories,
      selectedCategory, 
      changeCategory,
      fetchPostsIfNeeded } = this.props;
      
    // If URL is different than currently selected category, change selected category to slug
    if (selectedCategory !== currentCategory) {
      changeCategory(currentCategory);
    }

    // Checks each render if necessary to reload posts
    if (categories && selectedCategory in categories) {
      fetchPostsIfNeeded(currentCategory);
    }

    return (
      <div className="posts-container">
        <SortBar sortType="posts" />
        <ul className="posts">
          {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
          {posts &&
            posts.map(post => (
              <li className="post" key={post.id}>
                <Post post={post} />
              </li>
            ))}
        </ul>

        <AddPost selectedCategory={selectedCategory} />
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
  if (state.sorter.sortType === 'posts') {
    // TODO: Separate into sorting function
    const { criteria, order } = state.sorter;

    posts = posts.sort((post1, post2) => {
      return order === 'ascending'
        ? post1[criteria] - post2[criteria]
        : post2[criteria] - post1[criteria]
    })
  }

  return {
    categories: state.categories.byName,
    allCategories: state.categories.allCategories,
    selectedCategory: state.selectedCategory,
    posts: posts,
    postsByID: state.postsByID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => { dispatch(selectCategory(category)) },
    fetchPostsIfNeeded: (category) => dispatch(fetchPostsIfNeeded(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid)