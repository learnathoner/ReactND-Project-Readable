// Delete posts: id: 213, 2134, 21345
// const testPost = {
//   id: 2134,
//   timeStamp: 1233543534,
//   body: 'testing posts',
//   title: 'test',
//   author: 'me',
//   category: 'react'
// }

// // Sample comment
// addComment({
//   id: 1,
//   parentId: '8xf0y6ziyjabvozdd253nd',
//   timestamp: 1,
//   body: 'test',
//   author: 'mike',
//   voteScore: 1,
//   deleted: false,
//   parentDeleted: false
// })

const headers = { 
 'Authorization': 'Guest' 
}

const api = 'http://localhost:3001'

// Returns Categories {name: path:}
export const getCats = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    
// Return Posts in Category
export const getCatPosts = (category) =>
fetch(`${api}/${category}/posts`, { headers })
.then(res => res.json())
.then(data => data)

// Returns Posts {id, timestamp, title, voteScore, author, body, category, commentCOunt, deleted}
export const getPosts = () =>
fetch(`${api}/posts`, { headers })
.then(res => res.json())
.then(data => data)

// Gets single post
// Get posts/:id - single post
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => data)

// Add post, reguires: id, timeStamp, title, body, author, and category
export const addPost = ({ id, timestamp, title, body, author, category }) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
  ...headers,
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  id, timestamp, title, body, author, category
})
}).then(res => res.json())

// Returns comments by ID
export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments)

// Add comment, reguires: id, parentId, timestamp, body, author, voteScore
export const addComment = ({ id, parentId, timestamp, body, author, voteScore }) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id, parentId, timestamp, body, author, voteScore,
      deleted: false,
      parentDeleted: false
    })
  }).then(res => res.json())

// UPDATE POST  
export const updatePost = (post) => {
  const { id, title, body } = post

  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())
}

// DELETE POST
// delete /posts/:id - sets deleted flag to true
export const DELETE_POST_API = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
}

// Rank Post
// Should upVote or downVote post
export const RATE_POST_API = (post) => {
  const { id, option } = post;

  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .catch(err => console.log('Error: ' + err))
    .then(post => post)
}

// Update Rating for comment
export const RATE_COMMENT_API = (comment) => {
  const { id, option } = comment;

  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .catch(err => console.log('Error: ' + err))
    .then(comment => comment)
}

// ADD COMMENT
export const ADD_COMMENT_API = (comment) => {
  const { id, parentId, timestamp, body, author } = comment;

  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, parentId, timestamp, body, author })
  })
  .then(res => res.json())
  .catch(err => console.log('error: ' + err))
  .then(comment => comment)
}

// UPDATE COMMENT
export const UPDATE_COMMENT_API = (comment) => {
  const { id, timestamp, body } = comment;

  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  })
    .then(res => res.json())
    .catch(err => console.log("Error! " + err))
    .then(comment => comment)
}

// DELETE COMMENT
// delete /comments/:id - sets deleted flag to true
export const DELETE_COMMENT_API = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
    .then(comment => comment)
}

// Post /posts/:id = votes on a post, takes either "upVote or downVote"
// Put /posts:id - Edit details of posts, takes title and body
// Get posts/:id/comments - all comments for single post
// Post /comments add a comment
// Get /comments/:id
// Post /comments/:id
// Put /comments/:id
// Delete /comments/:id



// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)

