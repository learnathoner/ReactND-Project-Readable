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

        {categories &&
          categories.map(category => (
            <li className="category-item" key={category.name}>
              <a hfref='#'
                onClick={e => {
                  e.preventDefault();

                  if (category.name !== 'All') {
                    setCategory(category.name)
                  } else {
                    setCategory('')
                  }
                  
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