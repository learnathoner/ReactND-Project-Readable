import React, { Component } from 'react'


const Category = ({ category, currentCategory, onCategoryClick, store }) => {

  if (category.name === currentCategory) {
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
          onCategoryClick(category.name);
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

export default Category