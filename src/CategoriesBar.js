import React, { Component } from 'react'
import Category from './Category'
import { selectCategory } from './actions/actions'
import { connect } from 'react-redux'

class CategoriesBar extends Component {

  render() {
    const { categories, currentCategory, setCategory } = this.props;

    return (
      <div className="header-categories">
      <p className="categories-text">Categories:</p>
      <ul className="categories-list">
    
        {categories &&
          categories.map(category => (
            <Category 
              category={category}
              setCategory={setCategory}
              currentCategory={currentCategory}
              onCategoryClick={this.props.onCategoryClick}
              key={category.name}
            />        
          ))}
      </ul>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    currentCategory: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClick: (category) => {
      console.log('dispatched');
      dispatch(selectCategory(category))

    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoriesBar)