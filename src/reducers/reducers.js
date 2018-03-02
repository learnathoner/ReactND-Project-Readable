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
  SET_SORT,
  ADD_COMMENT,
  UPDATE_POST,
  DELETE_POST,
  DISPATCH_VOTE,
  DISPATCH_COMMENT_VOTE
} from '../actions/actions'

// SELECTED CATEGORY
// Tracks Currently Selected Category for Category Bar and Post Grid
export function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
}

// POSTS
// Manages individual post objects, called by async handler
function posts( state = { isFetching: false, didInvalidate: false, items: [] }, action) {
  switch (action.type) {
    case DISPATCH_VOTE:
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

// POSTS BY CATEGORY
// Stores { postsByCategory: [posts] } for easier sorting
// Calls posts reducer
export function postsByCategory(state={}, action) {
  const { category, id } = action;

  switch (action.type) {
    // TODO: REMOVE DELETEPOST FROM CATEGORY
    case DELETE_POST:
      let storeCopy = { ...state }
      // Fiters category items not to include the id sent
      storeCopy[category].items = storeCopy[category].items.filter(catPostId => catPostId !== id)
      return storeCopy;
    case DISPATCH_VOTE:
    case INVALIDATE_CATEGORY:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return {
        ...state,
        [category]: posts(state[category], action)
      }
    default:
      return state;

  }
}

// POSTS BY ID
// When receiving posts from handler, stores each post by its ID
export function postsByID(state={}, action) {
  
  switch (action.type) {
    case DELETE_POST:
      let postId = action.id
      // TODO: Less clunk way to remove property?
      let storeCopy = { ... state }
      delete storeCopy[postId]
      return storeCopy;
    case DISPATCH_VOTE:
      postId = action.id;
      const { voteScore } = action;
      return {
        ...state,
        [postId]: {
          ...state[postId],
          voteScore
        }
      }
    case UPDATE_POST:
      const { id, title, body } = action.post
      return {
          ...state,
          [id]: {
            ...state[id],
            title,
            body
          }
      }
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

// CATEGORIES
// Receives list of all categories, returns { byName: {}, allCategories: [] }
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

// COMMENTS BY POST
// Receives all comments linked to a post ID
export function commentsByPost(state={}, action) {
  
  if (action.comment) {
    var { parentId, voteScore, id } = action.comment
  }

  switch (action.type) {
    case DISPATCH_COMMENT_VOTE:
      return {
        ...state,
        [parentId]: state[parentId].map(comment => {
            return comment.id === id
              ? {...comment, voteScore}
              : comment
          })
      }
    case ADD_COMMENT:
      return {
        ...state,
        [parentId]: [
          ...state[parentId],
          action.comment
        ]
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.id]: action.comments
      }
    default:
      return state;
  }
}

// SORTER
// Tells app what criteria and order to sort posts / comments by
export function sorter(state={}, action) {
  const { sortType, criteria, order } = action;

  switch (action.type) {
    case SET_SORT:
      return {
        sortType,
        criteria,
        order    
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
