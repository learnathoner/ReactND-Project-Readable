import { getPosts, getCats, getCatPosts } from '../FeedsAPI'

export const SELECT_CATEGORY = 'SElECT_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'

export function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS = 'RECIEVE_POSTS'

export function receivePosts(category, posts) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: posts,
    receivedAt: Date.now()
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

// THUNK ACTION 
// Fetches posts from API, changes state while requesting, changes again when found
// TODO: Add error handling

export function fetchPosts(category) {
  return function(dispatch) {
    
    dispatch(requestPosts(category))

    if (category === 'All') {
      return getPosts(category)
      .then(posts =>
        dispatch(receivePosts(category, posts))
      )
    }

    return getCatPosts(category)
      .then(posts =>
        dispatch(receivePosts(category, posts))
      )

  }
}

// Tells below function whether it needs to fetch posts

export function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category]

  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    } else {
      return Promise.resolve()
    }
  }
}

// Fetch Categories

export function fetchCategories() {
  return function(dispatch) {

    return getCats()
      .then(categories =>
        dispatch(receiveCategories(categories))
      )

  }
}