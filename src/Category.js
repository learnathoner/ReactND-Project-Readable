import React from 'react'
import { Link } from 'react-router-dom'


const Category = ({ category, currentCategory, onCategoryClick, store }) => {

  if (category.name === currentCategory) {
    return (
      <li className="category-item">
        <span>{category.name}</span>      
      </li>
    )
  }

  const slug = category.name === 'All' ? '/' : `/r/${category.path}`

  return (
    <li className="category-item">
      <Link 
        to={slug}
        onClick={e => {
          onCategoryClick(category.name);
        }}
        style={{
          textDecoration: 'none'
        }}
      >
        {category.name}
      </ Link>
    </li>
  )
}

export default Category