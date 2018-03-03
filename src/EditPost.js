import React, { Component } from "react";
import { connect } from "react-redux";
import {
  selectCategory,
  fetchPostsIfNeeded,
  updatePostHandler,
  deletePostThunk,
  invalidateCategory
} from "./actions/actions";
import Modal from "react-modal";

class EditPost extends Component {
  state = {
    modalShowing: false,
    editedPost: {
      id: "",
      author: "",
      category: "",
      body: "",
      title: ""
    }
  };

  // EDIT POST
  // When edit clicked, opens Modal and sets editedPost to current post info
  editPost = editId => {
    const { id, author, category, body, title } = this.props.post;

    this.setState({
      modalShowing: true,
      editedPost: {
        id,
        author,
        category,
        body,
        title
      }
    });
  };

  // HANDLE CHANGE
  // When input in modal changed, changes corresponding field in state.editedPost
  handleChange = e => {
    this.setState({
      editedPost: {
        ...this.state.editedPost,
        [e.target.id]: e.target.value
      }
    });
  };

  // SUBMIT EDIT
  // Sends post to be updated in API, then updates post in postsById, closes Modal
  submitEdit = () => {
    const { editedPost } = this.state;
    const { updatePost } = this.props;

    updatePost(editedPost);
    this.closeModal();
  };

  // CLOSE MODAL
  // REsets the state.editedPost, closes Modal
  closeModal = () => {
    this.setState({
      modalShowing: false,
      editedPost: {
        id: "",
        author: "",
        category: "",
        body: "",
        title: ""
      }
    });
  };

  // DELETE POST
  // Handles post deletion
  deletePost = () => {
    const { id } = this.state.editedPost;
    const { deletePostThunk, invalidateCategories } = this.props;
    const selectedCategory = this.props.post.category;

    // TODO: Create styled alert window
    const deleteOption = window.confirm("Delete post\nAre you sure?");

    // If select yes to prompt, deletes from postsByID and postsByCategory, refreshes cat
    if (deleteOption) {
      deletePostThunk(id, selectedCategory).then(() => invalidateCategories(selectedCategory));
      this.closeModal();
    }
  };

  render() {
    const { modalShowing, editedPost } = this.state;
    const { post } = this.props;

    return (
      <div>
        <a
          href="#"
          onClick={() => {
            this.editPost(post.id);
          }}
        >
          Edit
        </a>
        <Modal
          // DISPLAYED WHEN EDITING POST
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
            <div className="add-post-user">Author: {editedPost.author}</div>
            <div className="add-post-category">
              Category: {editedPost.category}
            </div>
            <div className="add-post-title">
              Title:
              <input
                type="text"
                onChange={this.handleChange}
                value={editedPost.title}
                id="title"
              />
            </div>
            <div className="add-post-body">
              Body:
              <textarea
                value={editedPost.body}
                id="body"
                onChange={this.handleChange}
              />
            </div>
            <hr />
            <button onClick={this.submitEdit}>Submit</button>
            <button onClick={this.closeModal}>Cancel</button>
            <hr />
            <button onClick={this.deletePost}>DELETE</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updatePost: post => dispatch(updatePostHandler(post)),
    deletePostThunk: (id, category) => dispatch(deletePostThunk(id, category)),
    invalidateCategories: category => {
      dispatch(invalidateCategory(category));
      dispatch(invalidateCategory("all"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
