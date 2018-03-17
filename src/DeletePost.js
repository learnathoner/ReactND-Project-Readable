import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePostThunk, invalidateCategory } from "./actions/actions";

class DeletePost extends Component {
  deletePost = () => {
    const { id, category } = this.props.post;
    const { deletePostThunk, invalidateCategories } = this.props;
    // TODO: Create styled alert window
    const deleteOption = window.confirm("Delete post\nAre you sure?");

    // If select yes to prompt, deletes from postsByID and postsByCategory, refreshes cat
    if (deleteOption) {
      deletePostThunk(id, category).then(() => invalidateCategories(category));
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.deletePost}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    deletePostThunk: (id, category) => dispatch(deletePostThunk(id, category)),
    invalidateCategories: category => {
      dispatch(invalidateCategory(category));
      dispatch(invalidateCategory("all"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePost);
