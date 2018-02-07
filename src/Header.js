import React from 'react'
import logo from "./logo.svg"


const Header = ({ categories, setCategory }) => (
  <div className="header">
    <div className="title-container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Readable</h1>
    </div>
    <div className="header-categories">
      <p className="categories-text">Categories:</p>
      <ul className="categories-list">
        <li className="category-item" key='All'>
          <a hfref='#'
            onClick={e => {
              e.preventDefault();
              setCategory(null)
            }}
            style={{
              color: 'blue'
            }}
          >
            All
          </a>
        </li>

        {categories &&
          categories.map(category => (
            <li className="category-item" key={category.name}>
              <a hfref='#'
                onClick={e => {
                  e.preventDefault();
                  setCategory(category.name)
                }}
                style={{
                  color: 'blue'
                }}
              >
                {category.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  </div>
)

export default Header