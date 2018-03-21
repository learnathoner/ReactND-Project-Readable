import React from 'react';
import CategoriesBar from './CategoriesBar';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="title-container">
      <img src={logo} className="App-logo" alt="logo" />
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: 'white'
        }}
      >
        <h1 className="App-title">Readable</h1>
      </Link>
    </div>

    <CategoriesBar />
  </div>
);

export default Header;
