import React, { Component } from "react"
import Header from './Header'
import PageContent from './PageContent'
import PostPage from './PostPage'
import * as FeedsAPI from "./FeedsAPI"
import { Switch, Route } from 'react-router-dom'
import "./App.css"

class App extends Component {
  state = {
    loaded: false,
    categories: '',
    currentCategory: '',
    posts: []
  }

  componentDidMount() {
    FeedsAPI.getCats().then(categories => {
      this.setState({ loaded: true })
      this.setState({ categories })
    })

    FeedsAPI.getPosts().then(posts => {
      this.setState({ posts: posts })
      console.log(posts);
    })
  }

  render() {
    let posts = this.state.posts

    const setCategory = (category) => {
      this.setState({ currentCategory: category })
    }

    return (
      <div className="App">
        <Header 
          categories={this.state.categories} 
          setCategory={setCategory}
          currentCategory={this.state.currentCategory}
        />
       
       {/* TODO: Why doesn't switch work? */}
       <Switch>
          <Route 
            exact
            path='/' 
            component={PageContent}
          />
          <Route 
            exact
            path='/r/:category' 
            component={PageContent}
          />
          <Route
            path='/post/:id'
            component={PostPage}
          />
        </ Switch>
      
        
        <button className="add-post-button">
          Add Post
        </button>
      </div>
    )
  }
}

export default App
