import { combineReducers } from 'redux'
import { 
  SELECT_CATEGORY, 
  REQUEST_POSTS, 
  RECEIVE_POSTS,
  INVALIDATE_SUBREDDIT,
  FETCH_POSTS,
  INVALIDATE_CATEGORY,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  SET_SORT
} from '../actions/actions'

export function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
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
        // postsByCategory only stores postID
        items: action.posts.map(post => post.id),
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

export function postsByID(state={}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const newState = { ...state }
      
      action.posts.forEach(post => {
        if (!newState[post.id]) { newState[post.id] = post }
      })

      return newState;

    default:
      return state
  }
}

export function categories(state={}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        byName: action.categories.reduce((categories, category) => {
          categories[category.name] = category;
          return categories;
        }, {}),
        allCategories: action.categories.map(category => category.name)
      }
    default:
      return state;
  }
}

export function commentsByPost(state={}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.id]: action.comments
      }
    default:
      return state;
  }
}

export function sorter(state={}, action) {
  const { criteria, order } = action;

  switch (action.type) {
    case SET_SORT:
      return {
        criteria: criteria,
        order: order    
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory,
  categories,
  postsByID,
  commentsByPost,
  sorter
})

export default rootReducer