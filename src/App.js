import React, { Component } from "react"
import Header from './Header'
import PostsPage from './PostsPage'
import * as FeedsAPI from "./FeedsAPI"
import { Switch, Route } from 'react-router-dom'
import "./App.css"

class App extends Component {
  state = {
    loaded: false,
    categories: '',
    currentCategory: null,
    posts: []
  }

  componentDidMount() {
    FeedsAPI.getCats().then(categories => {
      this.setState({ loaded: true })
      this.setState({ categories })
    })

    FeedsAPI.getPosts().then(posts => {
      this.setState({ posts: posts })
    })
  }

  render() {
    let posts = this.state.posts

    const setCategory = (category) => {
      this.setState({ currentCategory: category })
    }

    return (
      <div className="App">
        <Header categories={this.state.categories} setCategory={setCategory}/>
        <Route exact 
          path='/' 
          component={() => 
            <PostsPage 
              posts={this.state.posts} 
              category={this.state.currentCategory}
            />
        }/>
        
        <button className="add-post-button">
          Add Post
        </button>
      </div>
    )
  }
}

export default App
