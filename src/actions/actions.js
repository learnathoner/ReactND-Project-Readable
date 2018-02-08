import { getPosts, getCatPosts } from '../FeedsAPI'

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

// THUNK ACTION

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