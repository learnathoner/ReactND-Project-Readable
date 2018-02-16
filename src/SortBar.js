import React, { Component } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { setSort } from './actions/actions'

class SortBar extends Component {

  testRegExp = (sortClass) => {
    const sortTest = /^sort-([^-]\w+)-(\w+)/
    const testResult = sortTest.exec(sortClass);
    const criteria = testResult[1];
    const order = testResult[2];

    this.props.setSort(criteria, order)

  }

  render() {

    return (
      <div className="sort-bar">
        <div className="sort-text">
          Sort By:
        </div>
        <div className="sort-date">
          Date 
            <div onClick={() => this.testRegExp('sort-timestamp-ascending')}>
              Oldest 
            </div>
            <div onClick={() => this.testRegExp('sort-timestamp-descending')}>
              Newest  
            </div>
        </div>
        <div className="rating">
          Rating
          <div onClick={() => this.testRegExp('sort-voteScore-descending')}>
            Highest 
          </div>
          <div onClick={() => this.testRegExp('sort-voteScore-ascending')}>
            Lowest  
          </div>
        </div>
        <div className="clear" onClick={() => this.props.setSort('')}>
          Clear Sort
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sorter: state.sorter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (criteria, order) => dispatch(setSort(criteria, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBar)