import React from 'react'
import logo from "./logo.svg"


const Header = ({ categories }) => (
  <div className="header">
    <div className="title-container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Readable</h1>
    </div>
    <div className="header-categories">
      <p className="categories-text">Categories:</p>
      <ul className="categories-list">
        {categories &&
          categories.map(category => (
            <li className="category-item" key={category.name}>
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  </div>
)

export default Header