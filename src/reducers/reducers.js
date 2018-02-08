import { combineReducers } from 'redux'
import { 
  SELECT_CATEGORY, 
  REQUEST_POSTS, 
  RECEIVE_POSTS,
  INVALIDATE_SUBREDDIT,
  FETCH_POSTS,
  INVALIDATE_CATEGORY,
  RECEIVE_CATEGORIES
} from '../actions/actions'

export function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category === 'All' ? '' : action.category;
    default:
      return state;
  }
}

function posts(
  state={
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function postsByCategory(state={}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.category]: posts(state[action.category], action)
      }
    default:
      return state;

  }
}

function uniqueArr(state, categories) {
  const mergedArr = [...state]

  for (let category of categories) {
    if (!mergedArr.includes(category)) {
      mergedArr.push(category);
    }
  }

  return mergedArr;
}

export function categories(state=[], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return uniqueArr(state, action.categories)
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory,
  categories
})

export default rootReducer