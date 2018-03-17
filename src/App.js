import React, { Component } from "react";
import Header from "./Header";
import PostGrid from "./PostGrid";
import PostPage from "./PostPage";
import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={PostGrid} />
          <Route exact path="/r/:category" component={PostGrid} />
          <Route path="/:category/:id" component={PostPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
