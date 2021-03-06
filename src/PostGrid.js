// Core
import React, { Component } from "react";
import { connect } from "react-redux";
// App
import Post from "./Post";
import AddPost from "./AddPost";
import SortBar from "./SortBar";
import { selectCategory, fetchPostsIfNeeded } from "./actions/actions";

class PostGrid extends Component {
  render() {
    const currentCategory = this.props.match.params.category || "all";
    const {
      posts,
      categories,
      selectedCategory,
      changeCategory,
      fetchPostsIfNeeded
    } = this.props;

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
          {posts && posts.map(post =>
                post && (
                  <li className="post" key={post.id}>
                    <Post post={post} />
                  </li>
                )
            )}
        </ul>

        <AddPost selectedCategory={selectedCategory} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Checks state.selectedCategory is loaded to collect postIDs
  const postIDs = state.postsByCategory[state.selectedCategory]
    ? state.postsByCategory[state.selectedCategory].items
    : [];

  // Maps post IDs from state.postsByCategory to post in state.postsById
  let posts = postIDs && postIDs.map(id => state.postsByID[id]);

  // If sorter active, sort posts based on criteria and order
  if (state.sorter.sortType === "posts") {
    // TODO: Separate into sorting function
    const { criteria, order } = state.sorter;

    posts = posts.sort((post1, post2) => {
      return order === "ascending"
        ? post1[criteria] - post2[criteria]
        : post2[criteria] - post1[criteria];
    });
  }

  return {
    categories: state.categories.byName,
    allCategories: state.categories.allCategories,
    selectedCategory: state.selectedCategory,
    posts: posts,
    postsByID: state.postsByID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCategory: category => {
      dispatch(selectCategory(category));
    },
    fetchPostsIfNeeded: category => dispatch(fetchPostsIfNeeded(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid);
