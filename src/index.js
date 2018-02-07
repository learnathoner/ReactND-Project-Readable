import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter }  from 'react-router-dom'
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { selectedCategory } from './reducers/reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(selectedCategory)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </ BrowserRouter>
  </ Provider>,
  document.getElementById('root'));
registerServiceWorker();
