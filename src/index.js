// React
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
// Router
import { BrowserRouter } from "react-router-dom";
//Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
// Middleware
import thunkMiddleware from "redux-thunk";
// App Components
import "./index.css";
import App from "./App";
import rootReducer from "./reducers/reducers";
import {
  selectCategory,
  fetchCategories,
  fetchPostsIfNeeded
} from "./actions/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.dispatch(selectCategory("all"));
store.dispatch(fetchCategories());
store.dispatch(fetchPostsIfNeeded("all"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
