import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter }  from 'react-router-dom'
import './index.css';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/reducers'
import registerServiceWorker from './registerServiceWorker';
import { selectCategory, fetchCategories, fetchPostsIfNeeded } from './actions/actions';

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
))

store.dispatch(selectCategory('All'))
store.dispatch(fetchCategories());
store
  .dispatch(fetchPostsIfNeeded('All'))
  .then(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </ BrowserRouter>
  </ Provider>,
  document.getElementById('root'));
registerServiceWorker();
