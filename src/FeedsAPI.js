// Delete posts: id: 213, 2134, 21345
// const testPost = {
//   id: 2134,
//   timeStamp: 1233543534,
//   body: 'testing posts',
//   title: 'test',
//   author: 'me',
//   category: 'react'
// }

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


// Get posts/:id - single post
// Post /posts/:id = votes on a post, takes either "upVote or downVote"
// Put /posts:id - Edit details of posts, takes title and body
// DELETE /posts/:id - sets deleted flag to true
// Get posts/:id/comments - all comments for single post
// Post /comments add a comment
// Get /comments/:id
// Post /comments/:id
// Put /comments/:id
// Delete /comments/:id


// export const updateRating = (book, rating) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ rating: rating })
//   }).then(res => res.json())

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

