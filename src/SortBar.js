import React, { Component } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { setSort } from './actions/actions'

class SortBar extends Component {
  //PropTypes = sortType

  handleSort = (sortClass) => {
    const { sortType, setSort } = this.props;

    const sortTest = /^sort-([^-]\w+)-(\w+)/
    const testResult = sortTest.exec(sortClass);
    const criteria = testResult[1];
    const order = testResult[2];

    const sortObj = {
      sortType,
      criteria,
      order
    }

    this.props.setSort(sortObj)

  }

  render() {
 
    return (
      <div className="sort-bar">
        <div className="sort-text">
          Sort By:
        </div>
        <div className="sort-date">
          Date 
            <div onClick={() => this.handleSort('sort-timestamp-ascending')}>
              Oldest 
            </div>
            <div onClick={() => this.handleSort('sort-timestamp-descending')}>
              Newest  
            </div>
        </div>
        <div className="rating">
          Rating
          <div onClick={() => this.handleSort('sort-voteScore-descending')}>
            Highest 
          </div>
          <div onClick={() => this.handleSort('sort-voteScore-ascending')}>
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
    setSort: (sortObj) => dispatch(setSort(sortObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBar)