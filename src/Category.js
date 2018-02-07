import React, { Component } from 'react'


class Category extends Component {
  state = {

  }

  render() {

    const { category, currentCategory, onCategoryClick, store} = this.props;

    if (category.path === currentCategory) {
      return (
        <li className="category-item">
          <span>{category.name}</span>      
        </li>
      )
    }

    return (
      <li className="category-item">
        <a hfref='#'
          onClick={e => {
            e.preventDefault();
            onCategoryClick(category.path);
          }}
          style={{
            color: 'blue'
          }}
        >
          {category.name}
        </a>
      </li>
    )
  }

}

export default Category