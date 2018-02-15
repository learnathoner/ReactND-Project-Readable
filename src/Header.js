import React from 'react'
import CategoriesBar from './CategoriesBar'
import HeaderTitle from './HeaderTitle'

const Header = () => (
  <div className="header">
    <HeaderTitle />
    <CategoriesBar />
  </div>
)

export default Header