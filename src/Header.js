import React from 'react'
import CategoriesBar from './CategoriesBar'
import HeaderTitle from './HeaderTitle'

const Header = ({ categories, currentCategory, setCategory }) => (
  <div className="header">
    <HeaderTitle />
    <CategoriesBar 
      categories={categories}
      currentCategory={currentCategory}
      setCategory = {setCategory}
    />
  </div>
)

export default Header