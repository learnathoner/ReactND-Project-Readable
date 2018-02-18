import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { selectCategory, fetchPostsIfNeeded, updatePostHandler } from './actions/actions'
import Modal from 'react-modal'
import { postsByID } from './reducers/reducers';

class PostGrid extends Component {

  state = {
    modalShowing: false,
    editedPost: {
      id:  '',
      author: '',
      category: '',
      body: '',
      title: ''
    } 
  }

  // EDIT POST
  // When edit clicked, opens Modal and sets editedPost to current post info
  editPost = (editId) => {
    const { postsByID } = this.props;
    const { id, author, category, body, title } = postsByID[editId]

    this.setState({
      modalShowing: true,
      editedPost: {
        id,
        author,
        category,
        body,
        title
      }
    })    
  }

  // HANDLE CHANGE
  // When input in modal changed, changes corresponding field in state.editedPost
  handleChange = (e) => {
    this.setState({
      editedPost: {
        ...this.state.editedPost,
        [e.target.id] : e.target.value
      }
    })
  }

  // SUBMIT EDIT
  // Sends post to be updated in API, then updates post in postsById, closes Modal
  submitEdit = () => {
    const { editedPost } = this.state
    const { updatePost } = this.props

    updatePost(editedPost)
    this.closeModal();
  }

  // CLOSE MODAL
  // REsets the state.editedPost, closes Modal
  closeModal = () => {
    this.setState({
      modalShowing: false,
      editedPost: {
        id:  '',
        author: '',
        category: '',
        body: '',
        title: ''
      }
    })
  }

  render() {
    const { posts } = this.props
    const currentCategory = this.props.match.params.category || 'all';
    const { categories,
      allCategories,
      selectedCategory, 
      changeCategory,
      fetchPostsIfNeeded } = this.props;
    const { modalShowing, editedPost } = this.state

      
    // If URL is different than currently selected category
    // if (selectedCategory !== currentCategory) {
        
      // Change selectedCategory to current slug /r/:category
      changeCategory(currentCategory);

      // Checks each render if necessary to reload posts
      if (categories && selectedCategory in categories) {
        fetchPostsIfNeeded(currentCategory);
      }
    // }

    return (<div className="posts-container">
        <ul className="posts">
          {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
          {posts &&
            posts.map(post => (
              <li className="post" key={post.id}>
                <Post post={post} editPost={this.editPost}/>
              </li>
            ))}
        </ul>
        <Modal
          // className='modal'
          // overlayClassName='overlay'
          isOpen={modalShowing}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          // Figure out whether to use hid app element below
          ariaHideApp={false}
        >
          <div className="edit-post-input">
            <div className="edit-post-heading">
              <h2>Edit Post:</h2>
            </div>
            <div className="add-post-user">
              Author: {editedPost.author}
            </div>
            <div className="add-post-category">
              Category: {editedPost.category}
            </div>
            <div className="add-post-title">
              Title:
              <input type="text" onChange={this.handleChange} value={editedPost.title} id="title" />
            </div>
            <div className="add-post-body">
              Body:
              <textarea value={editedPost.body} id="body" onChange={this.handleChange} />
            </div>
            <hr />
            <button onClick={this.submitEdit}>Submit</button>
            <button onClick={this.closeModal}>Cancel</button>
            <hr />
            <button onClick={this.deletePost}>DELETE</button>
          </div>
        </Modal>
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
    updatePost: (post) => dispatch(updatePostHandler(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid)