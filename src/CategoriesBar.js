import React from 'react'
import Category from './Category'

const CategoriesBar = ({ categories, currentCategory, setCategory }) => (
  <div className="header-categories">
  <p className="categories-text">Categories:</p>
  <ul className="categories-list">

    {categories &&
      categories.map(category => (
        <Category 
          category={category}
          currentCategory={currentCategory}
          setCategory={setCategory}
          key={category.name}
        />        
      ))}
  </ul>
</div>
)

export default CategoriesBar