import React, { Component } from "react";
import { connect } from "react-redux";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/lib/fa";
import { updateVote, updateCommentVote } from "./actions/actions";

class VoteArrows extends Component {
  //PropTypes post, voteObj

  submitVote(voteType) {
    const { voteObj, elem, sendVote, sendCommentVote } = this.props;


    if (voteObj === "comment") {
      const comment = {
        id: elem.id,
        parentId: elem.parentId,
        option: voteType
      };

      sendCommentVote(comment);
    } else if (voteObj === "post") {
      const post = {
        id: elem.id,
        category: elem.category,
        option: voteType
      };

      sendVote(post);
    }
  }

  render() {
   
    return (
      <div className="post-rank">
        <div
          className="upVote"
          onClick={() => {
            this.submitVote("upVote");
          }}
        >
          <FaArrowCircleUp
            className="up-arrow"
            style={{
              width: "25px",
              height: "25px",
              fill: "blue"
            }}
          />
        </div>
        <div
          className="downVote"
          onClick={() => {
            this.submitVote("downVote");
          }}
        >
          <FaArrowCircleDown
            className="down-arrow"
            style={{
              width: "25px",
              height: "25px",
              fill: "blue"
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.postsByID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendVote: (id, vote) => dispatch(updateVote(id, vote)),
    sendCommentVote: comment => dispatch(updateCommentVote(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteArrows);
