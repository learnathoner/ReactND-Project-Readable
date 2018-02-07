import React, { Component } from "react"
import Header from './Header'
import PageContent from './PageContent'
import * as FeedsAPI from "./FeedsAPI"
import "./App.css"

class App extends Component {
  state = {
    loaded: false,
    categories: [],
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

    return (
      <div className="App">
        <Header categories={this.state.categories} />
        <PageContent posts={this.state.posts} />
        <button className="add-post-button">
          Add Post
        </button>
      </div>
    )
  }
}

export default App
