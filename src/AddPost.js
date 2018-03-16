import React, { Component } from "react";
import Modal from "react-modal";
import uuid from "uuid";
import { addPost } from "./FeedsAPI";
import { connect } from "react-redux";
import { invalidateCategory } from "./actions/actions";

class AddPost extends Component {
  // PropTypes = selectedCategory

  state = {
    modalShowing: false
  };

  openModal = () => this.setState({ modalShowing: true });

  closeModal = () => this.setState({ modalShowing: false });

  submitPost = () => {
    const id = uuid();
    const author = document.getElementById("input-username").value;
    const category = document.getElementById("input-category").value;
    const title = document.getElementById("input-title").value;
    const body = document.getElementById("input-body").value;
    const timestamp = Date.now();
    const { invalidateCategories } = this.props;

    addPost({
      id,
      author,
      category,
      title,
      body,
      timestamp
    });

    invalidateCategories(category);

    this.closeModal();
  };

  render() {
    const { modalShowing } = this.state;
    const { allCategories, selectedCategory } = this.props;

    return (
      <div>
        <button className="add-post-button" onClick={this.openModal}>
          Add Post
        </button>

        <Modal
          // className='modal'
          // overlayClassName='overlay'
          isOpen={modalShowing}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          // Figure out whether to use hid app element below
          ariaHideApp={false}
        >
          <div className="add-post-input">
            <div className="add-post-heading">
              <h2>Add New Post:</h2>
            </div>
            <div className="add-post-user">
              UserName:
              <input type="text" placeholder="user name" id="input-username" />
            </div>
            <div className="add-post-category">
              Category:
              {/* <input type="text" placeholder="category" id="input-category" /> */}
              <select
                name="input-category"
                id="input-category"
                value={selectedCategory !== "all" ? selectedCategory : ""}
              >
                {allCategories &&
                  allCategories
                    .filter(category => category !== "all")
                    .map(category => (
                      <option value={category}>{category}</option>
                    ))}
              </select>
            </div>
            <div className="add-post-title">
              Title:
              <input type="text" placeholder="title" id="input-title" />
            </div>
            <div className="add-post-body">
              Body:
              <textarea placeholder="body" id="input-body" />
            </div>
            <button onClick={this.submitPost}>Submit</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const MapStateToProps = (state, ownProps) => {
  return {
    allCategories: state.categories.allCategories
  };
};

const MapDispatchToProps = dispatch => {
  return {
    invalidateCategories: category => {
      dispatch(invalidateCategory(category));
      dispatch(invalidateCategory("all"));
    }
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(AddPost);
