import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaArrowCircleUp, FaArrowCircleDown} from 'react-icons/lib/fa'
import { updateVote } from './actions/actions'

class VoteArrows extends Component {
  //PropTypes post

  render () {
    const { post, sendVote } = this.props;

    return (
      <div className="post-rank">
        <div className="upVote" 
          onClick={(e) => {
            sendVote({
              id: post.id,
              category: post.category,
              option: "upVote"
            })}
        }>
          <FaArrowCircleUp
            className="up-arrow"
            style={{
              width: "25px", 
              height: "25px", 
              fill: "blue"
            }}
          />
          </div>
        <div className="downVote"
          onClick={(e) => sendVote({
            id: post.id,
            category: post.category,
            option: "downVote"
          })}>
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.postsByID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (id, vote) => dispatch(updateVote(id, vote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteArrows);