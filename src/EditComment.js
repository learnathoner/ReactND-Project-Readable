import React, { Component } from "react";
import Modal from "react-modal";
import { updateComment, deleteCommentThunk } from "./actions/actions";
import { connect } from "react-redux";

class EditComment extends Component {
  state = {
    modalShowing: false,
    editedComment: {
      parentId: "",
      id: "",
      body: "",
      timestamp: ""
    }
  };

  // EDIT POST
  // When edit clicked, opens Modal and sets editedComment to current post info
  editComment = editId => {
    const { parentId, id, body } = this.props.comment;

    this.setState({
      modalShowing: true,
      editedComment: {
        parentId,
        id,
        body
      }
    });
  };

  // HANDLE CHANGE
  // When input in modal changed, changes corresponding field in state.editedComment
  handleChange = e => {
    this.setState({
      editedComment: {
        ...this.state.editedComment,
        [e.target.id]: e.target.value
      }
    });
  };

  // SUBMIT EDIT
  // Sends post to be updated in API, then updates post in postsById, closes Modal
  submitEdit = () => {
    let { editedComment } = this.state;
    const { updateComment } = this.props;

    editedComment.timestamp = Date.now();

    updateComment(editedComment);
    this.closeModal();
  };

  // CLOSE MODAL
  // REsets the state.editedComment, closes Modal
  closeModal = () => {
    this.setState({
      modalShowing: false,
      editedComment: {
        parentId: "",
        id: "",
        body: "",
        timestamp: ""
      }
    });
  };

  // DELETE POST
  // Handles post deletion
  deleteComment = () => {
    const { id } = this.state.editedComment;
    const { deleteCommentThunk } = this.props;

    // TODO: Create styled alert window
    const deleteOption = window.confirm("Delete comment\nAre you sure?");

    // If select yes to prompt, deletes from postsByID and postsByCategory, refreshes cat
    if (deleteOption) {
      deleteCommentThunk(id);
      this.closeModal();
    }
  };

  render() {
    const { modalShowing, editedComment } = this.state;

    return (
      <div>
        <span class="edit-link" onClick={this.editComment}>
          Edit
        </span>

        <Modal
          // DISPLAYED WHEN EDITING COMMENT
          // className='modal'
          // overlayClassName='overlay'
          isOpen={modalShowing}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          // Figure out whether to use hid app element below
          ariaHideApp={false}
        >
          <div className="edit-comment-input">
            <div className="edit-comment-heading">
              <h2>Edit Comment:</h2>
            </div>
            <div className="add-post-user">Author: {editedComment.author}</div>
            <div className="add-post-body">
              Body:
              <textarea
                value={editedComment.body}
                id="body"
                onChange={this.handleChange}
              />
            </div>
            <div />
            <button onClick={this.submitEdit}>Submit</button>
            <button onClick={this.closeModal}>Cancel</button>
            <div />
            <button onClick={this.deleteComment}>DELETE</button>
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
    updateComment: comment => dispatch(updateComment(comment)),
    deleteCommentThunk: id => dispatch(deleteCommentThunk(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
