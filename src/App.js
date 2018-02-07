import React, { Component } from 'react';
import logo from './logo.svg';
import * as FeedsAPI from './FeedsAPI'
import './App.css';

class App extends Component {
  state = {
    loaded: false,
    categories: [],
    posts: []
  }

  componentDidMount() {
    FeedsAPI.getCats().then(categories => {
      this.setState({loaded: true})
      this.setState({ categories })
    })

    FeedsAPI.getPosts().then(posts => {
      this.setState({posts: posts})
    })
  }

  render() {

    let posts = this.state.posts;

    return (
      <div className="App">

        <div className="App-header">
          <div className="title-container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Readable</h1>
          </div>
          <div className="header-categories">
            <p className="categories-text">
              Categories:
            </p> 
            <ul className="categories-list">
              {this.state.loaded && this.state.categories.map(category => (
                <li className='category-item' key={category.name}>{ category.name }</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="page-content">
          <div className="posts-bar">
              <p className="posts-bar-text">
                Sort By:
              </p>
          </div>
          <div className="posts-container">
              <ul className="posts">

              {/* id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted */}
                {posts.length > 0 && posts.map(post => (
                  <li className="post" key={ post.id }>
                    <div className="post-container">
                      <span className="post-rank">Rank</span>
                      <div className="post-vote">
                        <span>Vote:</span> { post.voteScore }
                      </div>
                      <div className="post-content">
                        <p className="post-title">
                          <span>{ post.title }</span> 
                        </p>
                        <p className="post-body">
                          { post.body }
                        </p>
                        <div className="post-info">
                          <p className="post-author">
                            <span>By:</span> { post.author }
                          </p>
                          <p className="post-category">
                            <span>Posted in:</span> { post.category }
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
