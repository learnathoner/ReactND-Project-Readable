import { combineReducers } from 'redux'
import { 
  SELECT_CATEGORY, 
  REQUEST_POSTS, 
  RECEIVE_POSTS,
  INVALIDATE_SUBREDDIT,
  FETCH_POSTS,
  INVALIDATE_CATEGORY
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

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory
})

export default rootReducer