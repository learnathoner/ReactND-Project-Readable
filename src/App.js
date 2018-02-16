import React, { Component } from "react";
import Header from "./Header";
import PageContent from "./PageContent";
import PostGrid from './PostGrid'
import PostPage from "./PostPage";
import SortBar from './SortBar'
import * as FeedsAPI from "./FeedsAPI";
import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    const setCategory = category => {
      this.setState({ currentCategory: category });
    };

    return (
      <div className="App">
        <Header />
        <SortBar />

        <Switch>
          <Route exact path="/" component={PostGrid} />
          <Route exact path="/r/:category" component={PostGrid} />
          <Route path="/post/:id" component={PostPage} />
        </Switch>

        <button className="add-post-button">Add Post</button>
      </div>
    );
  }
}

export default App;
