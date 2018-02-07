import React from 'react'

const Category = ({ category, currentCategory, setCategory}) => {
  // If category currently selected, show unclickable name
  if (category.path === currentCategory) {
    return (
      <li className="category-item">
        <span>{category.name}</span>      
      </li>
    )
  }

  // If category not currently selected, create link
  // Onclick, setCategory to new category
  return (
    <li className="category-item">
      <a hfref='#'
        onClick={e => {
          e.preventDefault();
          setCategory(category.path)
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