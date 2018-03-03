import React, { Component } from 'react'
import Modal from 'react-modal'

class EditComment extends Component {
  state = {
    modalShowing: false,
    editedComment: {
      parentId: '',
      id: '',
      body: ''
    } 
  }

  // EDIT POST
  // When edit clicked, opens Modal and sets editedComment to current post info
  editComment = (editId) => {
    const { parentId, id, body } = this.props.comment;
    
    this.setState({
      modalShowing: true,
      editedComment: {
        parentId,
        id,
        body,
      }
    })    
  }

  // HANDLE CHANGE
  // When input in modal changed, changes corresponding field in state.editedComment
  handleChange = (e) => {
    this.setState({
      editedComment: {
        ...this.state.editedComment,
        [e.target.id] : e.target.value
      }
    })
  }

  // SUBMIT EDIT
  // Sends post to be updated in API, then updates post in postsById, closes Modal
  submitEdit = () => {
    const { editedComment } = this.state
    const { updatePost } = this.props

    updatePost(editedComment)
    this.closeModal();
  }

  // CLOSE MODAL
  // REsets the state.editedComment, closes Modal
  closeModal = () => {
    this.setState({
      modalShowing: false,
      editedComment: {
        id:  '',
        author: '',
        category: '',
        body: '',
        title: ''
      }
    })
  }

  // DELETE POST
  // Handles post deletion
  deletePost = () => {
    const { id } = this.state.editedComment
    const { deletePostThunk, invalidateCategories, selectedCategory } = this.props

    // TODO: Create styled alert window
    const deleteOption = window.confirm("Delete post\nAre you sure?")

    // If select yes to prompt, deletes from postsByID and postsByCategory, refreshes cat
    if (deleteOption) {
      deletePostThunk(id, selectedCategory);
      invalidateCategories(selectedCategory)
      this.closeModal();
    }
  }

  render () {
    const { modalShowing, editedComment } = this.state;

    return (
      <div>
        <a href="#" onClick={this.editComment}>
          Edit
        </a>

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
            <div className="add-post-user">
              Author: {editedComment.author}
            </div>
            <div className="add-post-body">
              Body:
              <textarea value={editedComment.body} id="body" onChange={this.handleChange} />
            </div>
            <div />
              <button onClick={this.submitEdit}>Submit</button>
              <button onClick={this.closeModal}>Cancel</button>
            <div />
            <button onClick={this.deletePost}>DELETE</button>
          </div>
        </Modal>
      </div>
      
    )
  }
}

export default EditComment
