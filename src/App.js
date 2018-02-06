import React, { Component } from 'react';
import logo from './logo.svg';
import * as FeedsAPI from './FeedsAPI'
import './App.css';

class App extends Component {
  state = {
    loaded: false,
    categories: []
  }

  componentDidMount() {
    FeedsAPI.getCats().then(categories => {
      console.log(categories);
      this.setState({loaded: true})
      this.setState({ categories })
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.loaded && this.state.categories.map(category => (
            <div>Category name is: { category.name }</div>
          ))}
        </p>
      </div>
    );
  }
}

export default App;
