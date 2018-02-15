import React, { Component } from 'react'
import PostGrid from './PostGrid'

class PageContent extends Component {
  render () {

    return (
      <div className="page-content">

        <div className="posts-bar">
          <p className="posts-bar-text">Sort By: </p>
        </div>

        <PostGrid />

      </div>
    )
  }
}

export default PageContent