export const SELECT_CATEGORY = 'SElECT_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
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

// export function receivePosts(category, json) {

// }