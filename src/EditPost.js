import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePostHandler } from "./actions/actions";
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

  render() {
    const { modalShowing, editedPost } = this.state;
    const { post } = this.props;

    return (
      <div>
        <span
          class="edit-link"
          onClick={() => {
            this.editPost(post.id);
          }}
        >
          Edit
        </span>
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
    updatePost: post => dispatch(updatePostHandler(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
